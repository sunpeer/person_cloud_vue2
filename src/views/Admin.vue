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
                    <el-timeline-item v-for='(file,index) in confirmedfiles' :key='index' :timestamp='file.confirmdate'>
                        {{file.filename}}
                    </el-timeline-item>
                </el-timeline>
            </el-col>
        </el-row>
        <br/>
        <el-divider content-position='left'>待审核文件</el-divider>
        <el-carousel type="card" height='200px'>
            <el-carousel-item v-for='(file,index) in confirmingfiles' :key='index'>
                <confirm-file-card @select='setCurrentConfirmFile' :file='file'></confirm-file-card>
            </el-carousel-item>
        </el-carousel>
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
              filename:'',
              keywords:[],
              filetype:'',
              desc:"",
              userid:null,
              fileid:null,
              filecreationlastid:null
          },
            confirmedfiles:[
                {
                    filename:'WPS',
                    confirmdate:'2020-10-11 00:00:00'
                },
                {
                    filename:'WPS',
                    confirmdate:'2020-10-10 00:00:00'
                },
                {
                    filename:'WPS',
                    confirmdate:'2020-10-09 00:00:00'
                },
                {
                    filename:'WPS',
                    confirmdate:'2020-10-08 00:00:00'
                },
                {
                    filename:'WPS',
                    confirmdate:'2020-10-07 00:00:00'
                }
            ],

            //样本
            confirmingfiles:[{
              filename:'WPS',
              keywords:['JAVA','IDE'],
              filetype:'软件',
              desc:"这是一本非常好的书，我把他奉献出来给课题室的所有人使用，#######################################################，省略一万字",
              userid:1,
              fileid:1,
              filecreationlastid:null
            },
            ]
        }
    },
    methods:{
      setCurrentConfirmFile(file){
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
      updateConfirmedFiles(){
          //更新管理员审核过的文件列表
      }
    },
    watch:{
        'adminprofile.workid':'updateConfirmedFiles'
    }
}
</script>

<style scoped>

</style>