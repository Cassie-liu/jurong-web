<template>
  <div class="base-data">
      <div v-show="!showManagement" class="content" v-for="(item, index) in img" :key="index">
        <img :src="item.path" class="img-fluid" @click="getDetailManagement(item.id)">
        <div class="text-center mt-15">{{item.name}}</div>
      </div>
      <div v-show="showManagement">
        <common-graphic :data="graphic"></common-graphic>
      </div>
    </div>
</template>

<script>
  import CommonGraphic from '../common/CommonGraphic';
  export default {
    name: 'VillageBaseData',
    props: [],
    data () {
      return {
        img: [
          {id: 1, path: '/static/img/bj.jpg', name: '村站1'},
          {id: 2, path: '/static/img/bj.jpg', name: '村站2'},
          {id: 3, path: '/static/img/bj.jpg', name: '村站3'},
          {id: 4, path: '/static/img/bj.jpg', name: '村站4'},
          {id: 5, path: '/static/img/bj.jpg', name: '村站5'},
          {id: 6, path: '/static/img/bj.jpg', name: '村站6'},
          {id: 7, path: '/static/img/bj.jpg', name: '村站7'},
          {id: 8, path: '/static/img/bj.jpeg', name: '村站8'},
          {id: 9, path: '/static/img/bj.jpg', name: '村站9'},
          {id: 10, path: '/static/img/bj.jpeg', name: '村站10'}
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
        } // 村站详情
      };
    },
    mounted () {
    },
    components: {
      CommonGraphic
    },
    methods: {
      /**
       * 获取所站概况
       */
      getDetailManagement (id) {
        this.showManagement = true;
      }
    },
    watch: {
    }
  };
</script>

<style scoped lang="less">
  .base-data{
    display: flex;
    width: 100%;
    overflow: hidden;
    flex-wrap: wrap;
    .content {
      padding: 15px 0 5px 15px;;
      width: 20%;
      img {
        cursor: pointer;
        width:100%;
      }
    }
  }
</style>
