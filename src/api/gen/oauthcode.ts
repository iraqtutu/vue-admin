import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { OauthCode } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryOauthCodes = '/oauth-code/list', //?page=1&size=1
  crudOauthCode = '/oauthCode',
}

/**
 * @description: 根据ID查询OAUTH缓存授权码
 */
export function getOauthCode(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<OauthCode>(
    {
      url: Api.crudOauthCode + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询OAUTH缓存授权码,包含各种状态的
 */
export function queryOauthCodes(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<OauthCode>>(
    {
      url: Api.queryOauthCodes,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除OAUTH缓存授权码
 */
export function deleteOauthCode(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudOauthCode + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增OAUTH缓存授权码
 */
export function saveOauthCode(param: OauthCode, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudOauthCode,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新OAUTH缓存授权码
 */
export function updateOauthCode(param: OauthCode, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudOauthCode,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
