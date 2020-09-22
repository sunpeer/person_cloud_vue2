<template>
    <div  @click="selectTriger">
        <el-card style='height:180px'>
            <h3 style="margin:0px">{{file.file_name}}</h3>
            <p>{{file.file_desc}}</p>
            <el-row type='flex' justify="space-between">
                <el-col>
                    <el-tag size=mini v-for="(t,i) in file.keywords.split(',')" :key='i'>{{t}}</el-tag>
                </el-col>
                <el-col :span=10>
                    <a>{{file.file_type}}</a>
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
            let file=JSON.parse(JSON.stringify(this.file))
            this.$emit('select',file)
        }
    }
}
</script>

<style scoped>
    .el-tag{
        margin-right: 10px;
    }
</style>