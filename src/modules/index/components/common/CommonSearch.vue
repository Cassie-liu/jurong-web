<template>
  <div class="common-search">
    <el-form :inline="inline" :model="form" ref="form" :label-position="'right'">
      <el-form-item v-for="item in columns" :key="item.label" :label="item.label" label-width="120px" style="margin-right:10px;">
        <el-col :span="inline? 24: 6">
          <el-input v-model="form[item.key]" v-if="item.type === 'text'"></el-input>
          <el-select v-model="form[item.key]" v-else-if="item.type === 'select'" :class="inline? '': 'label-width'">
            <el-option v-for="opItem in item.options" :value="opItem.value" :label="opItem.label" :key="opItem.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-form-item>
          <el-col v-if="!inline">
            <el-button @click="search" class="text-left" type="primary">{{title}}</el-button>
          </el-col>
          <el-button v-if="inline" @click="search" class="fr" type="primary">{{title}}</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
      name: 'CommonSearch',
      props: {
        columns: Array,
        title: String,      // btn文字
        inline: Boolean     // 控制是否在同一行显示
      },
      data () {
        return {
          form: {},
          root: '', // 请求路径
          formData: []    // 请求回来的数据
        };
      },
      mounted () {},
      methods: {
        search () {
          // 调接口
          // this.$http(reqType.POST, `${this.apiRoot}/page?page=${this.pageable.currentPage - 1}&size=${this.pageable.pageSize}`, false)
          //   .then(data => {
          //      this.formData = data;
          //     }
          //   ).catch(error => {
          // });
          this.formData = [
            {
              publishIssued: '11111',
              culturalCategory: '11111',
              activityName: '11111',
              executionStation: '11111',
              executionVillageStation: '11111',
              practicePoint: '11111',
              targetScore: '11111',
              actualScore: '11111',
              deadline: '11111',
              completeTime: '11111',
              approvalStatus: '11111',
              approvalResult: '11111'
            }
          ];
          this.$emit('search', this.formData);
        }
      }
    };
</script>

<style lang="less">
.common-search{
  .el-form-item__label::after{
    content: ':';
    margin-left: 3px;
  }
}
</style>
