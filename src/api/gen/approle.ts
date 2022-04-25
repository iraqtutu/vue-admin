import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { Approle } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryApproles = '/approle/list', //?page=1&size=1
  crudApprole = '/approle',
}

/**
 * @description: 根据ID查询角色定义
 */
export function getApprole(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Approle>(
    {
      url: Api.crudApprole + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询角色定义,包含各种状态的
 */
export function queryApproles(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<Approle>>(
    {
      url: Api.queryApproles,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除角色定义
 */
export function deleteApprole(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudApprole + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增角色定义
 */
export function saveApprole(param: Approle, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudApprole,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新角色定义
 */
export function updateApprole(param: Approle, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudApprole,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
