module.exports = [
  // 概览
  {
    url: 'practice-management/overview',
    title: '实践中心概况',
    icon: 'icon-menu-1.png',
    iconHover: 'icon-menu-1-hover.png',
    requirePermissions: []
  },
  {
    url: 'center-management',
    title: '分中心管理',
    icon: 'icon-menu-2.png',
    iconHover: 'icon-menu-2-hover.png',
    requirePermissions: [],
    children: [
      {
        title: '分中心概况',
        url: 'center-overview',
        requiredPermissions: []
      },
      // {
      //   title: '分中心建设',
      //   url: 'center-build',
      //   requiredPermissions: []
      // },
      {
        title: '分中心活动管理',
        url: 'activity-management',
        requiredPermissions: []
      },
      {
        title: '发布公告',
        url: 'publish-announce',
        requiredPermissions: []
      }
    ]
  },
  // 镇所管理
  {
    url: 'stop-management',
    title: '镇所管理',
    icon: 'icon-menu-3.png',
    iconHover: 'icon-menu-3-hover.png',
    requirePermissions: [],
    children: [
      {
        title: '镇所概况',
        url: 'base-data',
        requiredPermissions: []
      },
      {
        title: '功能室建设',
        url: 'features-build',
        requiredPermissions: []
      },
      {
        title: '镇所活动管理',
        url: 'activity-manage',
        requiredPermissions: []
      }
    ]
  },
  // 村站管理
  {
    url: 'village-management',
    title: '村站管理',
    icon: 'icon-menu-4.png',
    iconHover: 'icon-menu-4-hover.png',
    requirePermissions: [],
    children: [
      {
        title: '村站概况',
        url: 'base-data',
        requiredPermissions: []
      },
      {
        title: '村站活动管理',
        url: 'activity-management',
        requiredPermissions: []
      }
    ]
  },
  // 志愿服务队
  {
    url: 'volunteer-service',
    title: '志愿服务队',
    icon: 'icon-menu-5.png',
    iconHover: 'icon-menu-5-hover.png',
    requirePermissions: [],
    children: [
      {
        title: '志愿服务队概况',
        url: 'base-info',
        requiredPermissions: []
      },
      {
        title: '服务队伍',
        url: 'service-team',
        requiredPermissions: []
      }
    ]
  },
  // 志愿者名单
  {
    url: 'volunteer-service/list',
    title: '志愿者名单',
    icon: 'button_zhiyuanzhemingdan_n.png',
    iconHover: 'button_zhiyuanzhemingdan_h.png',
    requirePermissions: []
  },
  // 志愿者招募
  {
    url: 'volunteer-service/recruit',
    title: '志愿者招募',
    icon: 'icon-menu-5.png',
    iconHover: 'icon-menu-5-hover.png',
    requirePermissions: []
  },
  {
    url: 'special-events',
    title: '特色活动',
    icon: 'button_zhaomu_n.png',
    iconHover: 'button_zhaomu_h.png',
    requirePermissions: []
  },
  {
    url: 'civilized-practice',
    title: '文明实践点',
    icon: 'menu_civilized-practice.png',
    iconHover: 'menuH_civilized-practice.png',
    requirePermissions: []
  },
  {
    url: 'announcement',
    title: '通知公告',
    icon: 'icon-menu-6.png',
    iconHover: 'icon-menu-6-hover.png',
    requirePermissions: []
    // children: [
    //   {
    //     title: '通知公告',
    //     url: '',
    //     requiredPermissions: []
    //   }
    // ]
  },
  {
    url: 'system-config',
    title: '系统配置',
    icon: 'icon-menu-7.png',
    iconHover: 'icon-menu-7-hover.png',
    requirePermissions: []
  },
  {
    url: 'system-operation',
    title: '系统运维',
    icon: 'icon-menu-8.png',
    iconHover: 'icon-menu-8-hover.png',
    requirePermissions: [],
    children: [
      {
        title: '菜单配置',
        url: 'system-menu',
        icon: 'icon-menu-9.png',
        iconHover: 'icon-menu-9-hover.png',
        requiredPermissions: []
      },
      {
        title: '账号角色管理',
        url: 'system-account',
        icon: 'icon-menu-9.png',
        iconHover: 'icon-menu-9-hover.png',
        requiredPermissions: []
      },
    ]
  }
];
