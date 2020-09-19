<template>
  <div id="app">
    <el-container >
      <el-header>
        <rainbow-menu-bar>
        </rainbow-menu-bar>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <!-- <el-footer>
        Author: 李阳
      </el-footer> -->
    </el-container>
  </div>
</template>


<script>
import RainbowMenuBar from './components/RainbowMenuBar'
export default {
  components: {RainbowMenuBar},
  methods:{

  }
}
</script>
<style lang="less" scoped>
  .el-container{
    height: 100%;
    width:100%;
    position: absolute;
  }
  #app{
    height: 100%;
    width:100%;
    position: absolute;
  }
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0px 0px 0px 0px !important;
  }
  .el-footer{
    font-family: "Helvetica Neue";
    text-align: center;
  }
  .el-main{
    padding-left: 5px !important;
  }
  #div1,#div2,#div3,#div4{
    border:solid 1px;
  }
</style>
