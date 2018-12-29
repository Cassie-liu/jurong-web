<template>
    <CommonCRUD :columns="columns" api-root="menu" :form-columns="formColumns">
    </CommonCRUD>
</template>

<script>
    import CommonCRUD from '../common/CommonCRUD';
    export default {
        name: 'MenuConfig',
        data () {
            return {
                columns: [
                    {
                        prop: 'name',
                        label: '菜单名称'
                    },
                    {
                        prop: 'url',
                        label: '菜单地址'
                    },
                    {
                        prop: 'parentId',
                        label: '父菜单id'
                    }
                ],
                formColumns: [
                    {
                        type: 'text',
                        key: 'name',
                        label: '菜单名称'
                    }, {
                        type: 'text',
                        key: 'url',
                        label: '菜单地址'
                    }, {
                        type: 'text',
                        key: 'parentId',
                        label: '父菜单id'
                    }
                ]
            }
        },
        components: {
            CommonCRUD
        }
    };
</script>

<style scoped>

</style>
