import type { GlobConfig } from '/#/config';

import { warn } from '/@/utils/log';
import { getAppEnvConfig } from '/@/utils/env';

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_LOCAL_MOCK_URL,
    VITE_LOCAL_JAVA_URL,
    VITE_REMOTE_MOCK_URL,
    VITE_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_LOCAL_MOCK_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = getAppEnvConfig();

  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    );
  }

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    localUrl: VITE_LOCAL_MOCK_URL,
    localJavaDebug: VITE_LOCAL_JAVA_URL,
    mockUrl: VITE_REMOTE_MOCK_URL,
    apiUrl: VITE_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    urlPrefix: VITE_LOCAL_MOCK_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
  };
  return glob as Readonly<GlobConfig>;
};
