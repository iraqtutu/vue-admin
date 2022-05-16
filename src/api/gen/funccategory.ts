import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { Funccategory } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryFunccategorys = '/funccategory/list', //?page=1&size=1
  crudFunccategory = '/funccategory',
}

/**
 * @description: 根据ID查询功能目录树
 */
export function getFunccategory(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Funccategory>(
    {
      url: Api.crudFunccategory + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询功能目录树,包含各种状态的
 */
export function queryFunccategorys(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<Funccategory>>(
    {
      url: Api.queryFunccategorys,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除功能目录树
 */
export function deleteFunccategory(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudFunccategory + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增功能目录树
 */
export function saveFunccategory(param: Funccategory, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
    {
      url: Api.crudFunccategory,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新功能目录树
 */
export function updateFunccategory(param: Funccategory, mode: ErrorMessageMode = 'modal') {
  return curHttp.put<Boolean>(
    {
      url: Api.crudFunccategory,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
