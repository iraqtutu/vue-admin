import { localDebugHttp } from '/@/utils/http/axios';
import { Cop } from './model/copModel';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryCops = '/coperation/list', //?page=1&size=1
  deleteCop = '',
}

/**
 * @description: 查询入驻企业列表,包含各种状态的
 */
export function queryCops(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<Cop>>(
    {
      url: Api.queryCops,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 查询入驻企业列表,包含各种状态的
 */
export function deleteCop(params: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<CopPage>(
    {
      url: Api.queryCops,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
