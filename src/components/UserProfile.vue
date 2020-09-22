<template>
    <div align='center'>
        <h2>{{userprofile.name}}</h2>
        <div>
            <el-tooltip effect='light' placement='bottom' :content='`你上传了${userprofile.createtotal}个文件`'>
                <i class="el-icon-document-add">{{userprofile.createtotal}}</i>
            </el-tooltip>
            |
            <el-tooltip effect='light' placement='bottom' :content='`你下载了${userprofile.downloadtotal}个文件`'>
            <i class="el-icon-download">{{userprofile.downloadtotal}}</i>
            </el-tooltip>
        </div>
        <p>用户注册时间：<span style="font-style:italic;">{{createtime}}</span></p>
    </div>
</template>

<script>
export default {
    props:['userprofile'],
    computed:{
        createtime(){
             return this.userprofile.createtime.substr(0,10)
       }
    }
}
</script>

<style scoped>
    div{
        width:100%;
        height:100%;
        border-width:0 1px 0 0;
    }
    p{
        font-size: large;
    }
    
</style>
