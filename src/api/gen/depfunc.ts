import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { DepFunc } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryDepFuncs = '/dep-func/list', //?page=1&size=1
  crudDepFunc = '/depFunc',
}

/**
 * @description: 根据ID查询岗位功能关系
 */
export function getDepFunc(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<DepFunc>(
    {
      url: Api.crudDepFunc + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询岗位功能关系,包含各种状态的
 */
export function queryDepFuncs(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<DepFunc>>(
    {
      url: Api.queryDepFuncs,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除岗位功能关系
 */
export function deleteDepFunc(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudDepFunc + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增岗位功能关系
 */
export function saveDepFunc(param: DepFunc, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
    {
      url: Api.crudDepFunc,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新岗位功能关系
 */
export function updateDepFunc(param: DepFunc, mode: ErrorMessageMode = 'modal') {
  return curHttp.put<Boolean>(
    {
      url: Api.crudDepFunc,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
