<template>
  <div class="main">
    <div class="main-box">
      <side-menu></side-menu>

      <div class="main-content">
        <breadcrumbs></breadcrumbs>
        <div class="wrap">
          <router-view></router-view>
        </div>
      </div>
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

