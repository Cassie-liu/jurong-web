<template>
    <div class="base-data">
      <el-tabs v-model="activeName">
        <el-tab-pane label="活动发布" name="publish">
          活动发布
        </el-tab-pane>
        <el-tab-pane label="固选活动审核" name="stable">
          固选活动审核
        </el-tab-pane>
        <el-tab-pane label="自选活动审核" name="optional">
          自选活动审核
        </el-tab-pane>
        <el-tab-pane label="活动统计" name="statistics">
          活动统计
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
    export default {
        name: 'ActivityManagement',
        props: [],
        data () {
          return {
            activeName: 'publish'
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
