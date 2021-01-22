<template>
  <div id="app">
    <div>
      <!-- <input v-model="fillSum" class="sum-input" placeholder="需要填的数量" /> -->
      <!-- <button @click="restart" class="btn">重来</button> -->
    </div>

    <!-- <div style="font-size: 25px">时间:{{ gameTime }}</div> -->
    <div style="display: grid; grid-template-columns: repeat(2, auto)">
      <div
        style="
          display: grid;
          grid-template-rows: repeat(2, auto);
          justify-items: center;
        "
      >
        <Table :table="table"> </Table>
        <ButtonGroup :table="table"></ButtonGroup>
      </div>
      <div>
        <ChartRoom ref="chartRoom" :user="user"></ChartRoom>
      </div>
    </div>
    {{ table.id }}
    <Dialog ref="dialog">
      <input @keyup.enter="submitName($event)" placeholder="怎么称呼" />
    </Dialog>
  </div>
</template>

<script>
import Table from "./components/Table";
import ButtonGroup from "./components/ButtonGroup";
import ChartRoom from "./components/ChartRoom";
import Dialog from "./components/Dialog";
import { getBlankTable, generateTable } from "@/assets/algo";
import User from "@/assets/user";
import { getOnlineTable, listenTableChange } from "@/api/api";
export default {
  name: "App",
  components: {
    Table,
    ButtonGroup,
    ChartRoom,
    Dialog,
  },
  data() {
    return {
      table: {},
      fillSum: 49,
      gameTime: 0,
      timeId: undefined,
      user: undefined,
    };
  },
  methods: {
    restart() {
      console.log("重开了");
      if (this.fillSum < 10 || this.fillSum > 80) {
        alert("你别玩了");
        return;
      }
      if (!/^\d+$/.test(this.fillSum)) {
        alert("输个阳间数");
        return;
      }
      this.gameTime = 0;
      this.table = getBlankTable(this.fillSum);
      this.$once("startGame", () => {
        this.timeId = setInterval(() => {
          this.gameTime++;
        }, 1000);
      });
    },
    async submitName(e) {
      let name = e.target.value;
      if (!name) {
        return;
      }
      this.$refs.dialog.dialogVisible = false;
      this.user = new User(name);
      // 登陆
      await this.user.login();
      // 加入聊天室
      this.user.joinChartRoom(this.$refs.chartRoom.msgList);
      this.$refs.chartRoom.startListen();
    },
    initTable() {
      // 将线上的数据构建成标准对象
      getOnlineTable().then((table) => {
        this.table = generateTable(table.data[0]);
        listenTableChange(this.table, (table) => {
          this.table = generateTable(table);
        });
      });
    },
  },
  mounted() {
    this.$once("startGame", () => {
      this.timeId = setInterval(() => {
        this.gameTime++;
      }, 1000);
    });
    this.initTable();
  },
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  /* background-color: #294051; */
  /* color: #f3f3f0; */
  font-family: dingmou, Avenir, Helvetica, Arial, sans-serif;
}
input,
button {
  font-family: dingmou, Avenir, Helvetica, Arial, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: grid;
  grid-template-rows: auto auto;
  align-items: center;
  justify-items: center;
}
</style>
<style  scoped>
.btn {
  margin: 5px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  /* background: #ae927e; */
  background: #fff;
  border: 2px solid #000;
  color: #000;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 3px 10px 9px 10px;
  font-size: 24px;
  border-radius: 0px;
  font-family: dingmou, Avenir, Helvetica, Arial, sans-serif;
}
.sum-input {
  -webkit-appearance: none;
  /* background-color: #fff; */
  background-image: none;
  border-radius: 0px;
  /* border: 1px solid #dcdfe6; */
  border: 2px solid #000;
  box-sizing: border-box;
  /* color: #606266; */
  color: #000;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
