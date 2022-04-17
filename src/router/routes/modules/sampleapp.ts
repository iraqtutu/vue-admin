//本模块描述应用路由的样例，未来需要改为动态生成的应用路由
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
//import { t } from '/@/hooks/web/useI18n';

const sampleapp: AppRouteModule = {
  path: '/app',
  name: 'app',
  component: LAYOUT,
  redirect: '/app/index',
  meta: {
    hideChildrenInMenu: false,
    icon: 'icon-park-outline:application-one',
    title: '样例系统',
    orderNo: 12,
  },
  children: [
    {
      path: 'appconfig',
      name: 'appconfig',
      component: () => import('/@/views/app/appconfig/index.vue'),
      meta: {
        title: '应用设置',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'functions',
      name: 'functions',
      component: () => import('/@/views/app/functions/index.vue'),
      meta: {
        title: '功能配置',
        icon: 'fluent:tray-item-add-20-filled',
        hideMenu: false,
      },
    },
    {
      path: 'roles',
      name: 'roles',
      component: () => import('/@/views/app/roles/index.vue'),
      meta: {
        title: '角色配置',
        icon: 'carbon:block-storage-alt',
        hideMenu: false,
      },
    },
    {
      path: 'orgnize',
      name: 'orgnize',
      component: () => import('/@/views/app/orgnize/index.vue'),
      meta: {
        title: '组织机构维护',
        icon: 'gis:globe-users',
        hideMenu: false,
      },
    },
    {
      path: 'authrize',
      name: 'authrize',
      component: () => import('/@/views/app/authrize/index.vue'),
      meta: {
        title: '用户授权',
        icon: 'carbon:certificate-check',
        hideMenu: false,
      },
    },
  ],
};

export default sampleapp;
