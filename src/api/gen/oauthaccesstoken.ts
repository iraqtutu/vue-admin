import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { OauthAccessToken } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryOauthAccessTokens = '/oauth-access-token/list', //?page=1&size=1
  crudOauthAccessToken = '/oauthAccessToken',
}

/**
 * @description: 根据ID查询OAUTH的Token缓存表
 */
export function getOauthAccessToken(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<OauthAccessToken>(
    {
      url: Api.crudOauthAccessToken + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询OAUTH的Token缓存表,包含各种状态的
 */
export function queryOauthAccessTokens(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<OauthAccessToken>>(
    {
      url: Api.queryOauthAccessTokens,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除OAUTH的Token缓存表
 */
export function deleteOauthAccessToken(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudOauthAccessToken + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增OAUTH的Token缓存表
 */
export function saveOauthAccessToken(param: OauthAccessToken, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudOauthAccessToken,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新OAUTH的Token缓存表
 */
export function updateOauthAccessToken(param: OauthAccessToken, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudOauthAccessToken,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
