import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { Copconfig } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryCopconfigs = '/copconfig/list', //?page=1&size=1
  crudCopconfig = '/copconfig',
}

/**
 * @description: 根据ID查询企业配置信息
 */
export function getCopconfig(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Copconfig>(
    {
      url: Api.crudCopconfig + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询企业配置信息,包含各种状态的
 */
export function queryCopconfigs(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<Copconfig>>(
    {
      url: Api.queryCopconfigs,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除企业配置信息
 */
export function deleteCopconfig(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudCopconfig + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增企业配置信息
 */
export function saveCopconfig(param: Copconfig, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudCopconfig,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新企业配置信息
 */
export function updateCopconfig(param: Copconfig, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudCopconfig,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
