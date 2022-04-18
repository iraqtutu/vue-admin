import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
//import { t } from '/@/hooks/web/useI18n';

const platform: AppRouteModule = {
  path: '/plateform',
  name: 'plateform',
  component: LAYOUT,
  redirect: '/plateform/index',
  meta: {
    hideChildrenInMenu: false,
    icon: 'tabler:template',
    title: '平台管理',
    orderNo: 11,
  },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('/@/views/platform/index.vue'),
      meta: {
        title: '平台设置',
        icon: 'eos-icons:cluster-management-outlined',
        hideMenu: false,
      },
    },
    {
      path: 'copsman',
      name: 'copsman',
      component: () => import('/@/views/platform/copsman/index.vue'),
      meta: {
        title: '入驻企业管理',
        icon: 'ic:baseline-business',
        hideMenu: false,
      },
    },
  ],
};

export default platform;
