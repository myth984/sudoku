<template>
  <div class="table" :style="tableStyle">
    <Box
      v-for="(box, index) of this.table.getBoxs()"
      :key="index"
      :box="box"
    ></Box>
  </div>
</template>

<script>
import Box from "./Box";

export default {
  props: ["table"],
  components: {
    Box,
  },
  data() {
    return {
      curIndex: "1",
    };
  },
  computed: {
    tableStyle() {
      return {
        cursor: 'url("/images/' + this.$root.curIndex + '.png") 1 1, auto',
      };
    },
  },
  mounted() {
    console.log();
  },
};
</script>

<style scoped>
.table {
  display: grid;
  margin-top: 30px;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(3, auto);
  justify-items: center;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  width: fit-content;
  /* cursor: url("~@/assets/images/1.png") 1 1, auto; */
}
</style>