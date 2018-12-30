<template>
  <ul class="side-menu">
    <li v-for="menu in menus" :class="{'active': menu === currentMenu}" @click="changeMenu(menu)">
      <div class="title">
        <span>{{menu.title}}</span>
        <i :class="{'icon-angle-right': menu !== currentMenu, 'icon-angle-down': menu === currentMenu}" v-show="menu.children"></i>
      </div>
      <ul class="sub-menus" :style="{'height': menu === currentMenu ? 'initial' : 0}">
        <li v-for="subMenu in menu.children"
            v-if="userfactory.checkUserPermission(subMenu.requiredPermissions)"
            :class="{'active': subMenu === currentSubMenu}"
            @click="changeSubMenu(subMenu)">{{subMenu.title}}</li>
      </ul>
    </li>
  </ul>
</template>

<script>
  import menus from 'common/constants/menus';
  import userfactory from 'common/factories/userFactory';
  export default {
    name: 'sideMenu',

    data () {
      return {
        menus,
        currentMenu: {},
        currentSubMenu: {},
        userfactory
      };
    },

    mounted () {
      this.init();
    },

    methods: {
      init () {
        // 菜单active状态，只对index模块生效
        if (location.pathname === '/') {
          this.currentUrl = menus && menus.length && menus[0].url;
        }
        for (let i in this.menus) {
          if (this.$route.path.indexOf(this.menus[i].url) > -1) {
            this.currentMenu = this.menus[i];
            if (this.menus[i] && this.menus[i].children) {
              for (let j in this.menus[i].children) {
                if (this.$route.path.indexOf(this.menus[i].children[j].url) > -1) {
                  this.currentSubMenu = this.menus[i].children[j];
                }
              }
            }
          }
        }
      },
      /**
       * 切换一级菜单
       */
      changeMenu (menu) {
        if (this.currentMenu === menu) {
          // this.currentMenu = null;
        } else {
          this.currentMenu = menu;
          // 没有子菜单，直接跳转
          if (!menu.children || menu.children.length === 0) {
            location.replace(location.protocol + '//' + location.host + '/#/' + this.currentMenu.url);
          }
        }
      },
      /**
       * 点击菜单跳转
       */
      changeSubMenu (subMenu) {
        this.currentSubMenu = subMenu;
        location.replace(location.protocol + '//' + location.host + '/#/' + this.currentMenu.url + '/' + subMenu.url);
        event.stopPropagation();  // 阻止事件传播，避免第二次点击子菜单会关闭一级菜单
      }
    }
  };
</script>
