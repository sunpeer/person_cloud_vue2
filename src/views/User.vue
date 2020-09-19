<template>
    <div>
        <el-row>
            <el-col :span=16>
                <upload-file></upload-file>
            </el-col>
            <el-col :offset=2 :span=6>
                <el-divider content-position='left'>上传记录</el-divider>
                <el-timeline>
                    <el-timeline-item v-for="(file,index) in createfiles" :key='index' :timestamp='file.createtime'>
                        {{file.name}}&nbsp;<a style="font-style:italic;font-size:80%">{{file.downloadcount}}<i class="el-icon-download"></i></a>
                    </el-timeline-item>
                </el-timeline>
                <br/>
                <el-divider content-position='left'>下载记录</el-divider>
                <el-timeline>
                    <el-timeline-item v-for="(file,index) in createfiles" :key='index' :timestamp='file.createtime'>
                        {{file.name}}<span>{{file.downloadcount}}</span>
                    </el-timeline-item>
                </el-timeline>
            </el-col>
        
        </el-row>
    </div>
</template>

<script>
import UploadFile from "../components/UploadFile"

export default {
    components:{
        UploadFile
    },
    data(){
        return {
            createfiles:[
                {
                    createtime:'2020-9-10 00:00:00',
                    name:'WPS',
                    downloadcount:23
                },
                {
                    createtime:'2020-9-11 00:00:00',
                    name:'WPS',
                    downloadcount:23
                },
                {
                    createtime:'2020-9-12 00:00:00',
                    name:'WPS',
                    downloadcount:23
                },
                {
                    createtime:'2020-9-13 00:00:00',
                    name:'WPS',
                    downloadcount:23
                },
                {
                    createtime:'2020-9-13 00:00:00',
                    name:'WPS',
                    downloadcount:23
                },
            ]
        }
    }
}
</script>

<style scoped>

.el-divider{
    margin-top:0px
}

/* .el-timeline-item__timestamp{
     font-size: 80% !important;
} */
</style>