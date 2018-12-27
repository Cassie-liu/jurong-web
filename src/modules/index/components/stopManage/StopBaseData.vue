<template>
    <div class="base-data">
        <CommonCRUD v-if="!showDetail" :columns="columns" api-root="center" :form-columns="formColumns">
            <el-button type="text" @click="showDetail = true">内容录入</el-button>
        </CommonCRUD>

        <!--镇所内容录入-->
        <el-tabs v-if="showDetail" v-model="activeName">
            <el-tab-pane label="人员管理" name="person">
                <CommonCRUD v-if="activeName === 'person'" :columns="personColumns" api-root="townUser" :form-columns="personFormColumns"></CommonCRUD>
            </el-tab-pane>
            <el-tab-pane label="组织架构" name="org">
                <CommonCRUD v-if="activeName === 'org'"  :columns="columns" api-root="center" :form-columns="formColumns"></CommonCRUD>
            </el-tab-pane>
            <el-tab-pane label="功能室建设" name="power">
                <CommonCRUD v-if="activeName === 'power'"  :columns="columns" api-root="center" :form-columns="formColumns"></CommonCRUD>
            </el-tab-pane>
            <el-tab-pane label="文明实践点" name="point">
                <CommonCRUD v-if="activeName === 'point'"  :columns="columns" api-root="center" :form-columns="formColumns"></CommonCRUD>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import CommonCRUD from '../common/CommonCRUD';
    export default {
        name: 'StopBaseData',
        props: [],
        data () {
            return {
                activeName: 'person',
                showDetail: false,
                // 表格字段显示配置
                columns: [
                    {
                        prop: 'coding',
                        label: '编码'
                    },
                    {
                        prop: 'name',
                        label: '镇所名称'
                    },
                    {
                        prop: 'longitude',
                        label: '经度'
                    },
                    {
                        prop: 'latitude',
                        label: '纬度'
                    },
                    {
                        prop: 'remark',
                        label: '备注'
                    }
                ],
                // 表单字段
                formColumns: [
                    {
                        type: 'text',
                        key: 'coding',
                        label: '编码'
                    }, {
                        type: 'text',
                        key: 'name',
                        label: '镇所名称'
                    }, {
                        type: 'text',
                        key: 'longitude',
                        label: '经度'
                    }, {
                        type: 'text',
                        key: 'latitude',
                        label: '纬度'
                    }, {
                        type: 'text',
                        key: 'remark',
                        label: '备注'
                    }],
                // 人员表格字段显示配置
                personColumns: [
                    {
                        prop: 'jobNumber',
                        label: '工号'
                    },
                    {
                        prop: 'name',
                        label: '姓名'
                    },
                    {
                        prop: 'gender',
                        label: '性别'
                    },
                    {
                        prop: 'position',
                        label: '职位'
                    },
                    {
                        prop: 'remark',
                        label: '备注'
                    }
                ],
                personFormColumns: [
                    {
                        type: 'text',
                        key: 'coding',
                        label: '编码'
                    }, {
                        type: 'text',
                        key: 'name',
                        label: '镇所名称'
                    }, {
                        type: 'text',
                        key: 'longitude',
                        label: '经度'
                    }, {
                        type: 'text',
                        key: 'latitude',
                        label: '纬度'
                    }, {
                        type: 'text',
                        key: 'remark',
                        label: '备注'
                    }
                ]
            };
        },
        methods: {
            handleClick (tab, event) {
                console.log(tab, event);
            }
        },
        components: {
            CommonCRUD
        }
    };
</script>

<style scoped>

</style>
