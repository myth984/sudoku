<template>
  <div :style="boxStyle">
    <Cell v-for="(cell, index) in box.getCells()" :key="index" :cell="cell"></Cell>
  </div>
</template>

<script>
import Cell from "./Cell";
export default {
  props: ["box"],
  components: {
    Cell,
  },
  computed: {
    boxStyle() {
      return {
        display: "grid",
        "grid-template-columns": "repeat(3, 50px)",
        "grid-template-rows": "repeat(3, 50px)",
        // "grid-gap": "1px 1px",
        border:"2px solid #000"
      };
    },
  },
};
</script>

<style>
</style>