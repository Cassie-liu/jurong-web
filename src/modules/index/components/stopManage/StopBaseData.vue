<template>
    <div class="base-data">
        <CommonCRUD :columns="columns" api-root="center" :form-columns="formColumns"></CommonCRUD>
    </div>
</template>

<script>
    import CommonCRUD from '../common/CommonCRUD';
    export default {
        name: 'StopBaseData',
        props: [],
        data () {
            return {
                activeName: 'second',
                // 表格字段显示配置
                columns: [
                    {
                        prop: 'coding',
                        label: '编码'
                    },
                    {
                        prop: 'name',
                        label: '分中心名称'
                    },
                    {
                        prop: 'culturalType',
                        label: '文化类别'
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
                // 请求根路径，对应后台Controller @RequestMapping注解的值
                apiRoot: 'center',
                // 表单字段
                formColumns: [
                    {
                        type: 'text',
                        key: 'coding',
                        label: '编码'
                    }, {
                        type: 'text',
                        key: 'name',
                        label: '分中心'
                    }, {
                        type: 'text',
                        key: 'culturalType',
                        label: '文化类别'
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
                    }]
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
