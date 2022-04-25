import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { UserFunc } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryUserFuncs = '/user-func/list', //?page=1&size=1
  crudUserFunc = '/userFunc',
}

/**
 * @description: 根据ID查询用户功能关系
 */
export function getUserFunc(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<UserFunc>(
    {
      url: Api.crudUserFunc + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询用户功能关系,包含各种状态的
 */
export function queryUserFuncs(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<UserFunc>>(
    {
      url: Api.queryUserFuncs,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除用户功能关系
 */
export function deleteUserFunc(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudUserFunc + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增用户功能关系
 */
export function saveUserFunc(param: UserFunc, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudUserFunc,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新用户功能关系
 */
export function updateUserFunc(param: UserFunc, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudUserFunc,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
