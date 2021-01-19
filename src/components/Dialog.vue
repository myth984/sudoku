<template>
  <el-dialog
    title="请问"
    :visible.sync="dialogVisible"
    width="300px"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="custom-dialog"
  >
    <slot></slot>
    <span slot="footer" class="dialog-footer"> </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true,
    };
  },
};
</script>

<style >
.custom-dialog {
  border: 3px solid #000;
  border-radius: 0px;
  background: #fff;
  box-shadow:unset;
}
</style>