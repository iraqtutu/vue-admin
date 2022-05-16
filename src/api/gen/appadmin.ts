import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { Appadmin } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryAppadmins = '/appadmin/list', //?page=1&size=1
  crudAppadmin = '/appadmin',
}

/**
 * @description: 根据ID查询管理员信息
 */
export function getAppadmin(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Appadmin>(
    {
      url: Api.crudAppadmin + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询管理员信息,包含各种状态的
 */
export function queryAppadmins(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<Appadmin>>(
    {
      url: Api.queryAppadmins,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除管理员信息
 */
export function deleteAppadmin(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudAppadmin + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增管理员信息
 */
export function saveAppadmin(param: Appadmin, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
    {
      url: Api.crudAppadmin,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新管理员信息
 */
export function updateAppadmin(param: Appadmin, mode: ErrorMessageMode = 'modal') {
  return curHttp.put<Boolean>(
    {
      url: Api.crudAppadmin,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
