<template>
  <div>
      <div>
    <div @click="show3 = !show3">Click Me</div>

    <div style="margin-top: 20px; height: 200px;">
      <el-collapse-transition>
        <div v-show="show3">
          <div class="transition-box">el-collapse-transition</div>
          <div class="transition-box">el-collapse-transition</div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show3: true
    }
  }
}
</script>

<style>
  .transition-box {
    color: #fff;
  }
</style>