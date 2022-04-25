import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { Rolecategory } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryRolecategorys = '/rolecategory/list', //?page=1&size=1
  crudRolecategory = '/rolecategory',
}

/**
 * @description: 根据ID查询角色目录
 */
export function getRolecategory(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Rolecategory>(
    {
      url: Api.crudRolecategory + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询角色目录,包含各种状态的
 */
export function queryRolecategorys(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<Rolecategory>>(
    {
      url: Api.queryRolecategorys,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除角色目录
 */
export function deleteRolecategory(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudRolecategory + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增角色目录
 */
export function saveRolecategory(param: Rolecategory, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudRolecategory,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新角色目录
 */
export function updateRolecategory(param: Rolecategory, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudRolecategory,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
