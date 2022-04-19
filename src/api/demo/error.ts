import { localHttp } from '/@/utils/http/axios';

enum Api {
  // The address does not exist
  Error = '/error',
}

/**
 * @description: Trigger ajax error
 */

export const fireErrorApi = () => localHttp.get({ url: Api.Error });
