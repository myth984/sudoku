<template>
  <span @click="fillGap($event)" :style="cellStyle" class="cell">
    <span :style="valueStyle">{{ cell.value }} </span>
  </span>
</template>

<script>
export default {
  props: ["cell"],
  methods: {
    fillGap(ev) {
      if (this.cell.allowFill === false) {
        return;
      }
      if (this.cell.needFill === false) {
        return;
      }
      this.$parent.$parent.$parent.$emit("startGame");
      if (this.$root.curIndex === "×") {
        this.cell.value = undefined;
      } else {
        this.cell.value = this.$root.curIndex;
      }
      // 验证是否可以填空
      let verify = this.cell.table.verify(this.cell);
      if (verify) {
        // 验证通过
        // 验证是否通关
        if (this.cell.table.verifyPass()) {
          window.clearInterval(this.$parent.$parent.$parent.timeId);
          alert("恭喜你通关了");
        }
      } else {
        // 有相同数据 验证不通过 禁止0.5秒
        this.cell.value = undefined;
        let tmpBackground = ev.target.style.background;
        ev.target.style.background = "#eb2d2d46";
        this.cell.allowFill = false;
        setTimeout(() => {
          ev.target.style.background = tmpBackground;
          this.cell.allowFill = true;
        }, 500);
      }
    },
  },
  computed: {
    valueStyle() {
      if (this.cell.needFill) {
        return {
          color: "green",
          "font-size": "35px",
        };
      } else {
        return {
          "font-size": "25px",
        };
      }
    },
    cellStyle() {
      if (this.cell.hint) {
        return {
          background: "#0000004f",
          color: "#fff",
          // "box-sizing": "border-box",
          // border: "5px solid #000",
        };
      } else {
        return {};
      }
    },
  },
  mounted() {
    if (this.cell.value === this.$root.curIndex) {
      this.cell.hint = true;
    }
  },
};
</script>

<style scoped>
.cell {
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  display: grid;
  justify-items: center;
  align-items: center;
}
.cell:hover {
  background-color: #0000004f;
}
.user-fill {
  color: green;
  font-size: 25px;
}
</style>