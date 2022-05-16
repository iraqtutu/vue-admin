import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { UserRole } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryUserRoles = '/user-role/list', //?page=1&size=1
  crudUserRole = '/userRole',
}

/**
 * @description: 根据ID查询用户角色关系
 */
export function getUserRole(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<UserRole>(
    {
      url: Api.crudUserRole + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询用户角色关系,包含各种状态的
 */
export function queryUserRoles(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<UserRole>>(
    {
      url: Api.queryUserRoles,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除用户角色关系
 */
export function deleteUserRole(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudUserRole + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增用户角色关系
 */
export function saveUserRole(param: UserRole, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
    {
      url: Api.crudUserRole,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新用户角色关系
 */
export function updateUserRole(param: UserRole, mode: ErrorMessageMode = 'modal') {
  return curHttp.put<Boolean>(
    {
      url: Api.crudUserRole,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
