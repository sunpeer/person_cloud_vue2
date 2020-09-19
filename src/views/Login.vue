<template>
    <div>
        <br/>
        <br/>
        <br/>
        <el-row v-if='login' type='flex' justify='center'>
            <el-col :xs=22 :sm=18 :md=12 :lg=10 :xl=6 align='center' id='login'>
                <h2>登录</h2>
                <el-divider></el-divider>
                <el-row >
                    <el-col :span=17 :offset=3>
                        <el-form :model="logindata" label-width="60px" label-suffix=":">
                            <el-form-item prop='id' label="账号" :rules="[
                            {required:true,message:'请输入账号',trigger:'blur'}]">
                                <el-input v-model='logindata.id'></el-input>
                            </el-form-item>
                            <el-form-item prop='pwd' label='密码' :rules="[
                            {required:true,message:'请输入密码',trigger:'blur'}]">
                                <el-input v-model='logindata.pwd'></el-input>
                            </el-form-item>
                            <el-form-item label='身份' style="margin-bottom:8px">
                                <el-radio-group v-model='logindata.isuser'> 
                                    <el-radio label="用户"></el-radio>
                                    <el-radio label="管理员"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row type='flex' justify='end'>
                    <el-link type="primary" style="right:20px">忘记密码</el-link>
                    <el-col :span=1></el-col>
                    <el-link type="success" style="right:20px">注册</el-link>
                    <el-col :span=3></el-col>
                </el-row>
                <el-button style="display:block" type='success'>登录</el-button>
                <h1></h1>
                <h1></h1>
                <br>
            </el-col>
        </el-row>
        <el-row v-else type='flex' justify='center'>
            <el-col :xs=22 :sm=16 :md=10 :lg=8 :xl=6 align='center' id='login'>
                <h2>注册</h2>
                <el-divider></el-divider>
                <el-row >
                    <el-col :span=17 :offset=3>
                        <el-form ref='register' :hide-required-asterisk=true :model="registerdata" label-width=auto status-icon :rules='registerrules' label-suffix=":">
                            <el-form-item prop='name' label="用户名" >
                                <el-input v-model='registerdata.name'></el-input>
                            </el-form-item>
                            <el-form-item prop='pwd' label='密码'>
                                <el-input type="password" v-model='registerdata.pwd'></el-input>
                            </el-form-item>
                            <el-form-item prop='checkpwd' label='确认密码'>
                                <el-input type="password" v-model='registerdata.checkpwd' ></el-input>
                            </el-form-item>
                            <el-form-item label='身份' prop='isuser' style="margin-bottom:8px">
                                <el-radio-group v-model='registerdata.isuser'> 
                                    <el-radio :label=true >用户</el-radio>
                                    <el-radio :label=false>管理员</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row type='flex' justify='end'>
                <!-- <a @click='login=true'> -->
                    <el-link @click='login=true' type="primary" style="right:20px" >我有账号</el-link>
                <!-- </a> -->
                <el-col :span=3></el-col>
                </el-row>
                <el-button style="display:block" type='success' @click='submit("register")'>提交注册</el-button>
                <h1></h1>
                <h1></h1>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        let validateRegisterPwd=(rule,value,callback)=>{
            if(!value){
                callback(new Error('请输入密码'))
            }else{
                if(!this.registerdata.pwd){
                    //??这是异步的吗
                    this.$refs.register.validateField('checkpwd')
                }
            }
            //这个是一定会执行的
            callback();
        }
        let validateRegisterCheckPwd=(rule,value,callback)=>{
            if(!value){
                callback(new Error('请再次输入密码'))
            }else if(this.registerdata.pwd!==this.registerdata.checkpwd){
                callback(new Error('两次输入的密码不一样'))
            }else{
                callback()
            }
        }
        return {
            logindata:{
                pwd:'',
                id:'' ,
                isuser:true
            },
            login:false,
            registerdata:{
                pwd:'',
                name:'',
                checkpwd:'',
                isuser:true,
            },
            registerrules:{
                pwd:[
                    {validator:validateRegisterPwd,trigger:'blur'}
                ],
                checkpwd:[
                    {validator:validateRegisterCheckPwd,trigger:'blur'}
                ],
                name:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    {max:10,message:'长度不能超过10个字符',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        registerUpload(){
            console.log('registerUploading:%O',this.registerdata)
        },
        loginUpload(){
            console.log('loginUploading:%O',this.logindata)
        },
        submit(formname){
            var validateCallback=formname=='register'?this.registerUpload:this.loginUpload
            this.$refs[formname].validate((valid)=>{
                if(valid){
                    this.$message.success('Submit!')
                    this.registerUpload();
                }else{
                    this.$message.error('请按要求输入数据')
                }
            })
        }
    }
}
</script>

<style scoped>
    #login{
        box-shadow:0 2px 12px 0 rgba(0,0,0,0.1);
        border-radius:20px;
    }
</style>