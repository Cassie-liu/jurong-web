<template>
  <div class="overview">
    <el-tabs v-model="activeName">
      <el-tab-pane label="概况" name="survey"></el-tab-pane>
      <el-tab-pane label="领导机构" name="organization"></el-tab-pane>
      <el-tab-pane label="办公室概况" name="office"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'Overview',
    components: {
    },
    props: [],
    data () {
      return {
        activeName: 'survey' // 默认tab
      };
    },
    mounted () {
    },
    methods: {
    },
    watch: {
      activeName: {
        handler (oldVal, curVal) {
          console.log(oldVal);
          this.switchTab();
        }
      }
    }
  };
</script>

<style scoped>
  .overview {}
</style>
