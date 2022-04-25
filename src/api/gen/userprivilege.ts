import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { UserPrivilege } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryUserPrivileges = '/user-privilege/list', //?page=1&size=1
  crudUserPrivilege = '/userPrivilege',
}

/**
 * @description: 根据ID查询OAUTH用户权限表
 */
export function getUserPrivilege(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<UserPrivilege>(
    {
      url: Api.crudUserPrivilege + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询OAUTH用户权限表,包含各种状态的
 */
export function queryUserPrivileges(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<UserPrivilege>>(
    {
      url: Api.queryUserPrivileges,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除OAUTH用户权限表
 */
export function deleteUserPrivilege(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudUserPrivilege + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增OAUTH用户权限表
 */
export function saveUserPrivilege(param: UserPrivilege, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudUserPrivilege,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新OAUTH用户权限表
 */
export function updateUserPrivilege(param: UserPrivilege, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudUserPrivilege,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
