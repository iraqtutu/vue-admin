import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { Copadmin } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryCopadmins = '/copadmin/list', //?page=1&size=1
  crudCopadmin = '/copadmin',
}

/**
 * @description: 根据ID查询企业管理员
 */
export function getCopadmin(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Copadmin>(
    {
      url: Api.crudCopadmin + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询企业管理员,包含各种状态的
 */
export function queryCopadmins(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<Copadmin>>(
    {
      url: Api.queryCopadmins,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除企业管理员
 */
export function deleteCopadmin(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudCopadmin + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增企业管理员
 */
export function saveCopadmin(param: Copadmin, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
    {
      url: Api.crudCopadmin,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新企业管理员
 */
export function updateCopadmin(param: Copadmin, mode: ErrorMessageMode = 'modal') {
  return curHttp.put<Boolean>(
    {
      url: Api.crudCopadmin,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
