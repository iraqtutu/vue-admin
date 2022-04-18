import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/settings',
  name: 'settings',
  component: LAYOUT,
  redirect: '/settings/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'healthicons:ui-user-profile-outline',
    title: '用户设置',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'settingsPage',
      component: () => import('/@/views/sys/about/settings.vue'),
      meta: {
        title: '用户设置',
        icon: 'healthicons:ui-user-profile-outline',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
