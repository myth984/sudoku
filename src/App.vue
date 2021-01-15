<template>
  <div id="app">
    <div>
      <input v-model="fillSum" class="sum-input" placeholder="需要填的数量" />
      <button @click="restart" class="btn">重来</button>
    </div>
    <div>时间:{{ gameTime }}</div>
    <Table :table="table"> </Table>
    <ButtonGroup :table="table"></ButtonGroup>
  </div>
</template>

<script>
import Table from "./components/Table";
import ButtonGroup from "./components/ButtonGroup";
import { getBlankTable } from "@/assets/algo";
export default {
  name: "App",
  components: {
    Table,
    ButtonGroup,
  },
  data() {
    return {
      table: getBlankTable(),
      fillSum: 49,
      gameTime: 0,
      timeId: undefined,
    };
  },
  methods: {
    restart() {
      if (this.fillSum < 10 || this.fillSum > 80) {
        alert("你别玩了");
        return;
      }
      if (!/^\d+$/.test(this.fillSum)) {
        alert("输个阳间数");
        return;
      }
      this.table = getBlankTable(this.fillSum);
    },
  },
  mounted() {
    this.$once("startGame", () => {
      this.timeId = setInterval(() => {
        this.gameTime++;
      }, 1000);
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f3f3f0;
  display: grid;
  grid-template-rows: auto auto;
  align-items: center;
  justify-items: center;

}
html,
body {
  padding: 0;
  margin: 0;
    background-color: #294051;
}
</style>
<style  scoped>
.btn {
  margin: 5px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #ae927e;
  border: 1px solid #ae927e;
  color: #f4f4f1;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.sum-input {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
