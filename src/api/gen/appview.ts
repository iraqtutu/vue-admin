import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { Appview } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryAppviews = '/appview/list', //?page=1&size=1
  crudAppview = '/appview',
}

/**
 * @description: 根据ID查询视图
 */
export function getAppview(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Appview>(
    {
      url: Api.crudAppview + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询视图,包含各种状态的
 */
export function queryAppviews(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<Appview>>(
    {
      url: Api.queryAppviews,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除视图
 */
export function deleteAppview(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudAppview + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增视图
 */
export function saveAppview(param: Appview, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
    {
      url: Api.crudAppview,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新视图
 */
export function updateAppview(param: Appview, mode: ErrorMessageMode = 'modal') {
  return curHttp.put<Boolean>(
    {
      url: Api.crudAppview,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
