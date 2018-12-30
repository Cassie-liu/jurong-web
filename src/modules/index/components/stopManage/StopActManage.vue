<template>
    <div class="base-data">
      <el-tabs v-model="activeName">
          <el-tab-pane name="activeQuery">

          </el-tab-pane>
          <el-tab-pane name="planReview">

          </el-tab-pane>
        <el-tab-pane name="activityReview">

        </el-tab-pane>
        <el-tab-pane name="statistics">

        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
    export default {
        name: 'StopActManage',
        props: [],
        data () {
          return {
            activeName: 'activeQuery'
          };
        },
        mounted () {

        },
        comments: {},
        methods: {}
    };
</script>

<style scoped>

</style>
