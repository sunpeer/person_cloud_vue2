<template>
    <div align='center'>
        <h2>{{adminprofile.name}}</h2>
        <el-tooltip effect='light' :content="`你审核过${adminprofile.worktotal}份文件`">
            <p><i class="el-icon-document-add"></i>{{adminprofile.worktotal}}</p>
        </el-tooltip>
        <p>{{adminprofile.createtime.substr(0,10)}}</p>
    </div>
</template>

<script>
export default {
    props:['adminprofile']
}
</script>

<style scoped>
    div{
        width:100%;
        height:100%;
        border-width:0 1px 0 0;
        border-style:solid;
    }
    p{
        font-size: large;
    }
</style>