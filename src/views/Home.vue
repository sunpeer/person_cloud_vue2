<template>
  <div class="home">
    <el-container>
      <el-aside>   
        
        <el-divider content-position='left'>类型</el-divider>
          <el-radio-group v-model="typeselect">
            <el-radio-button label='软件'></el-radio-button>
            <el-radio-button label='文档'></el-radio-button>
            <el-radio-button label='音乐'></el-radio-button>
            <el-radio-button label='type1'></el-radio-button>
            <el-radio-button label='type2'></el-radio-button>
            <el-radio-button label='type3'></el-radio-button>
            <el-radio-button label='任意'></el-radio-button>
          </el-radio-group>
        <el-divider content-position='left'>首字母</el-divider>
          <el-radio-group v-model="capitalselect" size="mini">
            <el-radio-button label='A'></el-radio-button>
            <el-radio-button label='B'></el-radio-button>
            <el-radio-button label='C'></el-radio-button>
            <el-radio-button label='D'></el-radio-button>
            <el-radio-button label='E'></el-radio-button>
            <el-radio-button label='F'></el-radio-button>
            <el-radio-button label='G'></el-radio-button>
            <el-radio-button label='H'></el-radio-button>
            <el-radio-button label='I'></el-radio-button>
            <el-radio-button label='J'></el-radio-button>
            <el-radio-button label='K'></el-radio-button>
            <el-radio-button label='L'></el-radio-button>
            <el-radio-button label='M'></el-radio-button>
            <el-radio-button label='N'></el-radio-button>
            <el-radio-button label='O'></el-radio-button>
            <el-radio-button label='P'></el-radio-button>
            <el-radio-button label='Q'></el-radio-button>
            <el-radio-button label='R'></el-radio-button>
            <el-radio-button label='S'></el-radio-button>
            <el-radio-button label='T'></el-radio-button>
            <el-radio-button label='U'></el-radio-button>
            <el-radio-button label='V'></el-radio-button>
            <el-radio-button label='W'></el-radio-button>
            <el-radio-button label='X'></el-radio-button>
            <el-radio-button label='Y'></el-radio-button>
            <el-radio-button label='Z'></el-radio-button>
            <el-radio-button label='任意'></el-radio-button>
          </el-radio-group>
        <el-divider content-position='left'>关键字</el-divider>
          <el-checkbox-group v-model="keywordsselect">
            <el-checkbox-button label='JAVE'></el-checkbox-button>
            <el-checkbox-button label='IDE'></el-checkbox-button>
          </el-checkbox-group>
        <el-divider></el-divider>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-aside>
      <el-main>
          <el-collapse accordion>
              <el-collapse-item v-for='(file,index) in files' :key='index'>
                <template slot='title'>
                    <strong style="font-size:x-large">{{file.filename}}</strong>
                </template>
                <file-card :file='file'>
                </file-card>
              </el-collapse-item>
          </el-collapse>
          <el-pagination :total="filescount" :current-page='currentpage' :pager-count=5 :page-size=10 layout="prev,pager,next" :hide-on-single-page=true>
          </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import FileCard from "../components/FileCard"

export default {
  name: "Home",
  data:function(){
    return {
      typeselect:'',
      filescount:100,
      currentpage:1,
      capitalselect:'',
      keywordsselect:[],
      files:[
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
          keywords:'JAVE,IDE',
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
          keywords:'JAVE,IDE',
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
          keywords:'JAVE,IDE',
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
          keywords:'JAVE,IDE',
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
          keywords:'JAVE,IDE',
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
          keywords:'JAVE,IDE',
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
          keywords:'JAVE,IDE',
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
          keywords:'JAVE,IDE',
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
          keywords:'JAVE,IDE',
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
  },
  created(){

  },
  components:{
    FileCard,
  }
};
</script>

<style scoped>
  .el-main{
    padding-top:0px !important;
  }
  /* .el-divider{
    margin-top: 10px;
    margin-bottom: 10px;
  } */
</style>
