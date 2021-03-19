<template>
  <div>
    <textarea
      readonly
      style="width: 300px; height: 468px; margin-top: 30px"
      v-model="msg"
      ref="textarea"
    >
    </textarea>
    <div>
      <input v-model="willSendMsg" @keyup.enter="onEnter" />
    </div>
  </div>
</template>

<script>
import { listenChartChange } from "@/api/api";
export default {
  props: ["user"],
  computed: {
    msg() {
      return this.msgList.join("\n");
    },
  },
  data() {
    return {
      msgList: [],
      willSendMsg: "",
    };
  },
  methods: {
    onEnter() {
      this.user.sendMsg(this.user.name + ":" + this.willSendMsg);
      this.willSendMsg = "";
      this.setScrollLastPositon();
    },
    startListen() {
      listenChartChange((message) => {
        console.log("消息来了");
        console.log(message);
        if (message) {
          this.msgList.push(message.msg);
        }
        // console.log(message);
      });
    },
    setScrollLastPositon() {
      this.$refs.textarea.scrollTop = this.$refs.textarea.scrollHeight;
    },
  },
};
</script>

<style scope>
input {
  -webkit-appearance: none;
  background-image: none;
  border-radius: 0px;
  border: 2px solid #000;
  box-sizing: border-box;
  color: #000;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-top: 25px;
  width: 100%;
}
textarea {
  -webkit-appearance: none;
  background-image: none;
  border-radius: 0px;
  border: 2px solid #000;
  box-sizing: border-box;
  color: #000;
  font-size: inherit;
  height: 40px;
  outline: none;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-family: dingmou, Avenir, Helvetica, Arial, sans-serif;
}
</style>
