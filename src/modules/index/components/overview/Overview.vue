<template>
  <div class="overview">
    <el-tabs v-model="activeName">
      <el-tab-pane label="概况" name="survey">
        <div>
          <common-graphic :data="graphic"></common-graphic>
        </div>
      </el-tab-pane>
      <el-tab-pane label="领导机构" name="organization"></el-tab-pane>
      <el-tab-pane label="办公室概况" name="office"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import CommonTable from '../common/CommonTable';
  import CommonGraphic from '../common/CommonGraphic';

  export default {
    name: 'Overview',
    components: {
      CommonGraphic
    },
    props: [],
    data () {
      return {
        graphic: {
          img: [
            {path: '/static/img/test.jpeg',pathB: '/static/img/test.jpeg'},
            {path: '/static/img/test.jpeg',pathB: '2b'},
            {path: '/static/img/test.jpeg',pathB: '3b'},
            {path: '/static/img/test.jpeg',pathB: '4b'}
          ],
          text: 'asdasd'
        },
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
          //this.switchTab();
        }
      }
    }
  };
</script>

<style scoped>
  .overview {}
</style>
