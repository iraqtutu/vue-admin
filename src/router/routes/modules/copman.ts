import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
//import { t } from '/@/hooks/web/useI18n';

const copman: AppRouteModule = {
  path: '/copman',
  name: 'copman',
  component: LAYOUT,
  redirect: '/copman/index',
  meta: {
    hideChildrenInMenu: false,
    icon: 'bxl:microsoft-teams',
    title: '企业管理',
    orderNo: 11,
  },
  children: [
    {
      path: 'copconfig',
      name: 'copconfig',
      component: () => import('/@/views/cop/copman/index.vue'),
      meta: {
        title: '企业设置',
        icon: 'file-icons:config-coffeescript',
        hideMenu: false,
      },
    },
    {
      path: 'appman',
      name: 'appman',
      component: () => import('/@/views/cop/appman/index.vue'),
      meta: {
        title: '应用管理',
        icon: 'fa-brands:app-store',
        hideMenu: false,
      },
    },
    {
      path: 'userman',
      name: 'userman',
      component: () => import('/@/views/cop/userman/index.vue'),
      meta: {
        title: '通讯录管理',
        icon: 'fluent:contact-card-group-16-regular',
        hideMenu: false,
      },
    },
  ],
};

export default copman;
