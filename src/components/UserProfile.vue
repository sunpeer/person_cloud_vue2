<template>
    <div align='center'>
        <h2>{{userprofile.name}}</h2>
        <p><i class="el-icon-document-add"></i>{{userprofile.createtotal}}
        <el-divider horizon></el-divider>
        <i class="el-icon-download"></i>{{userprofile.downloadtotal}}</p>
        <p>{{userprofile.createtime}}</p>
    </div>
</template>

<script>
export default {
    props:['userprofile']
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
