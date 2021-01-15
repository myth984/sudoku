<template>
  <div style="margin-top: 20px">
    <button
      @click="click(i)"
      :class="
        $root.curIndex === i.label
          ? 'btn-handle btn-handle-active'
          : 'btn-handle'
      "
      v-for="(i, index) of buttons"
      :key="index"
      v-on:keyup="keyUp($event)"
    >
      {{ i.label }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["table"],
  data() {
    return {
      buttons: [
        { label: "1" },
        { label: "2" },
        { label: "3" },
        { label: "4" },
        { label: "5" },
        { label: "6" },
        { label: "7" },
        { label: "8" },
        { label: "9" },
        { label: "×" },
      ],
    };
  },
  methods: {
    click(i) {
      // 更换指针
      this.$root.curIndex = i.label;
      // 同类变色
      this.table
        .getCells()
        .filter((cell) => {
          cell.hint = false;
          return cell.value === i.label;
        })
        .forEach((cell) => {
          cell.hint = true;
        });
    },
    keyUp(ev) {
      console.log(ev);
    },
  },
  mounted() {
    document.onkeydown = (e) => {
      //事件对象兼容
      let ev =
        e || event || window.event || arguments.callee.caller.arguments[0];
      let i = "1";
      console.log(ev.keyCode);
      switch (ev.keyCode) {
        case 48:
          i = "×";
          break;
        case 49:
          i = "1";
          break;
        case 50:
          i = "2";
          break;
        case 51:
          i = "3";
          break;
        case 52:
          i = "4";
          break;
        case 53:
          i = "5";
          break;
        case 54:
          i = "6";
          break;
        case 55:
          i = "7";
          break;
        case 56:
          i = "8";
          break;
        case 57:
          i = "9";
          break;
      }
      this.click({ label: i });
    };
  },
};
</script>

<style scoped>
.btn-handle {
  margin: 5px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
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
  padding: 12px 20px;
  font-size: 20px;
  border-radius: 0px;
  font-family: dingmou, Avenir, Helvetica, Arial, sans-serif;
}
.btn-handle:active {
  border-color: #d3b472;
  color: #f4f4f1;
}
.btn-handle:hover {
  background: #000;
  border-color: #000;
  color: #fff;
}
.btn-handle-active {
  background: #000;
  border-color: #000;
  color: #fff;
}
</style>