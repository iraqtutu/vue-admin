import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { RoleFunc } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryRoleFuncs = '/role-func/list', //?page=1&size=1
  crudRoleFunc = '/roleFunc',
}

/**
 * @description: 根据ID查询角色功能关系
 */
export function getRoleFunc(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<RoleFunc>(
    {
      url: Api.crudRoleFunc + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询角色功能关系,包含各种状态的
 */
export function queryRoleFuncs(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<RoleFunc>>(
    {
      url: Api.queryRoleFuncs,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除角色功能关系
 */
export function deleteRoleFunc(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudRoleFunc + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增角色功能关系
 */
export function saveRoleFunc(param: RoleFunc, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
    {
      url: Api.crudRoleFunc,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新角色功能关系
 */
export function updateRoleFunc(param: RoleFunc, mode: ErrorMessageMode = 'modal') {
  return curHttp.put<Boolean>(
    {
      url: Api.crudRoleFunc,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
