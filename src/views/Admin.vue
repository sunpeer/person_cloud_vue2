<template>
    <div>
        <el-row>
            <el-col :span=16>
                <confirm-file></confirm-file>
            </el-col>
            <el-col :span=6 :offset=2>
            <el-divider content-position='left'>校核记录</el-divider>
                <el-timeline>
                    <el-timeline-item v-for='(file,index) in confirmedfiles' :key='index' :timestamp='file.confirmdate'>
                        {{file.filename}}
                    </el-timeline-item>
                </el-timeline>
            </el-col>
        </el-row>
        <br/>
        <el-divider content-position='left'>待审核文件</el-divider>
        <el-carousel type="card" height='200px'>
            <el-carousel-item v-for='(file,index) in confirmingfiles' :key='index'>
                <file-card :file='file'></file-card>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import ConfirmFile from "../components/ConfirmFile.vue"
import FileCard from "../components/FileCard.vue"

export default {
    components:{
        ConfirmFile,
        FileCard
    },
    data(){
        return {
            confirmedfiles:[
                {
                    filename:'WPS',
                    confirmdate:'2020-10-11 00:00:00'
                },
                {
                    filename:'WPS',
                    confirmdate:'2020-10-10 00:00:00'
                },
                {
                    filename:'WPS',
                    confirmdate:'2020-10-09 00:00:00'
                },
                {
                    filename:'WPS',
                    confirmdate:'2020-10-08 00:00:00'
                },
                {
                    filename:'WPS',
                    confirmdate:'2020-10-07 00:00:00'
                }
            ],
            confirmingfiles:[
{
          filename:'WPS',
          userid:1,
          fileid:1,
          keywords:'JAVE,IDE',
          type:'软件',
          size:1200,
          state:'normal',
          desc:"这是一本非常好的书，我把他奉献出来给课题室的所有人使用，#######################################################，省略一万字",
          time:'2020-10-01 00:00:00',
          downloadcount:10
        },
        {
          filename:'WPS',
          keywords:'JAVE,IDE,IDE',
          type:'软件',
          size:1200,
          state:'creating',
          desc:"这是一本非常好的书，我把他奉献出来给课题室的所有人使用，#######################################################，省略一万字",
          time:'2020-10-01 00:00:00',
          downloadcount:10,
          userid:1,
          fileid:1
        },
        {
          filename:'WPS',
          keywords:'JAVE,IDE,IDE',
          type:'软件',
          size:1200,
          state:'creating',
          desc:"这是一本非常好的书，我把他奉献出来给课题室的所有人使用，#######################################################，省略一万字",
          time:'2020-10-01 00:00:00',
          downloadcount:10,
          userid:1,
          fileid:1
        },
        {
          filename:'WPS',
          keywords:'JAVE,IDE,IDE',
          type:'软件',
          size:1200,
          state:'creating',
          desc:"这是一本非常好的书，我把他奉献出来给课题室的所有人使用，#######################################################，省略一万字",
          time:'2020-10-01 00:00:00',
          downloadcount:10,
          userid:1,
          fileid:1
        },
        {
          filename:'WPS',
          keywords:'JAVE,IDE,IDE',
          type:'软件',
          size:1200,
          state:'creating',
          desc:"这是一本非常好的书，我把他奉献出来给课题室的所有人使用，#######################################################，省略一万字",
          time:'2020-10-01 00:00:00',
          downloadcount:10,
          userid:1,
          fileid:1
        },
        {
          filename:'WPS',
          keywords:'JAVE,IDE,IDE',
          type:'软件',
          size:1200,
          state:'creating',
          desc:"这是一本非常好的书，我把他奉献出来给课题室的所有人使用，#######################################################，省略一万字",
          time:'2020-10-01 00:00:00',
          downloadcount:10,
          userid:1,
          fileid:1
        },
        {
          filename:'WPS',
          keywords:'JAVE,IDE,IDE',
          type:'软件',
          size:1200,
          state:'creating',
          desc:"这是一本非常好的书，我把他奉献出来给课题室的所有人使用，#######################################################，省略一万字",
          time:'2020-10-01 00:00:00',
          downloadcount:10,
          userid:1,
          fileid:1
        },
        {
          filename:'WPS',
          keywords:'JAVE,IDE,IDE',
          type:'软件',
          size:1200,
          state:'creating',
          desc:"这是一本非常好的书，我把他奉献出来给课题室的所有人使用，#######################################################，省略一万字",
          time:'2020-10-01 00:00:00',
          downloadcount:10,
          userid:1,
          fileid:1
        },
        {
          filename:'WPS',
          keywords:'JAVE,IDE,IDE',
          type:'软件',
          size:1200,
          state:'creating',
          desc:"这是一本非常好的书，我把他奉献出来给课题室的所有人使用，#######################################################，省略一万字",
          time:'2020-10-01 00:00:00',
          downloadcount:10,
          userid:1,
          fileid:1
        },
        {
          filename:'WPS',
          keywords:'JAVE,IDE,IDE',
          type:'软件',
          size:1200,
          state:'creating',
          desc:"这是一本非常好的书，我把他奉献出来给课题室的所有人使用，#######################################################，省略一万字",
          time:'2020-10-01 00:00:00',
          downloadcount:10,
          userid:1,
          fileid:1
        },
      ]
        }
    }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>