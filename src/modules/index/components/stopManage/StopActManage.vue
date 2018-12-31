<template>
    <div class="base-data">
      <el-tabs v-model="activeName">
          <el-tab-pane name="activeQuery" label="活动查询">

          </el-tab-pane>
          <el-tab-pane name="planReview" label="计划审核">

          </el-tab-pane>
        <el-tab-pane name="activityReview" label="活动审核">

        </el-tab-pane>
        <el-tab-pane name="statistics" label="活动统计">

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
