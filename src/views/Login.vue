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
        <el-row v-if='!login' type='flex' justify='center'>
            <el-col :xs=22 :sm=16 :md=10 :lg=8 :xl=6 align='center' id='login'>
                <h2>注册</h2>
                <el-divider></el-divider>
                <el-row >
                    <el-col :span=17 :offset=3>
                        <el-form :model="registerdata" label-width=auto label-suffix=":">
                            <el-form-item prop='id' label="用户名" :rules="[
                            {required:true,message:'请输入用户名',trigger:'blur'}]">
                                <el-input v-model='registerdata.name'></el-input>
                            </el-form-item>
                            <el-form-item prop='pwd' label='密码' :rules="[
                            {required:true,message:'请输入密码',trigger:'blur'}]">
                                <el-input v-model='registerdata.pwd'></el-input>
                            </el-form-item>
                            <el-form-item prop='checkpwd' label='确认密码'>
                                <el-input v-model='registerdata.checkpwd'></el-input>
                            </el-form-item>
                            <el-form-item label='身份' style="margin-bottom:8px">
                                <el-radio-group v-model='registerdata.isuser'> 
                                    <el-radio label="用户"></el-radio>
                                    <el-radio label="管理员"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-button style="display:block" type='success'>提交注册</el-button>
                <h1></h1>
                <h1></h1>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
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
            }
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