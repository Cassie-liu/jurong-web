<template>
    <div class="base-data">
      <CommonCRUD :columns="columns"  api-root="center" :form-columns="formColumns"></CommonCRUD>
    </div>
</template>

<script>
  import CommonCRUD from '../common/CommonCRUD';
    export default {
        name: 'CenterBuild',
        props: [],
        data () {
          return {
            columns: [
              {
                type: 'index',
                label: '序号'
              },
              {
                props: 'code',
                label: '编码'
              },
              {
                props: 'publishTime',
                label: '发布时间'
              },
              {
                props: 'publishUnit',
                label: '发布单位'
              },
              {
                props: 'culturalCategory',
                label: '文化类别'
              },
              {
                props: 'introduction',
                label: '内容简介'
              }
            ],
            formColumns: [
              {
                type: 'text',
                key: 'code',
                label: '编码'
              },
              {
                type: 'select',
                key: 'culturalCategory',
                label: '文化类别',
                options: [
                  {
                    value: 'value1',
                    label: '健康'
                  },
                  {
                    value: 'value2',
                    label: '健康2'
                  }
                ]
              },
              {
                type: 'text',
                key: 'introduction',
                label: '内容简介'
              }
            ]
          };
        },
        mounted () {

        },
        components: {
          CommonCRUD
        },
        methods: {}
    };
</script>

<style scoped>

</style>
