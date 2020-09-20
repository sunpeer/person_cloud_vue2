<template>
    <div @mouseenter="onHover()">
        <el-menu default-active="1" mode="horizontal" :background-color="backgroundcolor" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1"><router-link to='/'>云中心</router-link></el-menu-item>
            <el-menu-item index="2"><router-link :to="{name:'user',params:{type:'user'}}">个人中心</router-link></el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            backgroundcolor:'#0099ff'
        }
    },
    methods:{ 
        onHover(){
            // console.log('on mouseenter')
            this.backgroundcolor=this.getRandomColor()
        },
        getRandomColor(){
            return `rgb(0,${Math.floor(Math.random()*200)},${100+Math.floor(Math.random()*200)})`
        }
    }
}
</script>

<style scoped>
    a{
        text-decoration: none;
    }
</style>