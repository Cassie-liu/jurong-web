<template>
  <transition name="modal">
    <div class="modal-mask add-office">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
                添加
              <span class="fr close" @click="$emit('close')">x</span>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="item-wrap">
                <label>办公室编码</label>
                <input type="text" v-model="data.code">
              </div>
              <div class="item-wrap">
                <label>办公室名称</label>
                <input type="text" v-model="data.officeName">
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-primary" @click="save">保存</button>
              <button class="btn btn-default" @click="$emit('close', false)">取消</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
        name: 'AddOffice',
        props: [],
        data () {
          return {
            data: {
              code: '',
              officeName: ''
            }      // 添加办公室所需的参数
          };
        },
        mounted () {},
        components: {},
        methods: {
          save () {
            this.$emit('close', true);
          }
        }
    };
</script>

<style scoped lang="less">
.add-office{
  .modal-container{
    width:400px;
    .modal-body{
      .item-wrap{
        margin-bottom: 10px;
        label{
          display: inline-block;
          width: 100px;
        }
        input[type="text"] {
          width: 200px;
        }
      }
    }
  }
}
</style>
