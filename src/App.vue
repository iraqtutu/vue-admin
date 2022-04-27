<template>
  <el-config-provider :locale="zhCn">
    <ConfigProvider :locale="getAntdLocale">
      <AppProvider>
        <RouterView />
      </AppProvider>
    </ConfigProvider>
  </el-config-provider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';
  import { ElConfigProvider } from 'element-plus';
  import zhCn from 'element-plus/lib/locale/lang/zh-cn';

  import 'dayjs/locale/zh-cn';
  // support Multi-language
  const { getAntdLocale } = useLocale();

  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
