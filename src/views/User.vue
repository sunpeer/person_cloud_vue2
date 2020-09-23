<template>
    <div>
        <el-row>
            <el-col :span=5>
                <user-profile :userprofile='userprofile'></user-profile>
            </el-col>
            <el-col :offset=1 :span=12>
                <!-- 当上传成功后，userupdate会触发，此时需要刷新用户的数据-->
                <upload-file :userprofile="userprofile" @uploadsuccess="updateUser"></upload-file>
            </el-col>
            <el-col :offset=1 :span=5>
                <el-divider content-position='left'>上传记录</el-divider>
                <el-timeline>
                    <el-timeline-item v-for="(file,index) in createfiles" :key='index' :type="file.is_available?'success':'danger'" :icon="file.is_available?'el-icon-check':'el-icon-close'">
                        <el-tooltip effect="light" :content="file.is_available?'感谢你的，无私奉献，你的文件已经审核通过':'别着急，管理员马上就会审核你的文件了'">
                            <span>{{file.file_name}}&nbsp;<a style="font-style:italic;font-size:80%"><i class="el-icon-download">{{file.download_total}}</i></a></span>
                        </el-tooltip>
                    </el-timeline-item>
                </el-timeline>
                <br/>
                <el-divider content-position='left'>下载记录</el-divider>
                <el-timeline>
                    <el-timeline-item v-for="(file,index) in downloadfiles" :key='index'>
                        {{file.file_name}}&nbsp;<a style="font-style:italic;font-size:80%"><i class="el-icon-download">{{file.download_total}}</i></a>
                    </el-timeline-item>
                </el-timeline>
            </el-col>
        </el-row>
    </div>
</template>
    
<script>
import UploadFile from "../components/UploadFile"
import UserProfile from "../components/UserProfile"

export default {
    components:{
        UploadFile,
        UserProfile
    },
    created(){
        this.userid=this.$route.params.id
        this.updateUser();
    },
    methods:{
        //通过起始id，指定要查询的深度，返回用户下载来的文件信息
        getDownloadFiles(downloadid,count){
            let _t=this
            //通过newvalue来获取最近5个下载id，也就是新的downloadid来获取
            _t.$axios.get('/user/download',{params:{id:downloadid,count}}).then((response)=>{
                let ids=response.data.data.result.file_ids.join(',')
                _t.currentcreatestartid=response.data.data.result.next_id
                //根据ids获得文件的信息
                _t.$axios.get('/file',{params:{ids}}).then((response)=>{
                    //先移除数组内的所有对象，然后再塞进去给赋值
                    _t.downloadfiles.splice(0)
                    let index=0
                    response.data.data.files.forEach((item)=>{
                        _t.$set(_t.downloadfiles,index++,item)
                    })
                }).catch(error=>{
                    _5.$message.error('获取用户下载的文件信息失败')
                    console.log(error)
                })
            }).catch(error=>{
                _t.$message.error('获取用户下载的文件id失败')
                console.log(error)
            })
        },
        //监听到userprofile的downloadid变更时，更新downloadfiles
        updateDownloadFiles(newvalue,oldvalue){
            //watch了的值在创建的时候会被调用
            this.getDownloadFiles(newvalue,5)
        },
        getCreatedFiles(createid,count){
            let _t=this
            _t.$axios.get('/user/creation',{params:{id:createid,count}}).then((response)=>{
                let ids=response.data.data.result.file_ids.join(',')
                _t.currentcreatestartid=response.data.data.result.next_id
                //根据ids获得文件的信息
                _t.$axios.get('/file',{params:{ids}}).then((response)=>{
                    //先移除数组内的所有对象，然后再塞进去给赋值
                    _t.createfiles.splice(0)
                    let index=0
                    response.data.data.files.forEach((item)=>{
                        _t.$set(_t.createfiles,index++,item)
                    })
                }).catch(error=>{
                    _t.$message.error('获取用户创建的文件信息失败')
                    console.log(error)
                })
            }).catch(error=>{
                _t.$message.error('获取用户创建的文件id失败')
                console.log(error)
            })
        },
        updateCreatedFiles(newvalue,oldvalue){
            //watch了的值在创建的时候会被调用
            this.getCreatedFiles(newvalue,5)
        },
        updateUser(){
            //ajax请求获得该用户的信息
            let _t=this
            _t.$axios.get('/user/detail',{params:{id:_t.userid}}).then(function(response){
                //??????????????????????????????????????????????这样没有让userprofile动态更新
                //我很想知道，如果userprofile={}，然后用this.userprofile.update这样可以实现双向绑定吗
                //以下的代码存在一些问题
                //把请求下来的信息赋值给userprofile，实现整个页面的刷新
                _t.userprofile.id=response.data.data.id
                _t.userprofile.name=response.data.data.name
                _t.userprofile.createtime=response.data.data.create_time
                _t.userprofile.downloadid=response.data.data.download_id
                _t.userprofile.createid=response.data.data.create_id
                _t.userprofile.downloadtotal=response.data.data.download_total
                _t.userprofile.createtotal=response.data.data.create_total
                sessionStorage.setItem('download_id',response.data.data.download_id)
                sessionStorage.setItem('download_total',response.data.data.download_total)
            }).catch(error=>{
                _t.$message.error('获取用户信息失败')
                console.log(error)
            })
        }
    },
    data(){
        return {
            userid:0,
            userprofile:{
                id:null,
                name:'',
                createtime:'',
                downloadid:null,
                createid:null,
                downloadtotal:0,
                createtotal:0
            },
            currentdownloadstartid:0,
            currentcreatestartid:0,
            //用户上传的文件
            //样例
            createfiles:[

            ],
            //下载下来的文件
            //文件样例：
            downloadfiles:[

            ]
        }
    },
    //监听createid和downloadid这两个值
    watch:{
        'userprofile.createid':'updateCreatedFiles',
        'userprofile.downloadid':'updateDownloadFiles'
    }
}
</script>

<style scoped>

.el-divider{
    margin-top:0px
}

</style>