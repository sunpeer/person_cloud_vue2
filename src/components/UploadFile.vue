<template>
    <div>
        <el-form ref='form' :model="uploadform" label-width=auto label-suffix=":">
            <el-form-item label='文件名' prop='file_name'
            :rules="{required:true, message:'文件名不能为空', trigger:'blur'}">
                <el-input v-model='uploadform.file_name'></el-input>
            </el-form-item>
            <el-form-item label="文件类型" prop='file_type'
            :rules="{required:true, message:'必须选择文件类型', trigger:'blur' }">
                <el-radio-group v-model='uploadform.file_type'>
                    <el-radio label='软件'>软件</el-radio>
                    <el-radio label="文档">文档</el-radio>
                    <el-radio label="音乐">音乐</el-radio>
                    <el-radio label="图片">图片</el-radio>
                    <el-radio label="项目工程">项目工程</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="文件关键字" prop='keywords'
            :rules="{required:true, message:'必须为上传文件设置关键字',trigger:'blur'}" >
                <el-checkbox-group v-model="uploadform.keywords" :max=5>
                    <el-checkbox-button label='JAVA'></el-checkbox-button>
                    <el-checkbox-button label='IDE'></el-checkbox-button>
                    <el-checkbox-button label='机械'></el-checkbox-button>
                    <el-checkbox-button label='HTML'></el-checkbox-button>
                    <el-checkbox-button label='CSS'></el-checkbox-button>
                    <el-checkbox-button label='PHP'></el-checkbox-button>
                    <el-checkbox-button label='C++'></el-checkbox-button>
                    <el-checkbox-button label='C#'></el-checkbox-button>
                    <el-checkbox-button label='Matlab'></el-checkbox-button>
                    <el-checkbox-button label='电子'></el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="文件描述" prop='file_desc'>
                <el-input type="textarea" v-model="uploadform.file_desc"></el-input>
            </el-form-item>
        </el-form>
        <el-row justify='center' type='flex' >
            <!-- <el-col :span=12 align='center'> -->
                <el-upload ref="upload"
                drag :data="uploadform" :with-credentials=true :auto-upload=false 
                :action="`http://localhost:3000/file/create?file_name=${uploadform.file_name}`"
                :on-change="limitUploadFile" :on-success="uploadSuccessHandle">
                    <i class="el-icon-upload"></i>
                    <div >将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            <!-- </el-col> -->
        </el-row>
        <br/>
        <el-row justify="center" type='flex'>
            <el-button type='success' @click="submitUpload">上传到服务器</el-button>
        </el-row>
            <!-- 文件名 -->  
            <!-- 文件类型 -->
            <!-- 文件关键字 -->
            <!-- 文件描述 -->
    </div>
</template>


<script>
export default {
    props:['userprofile'],
    data(){
        return {
            uploadform:{
                file_name:'',
                file_type:'',
                keywords:[],
                file_desc:'',
                //官网说用这种方法是可以的，但是我测试了，
                //没反应，可能是因为我这个在一个对象里面吧
                userid:null,
                create_file_user_log_last_id:null,
                create_total:0
            },
        }
    },
    methods:{
        
        submitUpload(){
            this.uploadform.userid=this.userprofile.id
            this.uploadform.create_file_user_log_last_id=this.userprofile.createid,
            this.uploadform.create_total=this.userprofile.createtotal
            //校验证是否有文件选择了
            if(this.$refs.upload.uploadFiles.length!=1){
                this.$message.error("请先选择要上传的文件")
                return;
            }
            //采用下面的代码会跳出一个问题
            /*
            this.$refs.form.validate(function(valid){
                if(valid){
                    this.$refs.upload.submit()
                }
            })
            */
            //我把这个函数取出来放在一个变量里，这样写的话就可以
            var submit=this.$refs.upload.submit;
            //校验表单是否填写合格，填写合格才能提交
            this.$refs.form.validate(function(valid){
                if(valid){
                    submit();
                }
            })
        },
        limitUploadFile(file,filelist){
            if(filelist.length>1){
                filelist.pop()
                this.$message.warning(`一次只能上传1个文件`)
            }
        },
        uploadSuccessHandle(response,file,fileList){
            if(response.result=='OK'){
                //如果上传成功了，则更新
                //1.出现消息提示,清空填写的上传数据
                this.$message.success('上传成功')
                this.$refs.upload.clearFiles();
                this.$refs.form.resetFields();
                //2.更新用户的信息，发送信息给User组件
                this.$emit('uploadsuccess')
            }else{
                file.status='ready'
                file.percentage=0,
                this.$message.error('上传失败，请稍后重试')
            }
        }
    },
    watch:{
    }
}
</script>

<style>
em{
    /* color:rgb(72, 228, 52); */
    color: #67C23A;
}
textarea{
    min-height: 160px !important;
}
</style>