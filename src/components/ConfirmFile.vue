<template>
    <div>
        <el-form :model='confirmfile' label-width="100px" label-suffix=":">
            <el-form-item label="文件类型">
                <el-radio-group v-model='confirmfile.filetype'>
                    <el-radio label='软件'></el-radio>
                    <el-radio label="文档"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="文件关键字">
                <el-radio-group v-model="confirmfile.keywords" >
                    <!-- <el-checkbox-button label='JAVA' @change='onKeywordsChange'></el-checkbox-button> -->
                    <el-checkbox-button label='JAVA' @change='$event?confirmfile.keywords.push("JAVA"):confirmfile.keywords.splice([confirmfile.keywords.indexOf("JAVA")],1)' :checked='confirmfile.keywords.indexOf("JAVA")!==-1'></el-checkbox-button>
                    <!-- <el-checkbox-button label='IDE' @change='onKeywordsChange'></el-checkbox-button> -->
                    <el-checkbox-button label='IDE' @change='$event?confirmfile.keywords.push("IDE"):confirmfile.keywords.splice([confirmfile.keywords.indexOf("IDE")],1)' :checked='confirmfile.keywords.indexOf("IDE")!==-1'></el-checkbox-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="文件描述"> 
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
    data(){
        return {
            confirmfile:{
                filetype:'软件',
                keywords:['JAVA','IDE'],
                desc:'无'
            }
        }
    },
    methods:{
        onSubmit(){

        },

    }
}
</script>

<style scoped>

</style>