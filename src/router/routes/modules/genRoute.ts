//本模块描述应用路由的样例，未来需要改为动态生成的应用路由
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
//import { t } from '/@/hooks/web/useI18n';

const autogen: AppRouteModule = {
  path: '/gen',
  name: 'gen',
  component: LAYOUT,
  redirect: '/app/gen',
  meta: {
    hideChildrenInMenu: false,
    icon: 'icon-park-outline:application-one',
    title: '自动生成模板',
    orderNo: 15,
  },
  children: [
    {
      path: 'appadmin',
      name: 'appadmin',
      component: () => import('/@/views/gen/Appadmin.vue'),
      meta: {
        title: '管理员信息',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'appfunction',
      name: 'appfunction',
      component: () => import('/@/views/gen/Appfunction.vue'),
      meta: {
        title: '功能定义',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'application',
      name: 'application',
      component: () => import('/@/views/gen/Application.vue'),
      meta: {
        title: '应用',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'apprequest',
      name: 'apprequest',
      component: () => import('/@/views/gen/Apprequest.vue'),
      meta: {
        title: '应用申请',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'approle',
      name: 'approle',
      component: () => import('/@/views/gen/Approle.vue'),
      meta: {
        title: '角色定义',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'appview',
      name: 'appview',
      component: () => import('/@/views/gen/Appview.vue'),
      meta: {
        title: '视图',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'copadmin',
      name: 'copadmin',
      component: () => import('/@/views/gen/Copadmin.vue'),
      meta: {
        title: '企业管理员',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'copconfig',
      name: 'copconfig',
      component: () => import('/@/views/gen/Copconfig.vue'),
      meta: {
        title: '企业配置信息',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'coperation',
      name: 'coperation',
      component: () => import('/@/views/gen/Coperation.vue'),
      meta: {
        title: '入驻企业信息',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'department',
      name: 'department',
      component: () => import('/@/views/gen/Department.vue'),
      meta: {
        title: '视图岗位',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'dep_func',
      name: 'dep_func',
      component: () => import('/@/views/gen/DepFunc.vue'),
      meta: {
        title: '岗位功能关系',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'dep_role',
      name: 'dep_role',
      component: () => import('/@/views/gen/DepRole.vue'),
      meta: {
        title: '岗位角色关系',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'funccategory',
      name: 'funccategory',
      component: () => import('/@/views/gen/Funccategory.vue'),
      meta: {
        title: '功能目录树',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'platadmin',
      name: 'platadmin',
      component: () => import('/@/views/gen/Platadmin.vue'),
      meta: {
        title: '平台管理员',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'platconfig',
      name: 'platconfig',
      component: () => import('/@/views/gen/Platconfig.vue'),
      meta: {
        title: '平台配置信息',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'rolecategory',
      name: 'rolecategory',
      component: () => import('/@/views/gen/Rolecategory.vue'),
      meta: {
        title: '角色目录',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'role_func',
      name: 'role_func',
      component: () => import('/@/views/gen/RoleFunc.vue'),
      meta: {
        title: '角色功能关系',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'user',
      name: 'user',
      component: () => import('/@/views/gen/User.vue'),
      meta: {
        title: '系统用户',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'user_dep',
      name: 'user_dep',
      component: () => import('/@/views/gen/UserDep.vue'),
      meta: {
        title: '用户岗位关联',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'user_func',
      name: 'user_func',
      component: () => import('/@/views/gen/UserFunc.vue'),
      meta: {
        title: '用户功能关系',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'user_privilege',
      name: 'user_privilege',
      component: () => import('/@/views/gen/UserPrivilege.vue'),
      meta: {
        title: 'oauth用户权限表',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'user_role',
      name: 'user_role',
      component: () => import('/@/views/gen/UserRole.vue'),
      meta: {
        title: '用户角色关系',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'oauth_access_token',
      name: 'oauth_access_token',
      component: () => import('/@/views/gen/OauthAccessToken.vue'),
      meta: {
        title: 'oauth_access_token缓存',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'oauth_code',
      name: 'oauth_code',
      component: () => import('/@/views/gen/OauthCode.vue'),
      meta: {
        title: '授权码',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
    {
      path: 'oauth_refresh_token',
      name: 'oauth_refresh_token',
      component: () => import('/@/views/gen/OauthRefreshToken.vue'),
      meta: {
        title: 'refresh token',
        icon: 'mdi:application-cog-outline',
        hideMenu: false,
      },
    },
  ],
};

export default autogen;
