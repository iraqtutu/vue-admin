import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { Platconfig } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryPlatconfigs = '/platconfig/list', //?page=1&size=1
  crudPlatconfig = '/platconfig',
}

/**
 * @description: 根据ID查询平台配置信息
 */
export function getPlatconfig(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Platconfig>(
    {
      url: Api.crudPlatconfig + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询平台配置信息,包含各种状态的
 */
export function queryPlatconfigs(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<Platconfig>>(
    {
      url: Api.queryPlatconfigs,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除平台配置信息
 */
export function deletePlatconfig(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudPlatconfig + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增平台配置信息
 */
export function savePlatconfig(param: Platconfig, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudPlatconfig,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新平台配置信息
 */
export function updatePlatconfig(param: Platconfig, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudPlatconfig,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
