<template>
  <div class="center-overview">
    <div class="base-data">
      <div class="content" v-for="(slide, index) in img" :key="index">
        <img :src="slide.path" class="img-fluid">
        <div class="text-center mt-15">{{slide.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CenterOverview',
    props: [],
    data () {
      return {
        img: [
          {id: 1, path: '/static/img/bj.jpg', name: '分中心1'},
          {id: 2, path: '/static/img/bj.jpg', name: '分中心2'},
          {id: 3, path: '/static/img/bj.jpg', name: '分中心3'},
          {id: 4, path: '/static/img/bj.jpg', name: '分中心4'},
          {id: 5, path: '/static/img/bj.jpg', name: '分中心5'}
        ]
      };
    },
    mounted () {
    },
    components: {
    },
    methods: {
    },
    watch: {
    }
  };
</script>

<style scoped lang="less">
  .center-overview {
    .base-data{
      display: flex;
      width: 100%;
      overflow: hidden;
      flex-wrap: wrap;
      .content {
        padding: 0 10px 40px 0;
        img {
          width:500px;
          height:400px;
        }
      }
    }
  }
</style>
