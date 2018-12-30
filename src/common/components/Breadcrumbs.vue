<template>
  <div class="breadcrumbs">
    <img src="/static/img/icon-location.png">
    <span>当前位置：</span>
    <ul>
      <li v-for="(nav, index) in navigators" :class="{'icon-angle-right': index > 0}">
        <a :href="'#/' + nav.url">{{nav.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  import menus from 'common/constants/menus';
  import navigations from 'common/constants/navigations';

  const allMenus = menus.concat(navigations);

  export default {
    name: 'breadcrumbs',

    data () {
      return {
        paths: [],
        navigators: [],
        i: 0
      };
    },

    mounted () {
      this.paths = this.$route.path.substring(1).split('/');
      this._initBreadcrumbs(allMenus);
    },

    methods: {
      /**
       * 初始化面包屑导航栏
       */
      _initBreadcrumbs (menus) {
        for (var j = 0; j < menus.length; j++) {
          if (menus[j].url === this.paths[this.i]) {
            this.navigators.push({
              title: menus[j].title,
              url: this.i > 0 ? this.navigators[this.i - 1].url + '/' + menus[j].url : menus[j].url
            });
            if (++this.i < this.paths.length && menus[j].children) {
              this._initBreadcrumbs(menus[j].children);
            }
          }
        }
      }
    },

    watch: {
      '$route' (to, from) {
        this.i = 0;
        this.navigators.length = 0;
        this.paths = to.path.substring(1).split('/');
        this._initBreadcrumbs(allMenus);
        scrollTo(0, 0);     // 切换路由，滚动条滚动到顶端
      }
    }
  };
</script>
