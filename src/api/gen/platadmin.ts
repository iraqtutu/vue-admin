import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { Platadmin } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryPlatadmins = '/platadmin/list', //?page=1&size=1
  crudPlatadmin = '/platadmin',
}

/**
 * @description: 根据ID查询平台管理员
 */
export function getPlatadmin(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Platadmin>(
    {
      url: Api.crudPlatadmin + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询平台管理员,包含各种状态的
 */
export function queryPlatadmins(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<Platadmin>>(
    {
      url: Api.queryPlatadmins,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除平台管理员
 */
export function deletePlatadmin(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudPlatadmin + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增平台管理员
 */
export function savePlatadmin(param: Platadmin, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudPlatadmin,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新平台管理员
 */
export function updatePlatadmin(param: Platadmin, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudPlatadmin,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
