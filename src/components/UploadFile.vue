<template>
    <div>
        <el-form :model="uploadform" label-width="100px" label-suffix=":">
            <el-form-item label='文件名'>
                <el-input v-model='uploadform.filename'></el-input>
            </el-form-item>
            <el-form-item label="文件类型">
                <el-radio-group v-model='uploadform.filetype'>
                    <el-radio label='软件'></el-radio>
                    <el-radio label="文档"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="文件关键字">
                <el-radio-group v-model="uploadform.keywords">
                    <el-checkbox-button label='JAVA'></el-checkbox-button>
                    <el-checkbox-button label='IDE'></el-checkbox-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="文件描述"> 
                <el-input type="textarea" v-model="uploadform.desc"></el-input>
            </el-form-item>
        </el-form>
        <el-row justify='center' type='flex'>
            <!-- <el-col :span=12 align='center'> -->
                <el-upload drag :data="uploadform" :with-credentials=true :auto-upload=false action="http://localhost:3000">
                    <i class="el-icon-upload"></i>
                    <div >将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            <!-- </el-col> -->
        </el-row>
        <br/>
        <el-row justify="center" type='flex'>
            <el-button type='success'>上传到服务器</el-button>
        </el-row>
            <!-- 文件名 -->
            <!-- 文件类型 -->
            <!-- 文件关键字 -->
            <!-- 文件描述 -->
    </div>
</template>


<script>
export default {
    data(){
        return {
            uploadform:{
                filename:'wps',
                filetype:'软件',
                keywords:['JAVA'],
                file_desc:'无'
            },
        }
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