<template>
    <div>
        <el-form ref='form' :model='confirmfile' label-width="auto" label-suffix=":" :hide-required-asterisk=true :status-icon=true>
            <el-form-item label='文件名' prop="filename">
                <el-input type='text' v-model='confirmfile.filename' :disabled=true></el-input>
            </el-form-item>
            <el-form-item label="文件类型" prop='filetype'
            :rules="{required:true, message:'必须选择文件类型', trigger:'blur' }">
                <el-radio-group v-model='confirmfile.filetype'>
                    <el-radio label='软件'></el-radio>
                    <el-radio label="文档"></el-radio>
                    <el-radio label="音乐"></el-radio>
                    <el-radio label="图片"></el-radio>
                    <el-radio label="项目工程"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="文件关键字" prop='keywords'
            :rules="{required:true, message:'必须为上传文件设置关键字',trigger:'blur'}">
                <el-checkbox-group v-model="confirmfile.keywords" :max=5>
                    <!-- <el-checkbox-button label='JAVA' @change='onKeywordsChange'></el-checkbox-button> -->
                    <!-- <el-checkbox-button label='JAVA' @change='$event?confirmfile.keywords.push("JAVA"):confirmfile.keywords.splice([confirmfile.keywords.indexOf("JAVA")],1)' :checked='confirmfile.keywords.indexOf("JAVA")!==-1'></el-checkbox-button> -->
                    <!-- <el-checkbox-button label='IDE' @change='onKeywordsChange'></el-checkbox-button> -->
                    <!-- <el-checkbox-button label='IDE' @change='$event?confirmfile.keywords.push("IDE"):confirmfile.keywords.splice([confirmfile.keywords.indexOf("IDE")],1)' :checked='confirmfile.keywords.indexOf("IDE")!==-1'></el-checkbox-button> -->
                    <el-checkbox-button label='Java'></el-checkbox-button>
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
            <el-form-item label="文件描述" prop='desc'>  
                <el-input type="textarea" v-model="confirmfile.desc"></el-input>
            </el-form-item>
        </el-form>
        <el-row justify="center" type="flex">
                <el-button type="success" @click="onSubmit">确认</el-button>
        </el-row>
    </div>
</template>

<script>
export default {
    props:['file','adminprofile'],
    data(){
        return {
            confirmfile:{
                filetype:'',
                keywords:[],
                desc:'',
                fileid:null,
                filename:'',
                userid:null,
                filecreationlastid:null
            }
        }
    },
    methods:{
        onSubmit(){
            let _t=this
            //表单校验
            this.$refs.form.validate(function(valid,object){
                //这个objec只在验证失败的时候会返回验证的结果
                if(valid){
                    //表单上传
                    _t.$axios({
                        method:'post',
                        url:'/file/confirm',
                        data:{
                            file_type:_t.confirmfile.filetype,
                            keywords:_t.confirmfile.keywords.join(','),
                            file_desc:_t.confirmfile.desc,
                            adminId:_t.adminprofile.id,
                            file_id:_t.confirmfile.fileid,
                            last_id:_t.confirmfile.filecreationlastid,
                            confirm_create_last_id:_t.adminprofile.workid,
                            create_confirm_admin_work_total:_t.adminprofile.worktotal
                        }
                    }).then(function(response){
                        //1.把表单清除
                        _t.$refs.form.resetFields()
                        //2.发送管理员信息更新事件给父组件
                        _t.$emit('confirmsuccess')
                    }).catch(function(error){
                        _t.$message.error('提交文件审核失败')
                    })
                }
            })
        },
    },
    watch:{
        file:function(newvalue,oldvalue){
            let file={
                filetype:newvalue.file_type,
                keywords:newvalue.keywords,
                desc:newvalue.file_desc,
                fileid:newvalue.id,
                filename:newvalue.file_name,
                userid:newvalue.file_owner,
                filecreationlastid:newvalue.file_creattion_history
            }
            this.confirmfile=Object.assign({},file)
        }
    }
}
</script>

<style scoped>

</style>