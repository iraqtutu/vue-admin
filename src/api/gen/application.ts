import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { Application } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryApplications = '/application/list', //?page=1&size=1
  crudApplication = '/application',
}

/**
 * @description: 根据ID查询应用
 */
export function getApplication(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Application>(
    {
      url: Api.crudApplication + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询应用,包含各种状态的
 */
export function queryApplications(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<Application>>(
    {
      url: Api.queryApplications,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除应用
 */
export function deleteApplication(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudApplication + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增应用
 */
export function saveApplication(param: Application, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
    {
      url: Api.crudApplication,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新应用
 */
export function updateApplication(param: Application, mode: ErrorMessageMode = 'modal') {
  return curHttp.put<Boolean>(
    {
      url: Api.crudApplication,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
