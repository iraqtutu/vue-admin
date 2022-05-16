import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { UserPrivilege } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryUserPrivileges = '/user-privilege/list', //?page=1&size=1
  crudUserPrivilege = '/userPrivilege',
}

/**
 * @description: 根据ID查询oauth用户权限表
 */
export function getUserPrivilege(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<UserPrivilege>(
    {
      url: Api.crudUserPrivilege + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询oauth用户权限表,包含各种状态的
 */
export function queryUserPrivileges(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<UserPrivilege>>(
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
 * @description: 根据ID逻辑删除oauth用户权限表
 */
export function deleteUserPrivilege(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudUserPrivilege + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增oauth用户权限表
 */
export function saveUserPrivilege(param: UserPrivilege, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
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
 * @description: 更新oauth用户权限表
 */
export function updateUserPrivilege(param: UserPrivilege, mode: ErrorMessageMode = 'modal') {
  return curHttp.put<Boolean>(
    {
      url: Api.crudUserPrivilege,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
