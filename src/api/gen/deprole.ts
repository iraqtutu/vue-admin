import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { DepRole } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryDepRoles = '/dep-role/list', //?page=1&size=1
  crudDepRole = '/depRole',
}

/**
 * @description: 根据ID查询岗位角色关系
 */
export function getDepRole(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<DepRole>(
    {
      url: Api.crudDepRole + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询岗位角色关系,包含各种状态的
 */
export function queryDepRoles(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<DepRole>>(
    {
      url: Api.queryDepRoles,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除岗位角色关系
 */
export function deleteDepRole(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudDepRole + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增岗位角色关系
 */
export function saveDepRole(param: DepRole, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
    {
      url: Api.crudDepRole,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新岗位角色关系
 */
export function updateDepRole(param: DepRole, mode: ErrorMessageMode = 'modal') {
  return curHttp.put<Boolean>(
    {
      url: Api.crudDepRole,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
