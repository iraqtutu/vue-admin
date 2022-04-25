import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { User } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryUsers = '/user/list', //?page=1&size=1
  crudUser = '/user',
}

/**
 * @description: 根据ID查询OAUTH用户表
 */
export function getUser(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<User>(
    {
      url: Api.crudUser + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询OAUTH用户表,包含各种状态的
 */
export function queryUsers(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<User>>(
    {
      url: Api.queryUsers,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除OAUTH用户表
 */
export function deleteUser(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudUser + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增OAUTH用户表
 */
export function saveUser(param: User, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudUser,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新OAUTH用户表
 */
export function updateUser(param: User, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudUser,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
