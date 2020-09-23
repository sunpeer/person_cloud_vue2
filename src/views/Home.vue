<template>
  <div class="home">
    <el-container>
      <el-aside>   
        <el-divider content-position='left'>类型</el-divider>
          <el-radio-group v-model="typeselect">
            <el-radio-button label='软件'></el-radio-button>
            <el-radio-button label='文档'></el-radio-button>
            <el-radio-button label='音乐'></el-radio-button>
            <el-radio-button label='图片'></el-radio-button>
            <el-radio-button label='项目工程'></el-radio-button>
            <el-radio-button :label='null'>任意</el-radio-button>
          </el-radio-group>
        <el-divider content-position='left'>首字母</el-divider>
          <el-radio-group v-model="capitalselect" size="mini">
            <el-radio-button v-for='(t,i) in capitals' :key='i' :label='t'></el-radio-button>
            <el-radio-button :label='null'>任意</el-radio-button>
          </el-radio-group>
        <el-divider content-position='left'>关键字</el-divider>
          <el-checkbox-group v-model="keywordsselect" :max=5>
              <el-checkbox-button v-for='(t,i) in keywords' :key='i' :label='t'></el-checkbox-button>
          </el-checkbox-group>
        <el-divider></el-divider>
        <el-button type="primary" icon="el-icon-search" @click='getFilesByCond'>搜索</el-button>
      </el-aside>
      <el-main>
          <el-collapse accordion>
              <el-collapse-item v-for='(file,index) in files' :key='index'>
                <template slot='title'>
                    <strong style="font-size:x-large">{{file.file_name}}</strong>
                </template>
                <file-card :file='file' @download='file.download_total+=1'>
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
  created(){
    this.getAllFilesId();
  },
  methods:{
    handleFileDownload(fileid){
      this.files.forEach(function(item){
        if(item.id==fileid){
          item.download_total+=1
        }
      })
    },
    getAllFilesId(){
      //扒取所有文件的ids
      let _t=this
      this.$axios.get('/file').then(function(response){
        //把返回数组做个统计
        _t.filescount=response.data.data.ids.length
        //把返回值做成字符串
        _t.filesid=response.data.data.ids.join(',')
      }).catch(function(error){
        _t.$message.error('获取平台所有文件的id失败')
        console.log(error)
      })
      },
      getFilesByCond(){
        let _t=this
        let params={}
        _t.typeselect?(params.type=_t.typeselect):null
        _t.capitalselect?(params.capital=_t.capitalselect):null
        _t.keywordsselect.length==0?null:(params.keyword=_t.keywordsselect)
        _t.$axios.get('/search/file',{params}).then(function(response){
        //把返回数组做个统计
        _t.filescount=response.data.data.ids.length
        //把返回值做成字符串
        _t.filesid=response.data.data.ids.join(',')
      }).catch(function(error){
        _t.$message.error('获取平台所有文件的id失败')
        console.log(error)
      })
      }
  },
  data:function(){
    return {
      keywords:['Java','IDE','机械','HTML','CSS','PHP','C++','C#','Matlab','电子'],
      capitals:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      typeselect:'',
      filescount:0,
      currentpage:1,
      capitalselect:'',
      keywordsselect:[],
      files:[

      ],
      filesid:''
    }
  },
  components:{
    FileCard,
  },
  watch:{
    filesid(newvalue,oldvalue){
      let _t=this
      //文件id改变了，就直接展示前10个文件就好
      let ids=''
      _t.currentpage=0
      if(_t.filescount<11)
        ids=newvalue
      else
        ids=newvalue.split(',').splice(0,10).join(',')
      if(!ids){ //如果为空的，则先清空，再return
        _t.files.splice(0)
        return
      }
      _t.$axios.get('/file',{params:{ids}}).then(function(response){
        //把当前的数组清空
        _t.files.splice(0)
        //把文件信息塞进数组
        let index=0
        response.data.data.files.forEach(function(item){
            _t.$set(_t.files,index++,item)
        })
      }).catch(function(error){
          _t.$message.error('获取文件的信息失败')
        })
    },
  }
};
</script>

<style scoped>
  .el-main{
    padding-top:0px !important;
  }
</style>
