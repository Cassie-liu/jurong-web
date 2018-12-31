<template>
    <div>
      <el-dialog title="审核" :visible.sync="activityDialogVisible">

        <div slot="footer" class="dialog-footer">
          <el-button @click="activityDialogVisible = false">取 消</el-button>
          <el-button type="primary">审核</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'showCenterDetail',
        props: {
          activityDialogVisible: Boolean
        }
    };
</script>

<style scoped>

</style>
