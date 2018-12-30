<template>
  <div class="index">
    <hd ref="header" class="header"></hd>

    <router-view></router-view>

    <ft></ft>
  </div>
</template>

<script>
  import Header from 'common/components/Header';
  import Footer from 'common/components/Footer';
  import interceptors from 'common/factories/interceptors';

  export default {
    name: 'index',

    data () {
      return {

      };
    },

    components: {
      hd: Header,
      ft: Footer
    },

    beforeMount () {
      interceptors.init();
    },

    mounted () {
      this.init();
    },

    methods: {
      /**
       * 初始化
       */
      init () {
        // 显示顶部导航菜单
        this.$refs.header.showNavigation = true;
        window.hideLoader();
      }
    }
  };
</script>

<style src="assets/less/font-icons/style.css"></style>
<style src="assets/less/style.less"></style>
<style src="assets/less/public.less"></style>

