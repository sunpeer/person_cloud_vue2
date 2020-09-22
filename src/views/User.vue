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
                    <el-timeline-item v-for="(file,index) in createfiles" :key='index' :timestamp='file.createtime'>
                        {{file.name}}&nbsp;<a style="font-style:italic;font-size:80%">{{file.downloadcount}}<i class="el-icon-download"></i></a>
                    </el-timeline-item>
                </el-timeline>
                <br/>
                <el-divider content-position='left'>下载记录</el-divider>
                <el-timeline>
                    <el-timeline-item v-for="(file,index) in createfiles" :key='index' :timestamp='file.createtime'>
                        {{file.name}}<span>{{file.downloadcount}}</span>
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
                console.log(response.data.data)
                let ids='1,2,3,4,5,6'
                //根据ids获得文件的信息
                _t.$axios.get('/file',{params:{ids}}).then((response)=>{
                    _t.downloadfiles=response.data
                    _t.currentdownloadstartid=response.data.data.id
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
            this.getDownloadFiles(newvalue,5)
        },
        getCreatedFiles(createid,count){
            let _t=this
            _t.$axios.get('/user/creation',{params:{id:createid,count}}).then((response)=>{
                console.log(response.data.data)
                let ids='1,2,3,4,5,6'
                //根据ids获得文件的信息
                _t.$axios.get('/file',{params:{ids}}).then((response)=>{
                    _t.createfiles=response.data
                    _t.currentcreatestartid=response.data.data.id
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

/* .el-timeline-item__timestamp{
     font-size: 80% !important;
} */
</style>