import Vue from 'vue';
import Router from 'vue-router';
import Main from '../components/Main';
import CenterBaseData from '../components/centerManage/CenterBaseData';
import CenterOverview from '../components/centerManage/CenterOverview';
import Overview from '../components/overview/Overview';
import CenterBuild from '../components/centerManage/CenterBuild';
import ActivityManagement from '../components/centerManage/ActivityManagement';
import CenterActivityManagement from '../components/centerManage/CenterActivityManagement';
import PublishAnnounce from '../components/centerManage/PublishAnnounce';
import StopBaseData from '../components/stopManage/StopBaseData';
import FeatureBuild from '../components/stopManage/FeatureBuild';
import StopActManage from '../components/stopManage/StopActManage';
import VillageBaseData from '../components/villageManage/VillageBaseData';
import VillageActManage from '../components/villageManage/VillageActManage';
import Volunteerlist from '../components/VolunteerService/Volunteerlist';
import VolunteerrRecruit from '../components/VolunteerService/VolunteerrRecruit';
import VolunteerBaseInfo from '../components/VolunteerService/VolunteerBaseInfo';
import VolunteerServiceTeam from '../components/VolunteerService/VolunteerServiceTeam';
import Announce from '../components/Announce';
import SpecialEvents from '../components/specialEvents/specialEvents';
import CivilizedPractice from '../components/civilizedPractice/civilizedPractice';
import Details from '../components/civilizedPractice/details';
import SystemConfig from '../components/SystemConfig';
import SystemOperation from '../components/system/SystemOperation';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QueryMain',
      component: Main,
      redirect: '/practice-management/overview', // 默认跳转到实践中心概览
      children: [
        {
          path: 'practice-management/overview',     // 实践中心概览
          name: 'Overview',
          component: Overview
        },
        {
          path: 'center-management/center-overview',     // 分中心概况
          name: 'CenterOverview',
          component: CenterOverview
        },
        {
          path: 'center-management/activity-management',     // 分中心活动管理
          // name: 'ActivityManagement',
          name: 'CenterActivityManagement',
          // component: ActivityManagement,
          component: CenterActivityManagement
        },
        {
          path: 'center-management/publish-announce',     // 发布公告
          name: 'PublishAnnounce',
          component: PublishAnnounce
        },
        {
          path: 'stop-management/base-data',     // 镇所基础数据
          name: 'StopBaseData',
          component: StopBaseData
        },
        {
          path: 'stop-management/features-build',     // 功能室建设
          name: 'FeatureBuild',
          component: FeatureBuild
        },
        {
          path: 'stop-management/activity-manage',     // 镇所活动管理
          name: 'StopActManage',
          component: StopActManage
        },
        {
          path: 'village-management/base-data',     // 村站基础信息管理
          name: 'VillageBaseData',
          component: VillageBaseData
        },
        {
          path: 'village-management/activity-management',     // 村站活动管理
          name: 'VillageActManage',
          component: VillageActManage
        },
        {
          path: 'volunteer-service/base-info',     // 文明实践志愿服务队  基础信息
          name: 'VolunteerBaseInfo',
          component: VolunteerBaseInfo
        },
        {
          path: 'volunteer-service/service-team',     // 文明实践志愿服务队  基础信息
          name: 'VolunteerServiceTeam',
          component: VolunteerServiceTeam
        },
        {
          path: 'volunteer-service/list',     // 志愿者名单
          name: 'Volunteerlist',
          component: Volunteerlist
        },
        {
          path: 'volunteer-service/recruit',     // 志愿者招募
          name: 'VolunteerrRecruit',
          component: VolunteerrRecruit
        },
        {
          path: 'special-events',     // 特色活动
          name: 'SpecialEvents',
          component: SpecialEvents
        },
        {
          path: 'civilized-practice',     // 文明实践点
          name: 'CivilizedPractice',
          component: CivilizedPractice
        },
        {
          path: 'details',     // 文明实践点
          name: 'Details',
          component: Details
        },
        {
          path: 'announcement',     // 通知公告
          name: 'Announce',
          component: Announce
        },
        {
          path: 'system-config',     // 系统配置
          name: 'SystemConfig.',
          component: SystemConfig
        },
        {
          path: 'system-operation',     // 系统运维
          name: 'SystemOperation',
          component: SystemOperation
        },
        {
            path: 'system-operation/system-menu',
            name: 'SystemMenu',
            component: () => import('../components/system/MenuConfig')
        },
        {
          path: 'system-operation/system-account',
          name: 'SystemAccount',
          component: SystemOperation
        }
      ]
    }
    // {
    //   path: '/',
    //   name: '',
    //   component: Main,
    //   redirect: '',
    //   children: []
    // }
  ]
});
