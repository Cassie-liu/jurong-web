<template>
    <div class="common-crud">
        <el-button class="btn-right" @click="dialogVisible = true;form = {}">新增</el-button>
        <el-table :data="tableData" v-loading="loading" size="small">
            <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
                             :width="item.width || ''"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                    <slot></slot>
                    <el-button type="text" @click="deleteRow(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="text-align: right;margin-top: 20px;"
                       :total="pageable.total" :current-page.sync="pageable.currentPage" :page-size.sync="pageable.pageSize"
                       @current-change="loadTableData" @size-change="loadTableData" layout="total, sizes, prev, pager, next">
        </el-pagination>
        <el-dialog
            title="新增"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" label-width="100px">
                <el-form-item v-for="item in formColumns" :key="item.label" :label="item.label">
                    <el-input v-model="form[item.key]" v-if="item.type === 'text'"></el-input>
                    <el-select v-model="form[item.key]" v-else-if="item.type === 'select'">
                        <el-option v-for="opItem in item.options" :value="opItem.value" :label="opItem.label" :key="opItem.value"></el-option>
                    </el-select>
                    <!--预留富文本编辑-->
                    <el-upload
                        v-else-if="item.type === 'img'"
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import reqType from '@/api/reqType';
    export default {
        name: 'CommonCRUD',
        props: {
            // 表格字段显示配置
            columns: Array,
            // 请求根路径，对应后台Controller @RequestMapping注解的值
            apiRoot: String,
            // 表单字段
            formColumns: Array
        },
        data () {
            return {
                // 表格数据
                tableData: [],
                // 加载样式
                loading: false,
                pageable: {
                    total: 0,
                    currentPage: 1,
                    pageSize: 10
                },
                dialogVisible: false,
                form: {},
                imgUrl: ''
            };
        },
        methods: {
            // 获取表格数据
            loadTableData () {
                this.loading = true;
                this.$http(reqType.POST, `${this.apiRoot}/page?page=${this.pageable.currentPage - 1}&size=${this.pageable.pageSize}`, false).then(
                    data => {
                        this.tableData = data.content;
                        this.pageable.total = data.totalElements;
                        this.loading = false;
                    }
                ).catch(res => {
                  this.loading = false;
                });
            },
            edit (row) {
                this.form = Object.assign({}, row);
                this.dialogVisible = true;
            },
            deleteRow (id) {
                this.$confirm('确认删除？')
                    .then(_ => {
                        this.$http(reqType.DELETE, `${this.apiRoot}/${id}`).then(_ => {
                            this.loadTableData();
                        });
                    })
                    .catch(_ => {});
            },
            submit () {
                let type = this.form.id ? reqType.PUT : reqType.POST;
                let path = `${this.apiRoot}/${this.form.id || ''}`;
                this.$http(type, path, Object.assign({}, this.form)).then(() => {
                    this.dialogVisible = false;
                    this.loadTableData();
                    this.from = {};
                });
            },
            handleClose (done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.from = {};
                        done();
                    })
                    .catch(_ => {});
            },
            handleAvatarSuccess (res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            }
        },
        created () {
            this.loadTableData();
        }
    };
</script>

<style>

</style>
