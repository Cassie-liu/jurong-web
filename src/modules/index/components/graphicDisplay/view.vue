<template>
  <div class="gView">
    <el-row>
      <el-col :span="10">
        <div class="block">
          <span class="demonstration">默认 Hover 指示器触发</span>
          <el-carousel height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="14">
        <div>asxs</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "graphicView",
    props: {
      data: {
        type: Array;
        dafult: null;
      }
    }
  }
</script>

<style scoped lang="less">

</style>
