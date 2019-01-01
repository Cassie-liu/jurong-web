<template>
  <div class="stop-base">
    <div class="base-data">
      <div v-if="!showManagement" class="content" v-for="(item, index) in img" :key="index">
        <img :src="item.path" class="img-fluid" @click="getDetailManagement(item)">
        <div class="text-center mt-15">{{item.name}}</div>
      </div>
      <div v-if="showManagement" class="content-wrap">
        <common-graphic :data="graphic" type="town" :refresh="surveyRefresh"></common-graphic>
      </div>
    </div>
  </div>
</template>

<script>
  import CommonGraphic from '../common/CommonGraphic';
  import reqType from '@/api/reqType';
  export default {
    name: 'StopBaseData',
    props: [],
    data () {
      return {
        img: [],
        showManagement: false,
        surveyRefresh: false,
        graphic: {
          img: [],
          text: '镇所管理'
        }, // 村站详情
      };
    },
    methods: {
      /**
       * 获取所站概况
       */
      getDetailManagement (item) {
        this.graphic = item;
        this.graphic.img = item.jrResourceList.map( (item) => { return { url: `http://172.16.0.126${item.thumbnail}`}});
        this.graphic.imgB = item.jrResourceList.map( (item) => { return { url: `http://172.16.0.126${item.url}`}});
        this.showManagement = true;
      }
    },
    mounted () {
      this.$http(reqType.POST, `town/list`).then(
        data => {
          this.img = data
        }
      )
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
