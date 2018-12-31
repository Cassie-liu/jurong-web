<template>
  <div class="header">
    <img src="../../../static/img/header/banner.png" alt="">
    <span class="title" v-if="showNavigation"></span>
    <navigation v-if="showNavigation"></navigation>
  </div>
</template>


<script>
  import Navigation from 'common/components/Navigation';
  export default {
    name: 'tf-header',
    components: {
      Navigation
    },
    data () {
      return {
        showNavigation: false   // 是否显示顶部导航菜单，默认隐藏
      };
    }
  };
</script>
