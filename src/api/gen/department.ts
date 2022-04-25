import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { Department } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryDepartments = '/department/list', //?page=1&size=1
  crudDepartment = '/department',
}

/**
 * @description: 根据ID查询视图岗位
 */
export function getDepartment(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Department>(
    {
      url: Api.crudDepartment + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询视图岗位,包含各种状态的
 */
export function queryDepartments(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<Department>>(
    {
      url: Api.queryDepartments,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除视图岗位
 */
export function deleteDepartment(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudDepartment + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增视图岗位
 */
export function saveDepartment(param: Department, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudDepartment,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新视图岗位
 */
export function updateDepartment(param: Department, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudDepartment,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
