<script  lang="ts">
import { defineComponent,nextTick } from 'vue'
import { Delete, Edit, Plus, Search, Share, Upload,Back } from '@element-plus/icons-vue'
interface MsgList{
    question:string,
    answer:string
}
let msgList:MsgList[]=[]
async function setScrollToBottom() {
        await nextTick()
        let chat = document.querySelector("#chat")
        if(chat)
        chat.scrollTop = chat.scrollHeight
}

export default defineComponent({
    data(){
        return {
            show:true,
            recent_chat:['123','456','789'],
            embed_input:"",
            scrollbar_height:0,
            Plus,
            Search,
            Back,
            dialogTableVisible:false,
            form:{
                input: '',//输入
                msgList:msgList //消息列表
            }
        }
    },
    methods:{
        async sendMsg()
        {
            var keyword=this.form.input;
            if(this.form.input.length>0)
            {
                var msg={
                    question:keyword,
                    answer:"AI生成中..."
                };
                this.form.msgList.push(msg);
                
                this.form.input="";
                setScrollToBottom();
                const response=await fetch('/api/chat',{
                    method:"post",
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({
                        question:keyword
                    })
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                let reader:any
                if(response.body)reader = response.body.getReader();
                let decoder = new TextDecoder();
                let resultData = '';
                
                var str="";
                
                msg={
                    question:keyword,
                    answer:str
                };
                this.form.msgList.pop();
                this.form.msgList.push(msg);
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    resultData = decoder.decode(value);
                    console.log(resultData);
                    str+=resultData;
                    msg={
                        question:keyword,
                        answer:str
                    };
                    this.form.msgList.pop();
                    this.form.msgList.push(msg);
                    setScrollToBottom();
                }
            }
        }
    },
    mounted() {
        var main=document.getElementById("main");
        var footer=document.getElementById("footer")
  
        if(main){
            console.log("main"+main.offsetHeight)
            this.scrollbar_height=main.offsetHeight
        }
        if(footer){
            this.scrollbar_height=this.scrollbar_height-50-150
        }
        console.log(this.scrollbar_height)
    },
})


</script>



<template>
    <!-- <div style="height:100%;width: 100%;padding:0;position: absolute;"> -->
        <el-container class="layout-container-demo" style="width:100vw;height: 100vh;">
            <el-aside>
                <el-row>
                    <el-col>LLM 大模型</el-col>
                    <el-col>
                        <el-button v-show="show" @click="show=!show">
                            123
                        </el-button>
                        <el-button v-show="!show" @click="show=!show">
                            456
                        </el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-button  primary :icon="Plus">
                                开始新对话
                        </el-button>
                    </el-col>
                </el-row>
                <el-row>
                    最近对话
                    <el-col>
                        <el-menu class="el-menu-vertical-demo">
                            <el-menu-item v-for="(msg,index) in recent_chat" :index="index">
                                {{ msg }}
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
                Aside
            </el-aside>
            <el-container id="main">
                <el-header id="header">
                    <el-row style="height: 100%;" justify="space-between" align="middle">
                        <div style="display: flex;align-items: center;justify-items: center;">
                            <el-icon><ChatDotRound /></el-icon>
                            标题
                        </div>
                        <el-col :span="6">
                            <el-input :prefix-icon="Search" @focus="dialogTableVisible=true"></el-input>
                        </el-col>
                        <el-col :span="1.5">
                            <el-button  circle >
                                <el-icon><Plus /></el-icon>
                            </el-button>
                            <el-button  circle >
                                <el-icon><Plus /></el-icon>
                            </el-button>
                        </el-col>
                    </el-row>
                </el-header>
                <el-main >
                    <el-scrollbar id="main_chat" :height=scrollbar_height  style="padding: 0;" wrap-style="padding:0;width:70%;margin:auto" view-class="chat-input" >
                            <chat v-for="item in form.msgList" :msg=item></chat>
                    </el-scrollbar>
                </el-main>
                <el-footer id="footer" style="height: 150px;">
                    <div  class="chat-input">
                        <el-input
                            v-model="form.input"
                            type="textarea"
                            placeholder="Please input"
                            style="height: 100%;"
                            @keyup.enter="sendMsg"
                        />
                        <el-row style="margin-top: 5px;margin-bottom: 0px;" justify="space-between" align="middle">
                            <el-button  circle >
                                <el-icon><Plus /></el-icon>
                            </el-button>
                            <el-button size="large" circle @click="sendMsg" >
                                <el-icon size="large"><ChatDotRound /></el-icon>
                            </el-button>
                        </el-row>
                    </div>
                </el-footer>
            </el-container>
        </el-container>
    <!-- </div> -->


    <el-dialog v-model="dialogTableVisible"  :show-close="false" width="800" style="padding: 0;">
        <div class="embed-input" style="margin-bottom: -20px; padding:0" >
            <el-row justify="space-between">
                <el-col :span="22">
                    <el-input v-model="embed_input" style="width: 100%;"></el-input>
                </el-col>
                <el-col :span="2" style=" justify-content: center;">
                   <el-button type="plain" :icon="Back" text  />
                </el-col>
            </el-row>

        </div>
        <el-divider />
        <div class="embed-input" style="margin-bottom: -25px;">
            12312
        </div>
    </el-dialog>
</template>
  



<style scoped>
.layout-container-demo .el-header {
  position: relative;
  height: 50px;
  background-color: white;
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  position: relative;
  width:200px;
  /* height: 100%; */
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.chat-show{
    position: relative;
    display:flex;
    width: 80%;
    border-radius: 15px;
    align-items: normal;
    margin: 0 15px;
    padding: 10px;
    flex-direction: column;
    resize: horizontal;
    border: 1px solid #e7eaec;
    /* overflow-y:scroll; */
}


.chat-input{
    display:flex;
    flex-direction: column;
    align-items: normal;
    /* position:  static; */
    /* bottom: 50px; */
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    border-radius: 15px;
    width: 70%;
    height: calc(100% - 10px);
    /* height: 100px; */
    border: 1px solid #e7eaec;
    /* resize: horizontal; */
    background-color:white;
}
/*因为现在有scoped保护样式限定于该组件，所以使用第三方组件并要修改的特定的样式的话，得使用deep深度选择器*/
.chat-input:deep(.el-textarea__inner){  
    border: none;
    box-shadow: none;
    resize: none;
    height: 100%;
}

.embed-input:deep(.el-input__wrapper) {
            box-shadow: none;
            background-color: white;
}
/* .chat-input textarea {
    resize: none;
    min-height: 50px;
    max-height: 300px;
    padding: 0;
    width: 100%;
    height: 70%;
    border: none;
    box-shadow: none;
} */
.chat-input textarea:focus{
   border: none !important;
   box-shadow: none !important;
}



</style>
  