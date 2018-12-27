<template>
  <div class="main">
    <side-menu></side-menu>
    <breadcrumbs></breadcrumbs>
    <div class="wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Breadcrumbs from 'common/components/Breadcrumbs';
  import SideMenu from 'common/components/SideMenu';

  export default {
    name: 'tf-main',

    data () {
      return {

      };
    },

    components: {
      Breadcrumbs,
      SideMenu
    }
  };
</script>

<style lang="less" scoped>
  .main {
    margin-top:20px;
    .wrap {
      padding: 70px 20px 20px 280px;
      &>div {
        background: #fff;
        padding: 20px;
      }
    }
  }
</style>
