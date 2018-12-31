<template>
  <div class="stop-base">
    <div class="base-data">
      <div v-show="!showManagement" class="content" v-for="(item, index) in img" :key="index">
        <img :src="item.path" class="img-fluid" @click="getDetailManagement(item.id)">
        <div class="text-center mt-15">{{item.name}}</div>
      </div>
      <div v-show="showManagement" class="content-wrap">
        <common-graphic :data="graphic"></common-graphic>
      </div>
    </div>
  </div>
</template>

<script>
  import CommonGraphic from '../common/CommonGraphic';
  export default {
    name: 'StopBaseData',
    props: [],
    data () {
      return {
        img: [
          {id: 1, path: '/static/img/town/img_chongmingjiedao.png', name: '崇明街道'},
          {id: 2, path: '/static/img/town/img_huayangjiedao.png', name: '华阳街道'},
          {id: 3, path: '/static/img/town/img_huangmeiqiao.png', name: '黄梅街道'},
          {id: 4, path: '/static/img/town/img_xiashuzhen.png', name: '下蜀镇'},
          {id: 5, path: '/static/img/town/img_baituzhen.png', name: '白兔镇'},
          {id: 6, path: '/static/img/town/img_maoshanzheng.png', name: '茅山镇'},
          {id: 7, path: '/static/img/town/img_houbaizhen.png', name: '后白镇'},
          {id: 8, path: '/static/img/town/img_guozhuangzhen.png', name: '郭庄镇'},
          {id: 9, path: '/static/img/town/img_tianwangzhen.png', name: '天王镇'},
          {id: 10, path: '/static/img/town/img_baohuazheng.png', name: '宝华镇'},
          {id: 11, path: '/static/img/town/img_bianchengzhen.png', name: '边城镇'},
          {id: 12, path: '/static/img/town/img_kaifaqu.png', name: '开发区'}
        ],
        showManagement: false,
        graphic: {
          img: [
            {path: '/static/img/test.jpeg', pathB: '/static/img/test.jpeg'},
            {path: '/static/img/test.jpeg', pathB: '2b'},
            {path: '/static/img/test.jpeg', pathB: '3b'},
            {path: '/static/img/test.jpeg', pathB: '4b'}
          ],
          text: 'asdasd'
        }, // 村站详情
      };
    },
    methods: {
      /**
       * 获取所站概况
       */
      getDetailManagement (id) {
        this.showManagement = true;
      }
    },
    mounted () {
    },
    components: {
      CommonGraphic
    }
    };
</script>

<style scoped lang="less">
  .stop-base {
    padding: 15px 15px 15px;
    .base-data{
      display: flex;
      width: 100%;
      overflow: hidden;
      flex-wrap: wrap;
      .content {
        padding: 0 1% 20px 0;
        width:15%;
        img {
          cursor: pointer;
          width:100%;
        }
      }
      .content-wrap {
        .wrap {
          text-align: right;
          &>div{
            display: inline-flex;
            flex-direction: column;
          }
          img {
            width: 40px;
            height: 40px;
          }
        }
        width:100%;
      }
      .chart-wrap {
        width:100%;
        height:300px;
      }
    }
  }
</style>
