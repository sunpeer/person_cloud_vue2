<template>
    <div align='center'>
        <h2>{{adminprofile.name}}</h2>
        <p><i class="el-icon-document-add"></i>{{adminprofile.worktotal}}</p>
        <p>{{adminprofile.createtime}}</p>
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