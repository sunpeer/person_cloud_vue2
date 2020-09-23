<template>
    <div>
        <el-card>
            <p style="margin-top:0px;margin-bottom:5px">{{file.file_desc}}</p>
            <el-row type='flex' justify="space-between"> 
                <el-col>
                    <el-tag size=mini v-for='(t,i) in file.keywords.split(",")' :key='i'>{{t}}</el-tag>
                </el-col>
                <el-col>
                    <el-divider direction="vertical"></el-divider>
                    <!-- <el-tooltip placement="bottom" effect='light' :content='file.type'> -->
                        <i :class="typemap[file.file_type]">{{file.file_type}}</i>
                    <!-- </el-tooltip> -->
                    <el-divider direction="vertical"></el-divider>
                        <i class='el-icon-download'>{{file.download_total}}</i>
                    <el-divider direction="vertical"></el-divider>
                </el-col>
                <el-col :span=4>
                    <!-- <el-tooltip placement="bottom" effect='light' :content="statemap[file.state]"> -->
                        <el-button size=mini type="primary" :disabled="file.state=='creating'" @click='handleDownload'>下载</el-button>
                    <!-- </el-tooltip> -->
                </el-col>
            </el-row>
    </el-card>
    </div>
</template>


<script>
import $ from 'jquery'
export default {
    props:['file'],
    data(){
        return {
            typemap:{
                '软件':'el-icon-magic-stick',
                '文档':'el-icon-notebook-2',
                '音乐':'el-icon-microphone',
                '图片':'el-icon-picture-outline-round',
                '项目工程':'el-icon-camera'
            },
            statemap:{
                'normal':'下载',
                'creating':'校核中'
            }
        }
    },
    methods:{
        handleDownload(){
            //判断是否登录
            if(sessionStorage.getItem('logintype')=='user'){
                //登录了，则可以下载
                let id=parseInt(sessionStorage.getItem('loginid'))
                let user_download_total=parseInt(sessionStorage.getItem('download_total'))
                let data={
                    userid:id,
                    file_id:this.file.id,
                    user_download_total,
                    download_file_download_total:this.file.download_total
                    }
                sessionStorage.getItem('download_id')=='null'?null:data.file_download_user_log=parseInt(sessionStorage.getItem('download_id'))
                this.file.file_download_history==null?null:(data.last_id=this.file.file_download_history)

                let config=$.extend(true,{
                method:'post',
                url:'http://localhost:3000/file/download',
                data})
                let $iframe=$('<iframe id="down-file-iframe"/>')
                let $form=$('<form target="down-file-iframe" method="'+config.method+'" />')
                $form.attr('action',config.url)
                for(var key in config.data){
                    $form.append('<input type="hidden" name="'+key+'" value="'+config.data[key]+'" />')
                }
                $iframe.append($form);
                $(document.body).append($iframe)
                $form[0].submit()
                $iframe.remove()
                this.$emit('download',this.file.id)
            }else{
                //没登录，跳转到登录界面先执行登录
                this.$router.push({name:'login',params:{type:'user'}})
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