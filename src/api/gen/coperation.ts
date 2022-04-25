import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { Coperation } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryCoperations = '/coperation/list', //?page=1&size=1
  crudCoperation = '/coperation',
}

/**
 * @description: 根据ID查询入驻企业信息
 */
export function getCoperation(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Coperation>(
    {
      url: Api.crudCoperation + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询入驻企业信息,包含各种状态的
 */
export function queryCoperations(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<Coperation>>(
    {
      url: Api.queryCoperations,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除入驻企业信息
 */
export function deleteCoperation(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudCoperation + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增入驻企业信息
 */
export function saveCoperation(param: Coperation, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudCoperation,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新入驻企业信息
 */
export function updateCoperation(param: Coperation, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudCoperation,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
