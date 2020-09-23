<template>
    <div @mouseenter="onHover()">
        <el-menu default-active="1" mode="horizontal" :background-color="backgroundcolor" text-color="#ffffff" active-text-color="#ffd04b">
            <el-menu-item index="1"><router-link to='/'>云中心</router-link></el-menu-item>
            <el-submenu index="2" >
                <template slot='title'>个人中心</template>
                <el-menu-item index='2-1'>
                    <router-link :to="{name:'user',params:{id:userid}}" >
                        用户中心
                    </router-link>
                </el-menu-item>
                <el-menu-item index='2-2'>
                    <router-link :to="{name:'admin',params:{id:adminid}}">
                        管理员中心
                    </router-link>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            backgroundcolor:'#0099ff',
            userid:0,
            adminid:0
        }
    },
    props:['id','type'],

    methods:{ 
        onHover(){
            // console.log('on mouseenter')
            this.backgroundcolor=this.getRandomColor()
        },
        getRandomColor(){
            return `rgb(0,${Math.floor(Math.random()*200)},${100+Math.floor(Math.random()*200)})`
        }
    },
    watch:{
        type(newvalue,oldvalue){
            if(newvalue=='user'){
                this.userid=this.id
                this.adminid=0
            }else if(newvalue=='admin'){
                this.adminid=this.id
                this.userid=0
            }else{
                this.userid=0
                this.adminid=0
            }
        }
    }
        
}
</script>

<style scoped>
    a{
        text-decoration: none;
    }
</style>