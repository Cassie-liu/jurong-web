<template>
  <ul class="side-menu" style="height: calc(100% - 60px);">
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

<style lang="less">
  .side-menu {
    width: 14%;
    position: fixed;
    top: 100px;
    /*background: #333;*/
    background: #EFF1F0;
    margin: 0;
    overflow-y: auto;
    /*滚动条样式*/
    &::-webkit-scrollbar {
      width: 17px;
      height: 17px;
      background-color: transparent;
      border-radius: 9px;
    }
    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      background-color: #FDFDFD;
      border-radius: 9px;
      background-clip: content-box;
      border: 5px solid transparent;
    }
    >li {
      /*background: #333333;*/
      background: #FDFDFD;
      color: #A7A7A7;
      cursor: pointer;
      position: relative;
      /*border-bottom: solid 1px #263844;*/
      &.active {
        border-left: 3px solid #F08643;
        .title {
          background: #F1F3F1;
          color: #F08643;
          span {
            /*color: #0FB9EF;*/
          }
        }
      }
      .title {
        font-size: 16px;
        font-weight: 600;
        padding: 20px 20px;
        &:hover {
          background: #F1F3F1;
        }
        img {
          margin: -5px 10px 0 0;
        }
        i {
          float: right;
          margin-right: -5px;
        }
      }
      .sub-menus {
        padding: 0;
        overflow: hidden;
        /*height: 0;*/
        transition: height 300ms;
        li {
          padding: 10px 0 10px 40px;
          position: relative;
          background: #F1F3F1;
          /*background: #283946;*/
          /*border-bottom: solid 1px #F08643;*/

          &:last-child {
            border-bottom: none;
          }
          &:hover {
            color: #F08643;
          }
          &:before {
            content: '';
            background-color: #A7A7A7;
            width: 3px;
            height: 3px;
            border-radius: 10px;
            margin-right: 10px;
            display: inline-block;
            vertical-align: middle;
          }
          &.active {
            color: #F08643;
            &:before {
              background: #A7A7A7;
            }
          }
        }
      }
    }
  }
</style>
