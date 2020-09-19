<template>
    <div>
        <el-card>
            <p style="margin-top:0px;margin-bottom:5px">{{file.desc}}</p>

            <el-row type='flex' justify="space-between"> 
                <el-col>
                    <el-tag size=mini v-for='(t,i) in file.keywords.split(",")' :key='i'>{{t}}</el-tag>
                </el-col>
                <el-col>
                    <el-divider direction="vertical"></el-divider>
                    <!-- <el-tooltip placement="bottom" effect='light' :content='file.type'> -->
                        <i :class="typemap[file.type]">{{file.type}}</i>
                    <!-- </el-tooltip> -->
                    <el-divider direction="vertical"></el-divider>
                        <i class='el-icon-download'>{{file.downloadcount}}</i>
                    <el-divider direction="vertical"></el-divider>
                </el-col>
                <el-col :span=4>
                    <!-- <el-tooltip placement="bottom" effect='light' :content="statemap[file.state]"> -->
                        <el-button size=mini type="primary" :disabled="file.state=='creating'">下载</el-button>
                    <!-- </el-tooltip> -->
                </el-col>
            </el-row>
        <!-- 文件类型 -->
        <!-- 文件状态 -->
        <!-- 文件大小 -->
        <!-- 关键字 -->
        <!-- 文件描述 -->
        <!-- 下载次数 -->
        <!-- 文件拥有者 -->
        <!-- 下载按钮 -->
        <!-- 创建时间 -->
    </el-card>
    </div>
</template>


<script>
export default {
    props:['file'],
    data(){
        return {
            typemap:{
                '软件':'el-icon-magic-stick',
                '文档':'el-icon-notebook-2'
            },
            statemap:{
                'normal':'下载',
                'creating':'校核中'
            }
        }
    }
}
</script>

<style scoped>
    .el-tag{
        margin-right: 10px;
    }
    .el-card{
        padding:0px;
    }
</style>