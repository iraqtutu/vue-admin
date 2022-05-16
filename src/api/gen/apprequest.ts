import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { Apprequest } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryApprequests = '/apprequest/list', //?page=1&size=1
  crudApprequest = '/apprequest',
}

/**
 * @description: 根据ID查询应用申请
 */
export function getApprequest(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Apprequest>(
    {
      url: Api.crudApprequest + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询应用申请,包含各种状态的
 */
export function queryApprequests(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<Apprequest>>(
    {
      url: Api.queryApprequests,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除应用申请
 */
export function deleteApprequest(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudApprequest + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增应用申请
 */
export function saveApprequest(param: Apprequest, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
    {
      url: Api.crudApprequest,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新应用申请
 */
export function updateApprequest(param: Apprequest, mode: ErrorMessageMode = 'modal') {
  return curHttp.put<Boolean>(
    {
      url: Api.crudApprequest,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
