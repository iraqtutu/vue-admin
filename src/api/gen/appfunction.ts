import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { Appfunction } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryAppfunctions = '/appfunction/list', //?page=1&size=1
  crudAppfunction = '/appfunction',
}

/**
 * @description: 根据ID查询功能定义
 */
export function getAppfunction(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Appfunction>(
    {
      url: Api.crudAppfunction + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询功能定义,包含各种状态的
 */
export function queryAppfunctions(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<Appfunction>>(
    {
      url: Api.queryAppfunctions,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除功能定义
 */
export function deleteAppfunction(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudAppfunction + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增功能定义
 */
export function saveAppfunction(param: Appfunction, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
    {
      url: Api.crudAppfunction,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新功能定义
 */
export function updateAppfunction(param: Appfunction, mode: ErrorMessageMode = 'modal') {
  return curHttp.put<Boolean>(
    {
      url: Api.crudAppfunction,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
