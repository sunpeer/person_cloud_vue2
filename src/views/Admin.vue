<template>
    <div>
        <el-row>
            <el-col :span=5>
              <admin-profile :adminprofile='adminprofile'></admin-profile>
            </el-col>
            <el-col :offset=1 :span=12>
                <confirm-file :file='confirmfile' :adminprofile="adminprofile" @confirmsuccess="updateAdmin"></confirm-file>
            </el-col>
            <el-col :span=5 :offset=1>
            <el-divider content-position='left'>校核记录</el-divider>
                <el-timeline>
                    <el-timeline-item type='primary' icon='el-icon-check' v-for='(file,index) in confirmedfiles' :key='index' >
                        {{file.file_name}}<el-tag  size=mini v-for='(t,i) in file.keywords.split(",")' :key='i'>{{t}}</el-tag>
                    </el-timeline-item>
                </el-timeline>
            </el-col>
        </el-row>
        <br/>
        <el-divider content-position='left'>待审核文件</el-divider>
        <el-carousel v-if='!isWorkEmpty' type="card" height='200px'>
            <el-carousel-item v-for='(file,index) in confirmingfiles' :key='index'>
                <confirm-file-card @select='setCurrentConfirmFile' :file='file'></confirm-file-card>
            </el-carousel-item>
        </el-carousel>
        <div v-else style="widht:100%" align='center'>
            <h2>你真棒，你已经审核完了所有的上传文件</h2>
        </div>
    </div>
</template>

<script>
import ConfirmFile from "../components/ConfirmFile.vue"
import ConfirmFileCard from "../components/ConfirmFileCard.vue"
import AdminProfile from "../components/AdminProfile.vue"

export default {
    components:{
        ConfirmFile,
        ConfirmFileCard,
        AdminProfile
    },
    created(){
        this.adminid=this.$route.params.id
        this.updateAdmin();

        this.getConfirmingFiles(5)
      //请求到管理员的adminprofile
        
      //请求到用户需要confirm的样本，为了能让动态更新到，你要考虑周全
    },
    data(){
        return {
            adminid:null,
          adminprofile:{
            id:null,
            name:'',
            createtime:'',
            worktotal:0,
            workid:null
          },
          confirmfile:{
            id:null,
            file_name:'',
            file_type:'',
            is_available:false,
            size:0,
            keywords:[],
            state:'',
            file_desc:'',
            file_owner:0,
            file_creation_history:null,
            file_download_history:null,
            download_total:0,
          },
          currentachievementid:null,
            confirmedfiles:[
            ],

            //样本
            confirmingfiles:[
            ]
        }
    },
    methods:{
      setCurrentConfirmFile(file){
        file.keywords=file.keywords.toString().split(',')
        this.confirmfile=Object.assign({},file)
      },
      updateAdmin(){
          let _t=this
          this.$axios.get('/admin/detail',{params:{id:this.adminid}}).then(function(response){
              _t.adminprofile.id=response.data.data.id
              _t.adminprofile.name=response.data.data.name
              _t.adminprofile.workid=response.data.data.work_id
              _t.adminprofile.createtime=response.data.data.create_time
              _t.adminprofile.worktotal=response.data.data.work_total
          }).catch(function(error){
              _t.$message.error('获取管理员信息失败')
              console.log(error)
          })
      },
      getConfirmingFiles(count){
          let _t=this
          this.$axios.get('/admin/work',{params:{count}}).then(function(response){
              //获得待审核文件的id
              let ids=response.data.data.ids.join(',')
              if(!ids) {
                  //如果没有工作了，那么把当前数组全部清空
                  _t.confirmingfiles.splice(0)
                  return
                }
              //然后获得文件的详细信息
              _t.$axios.get('/file',{params:{ids}}).then(function(response){
                  //把当前的数组清空
                  _t.confirmingfiles.splice(0)
                  //把文件信息塞进数组
                  let index=0
                  response.data.data.files.forEach(function(item){
                      _t.$set(_t.confirmingfiles,index++,item)
                  })
              }).catch(function(error){
                    _t.$message.error('获取待审核文件详细信息失败')
                    console.log(error)
              })
          }).catch(function(error){
                _t.$message.error('获取待审核文件id失败')
                console.log(error)
          })
      },
      getConfirmedFiles(startid,count){
          let _t=this
          this.$axios.get('/admin/achievement',{params:{id:startid,count}}).then(function(response){
              //获得管理员之前审核了的文件id
              let ids=response.data.data.result.file_ids.join(',')
            _t.currentachievementid=response.data.data.next_id
              _t.$axios.get('/file',{params:{ids}}).then(function(response){
                  _t.confirmedfiles.splice(0)
                  let index=0
                    response.data.data.files.forEach(function(item){
                        _t.$set(_t.confirmedfiles,index++,item)
                    })
              }).catch(function(error){
                    _t.$message.error('获取待管理员已经审核了的文件详细信息失败')
                    console.log(error)
              })
          }).catch(function(error){
                _t.$message.error('获取已经审核了的文件id失败')
                console.log(error)
          })
      },
      updateConfirmingFiles(newvalue,oldvalue){
          this.getConfirmingFiles(5)
      },
      updateConfirmedFiles(newvalue,startvalue){
          //更新管理员审核过的文件列表
          this.getConfirmedFiles(newvalue,5)
      }
    },
    watch:{
        'adminprofile.workid':['updateConfirmedFiles','updateConfirmingFiles']
    },
    computed:{
        isWorkEmpty(){
            return this.confirmingfiles.length==0
        }
    }
}
</script>

<style scoped>

    .el-tag{
        margin-left: 10px;
    }

</style>