<template>
    <div  @click="selectTriger">
        <el-card style='height:180px'>
            <h3 style="margin:0px">{{file.filename}}</h3>
            <p>{{file.desc}}</p>
            <el-row type='flex' justify="space-between">
                <el-col>
                    <el-tag size=mini v-for='(t,i) in file.keywords' :key='i'>{{t}}</el-tag>
                </el-col>
                <el-col :span=10>
                    <a>{{file.filetype}}</a>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    props:['file'],
    data(){
        return {
            
        }
    },
    methods:{
        selectTriger(){
            this.$emit('select',this.file)
        }
    }
}
</script>

<style scoped>
    .el-tag{
        margin-right: 10px;
    }
</style>