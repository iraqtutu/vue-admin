import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { OauthRefreshToken } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryOauthRefreshTokens = '/oauth-refresh-token/list', //?page=1&size=1
  crudOauthRefreshToken = '/oauthRefreshToken',
}

/**
 * @description: 根据ID查询OAUTHRefreshToken缓存
 */
export function getOauthRefreshToken(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<OauthRefreshToken>(
    {
      url: Api.crudOauthRefreshToken + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询OAUTHRefreshToken缓存,包含各种状态的
 */
export function queryOauthRefreshTokens(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<OauthRefreshToken>>(
    {
      url: Api.queryOauthRefreshTokens,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除OAUTHRefreshToken缓存
 */
export function deleteOauthRefreshToken(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudOauthRefreshToken + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增OAUTHRefreshToken缓存
 */
export function saveOauthRefreshToken(param: OauthRefreshToken, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudOauthRefreshToken,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新OAUTHRefreshToken缓存
 */
export function updateOauthRefreshToken(
  param: OauthRefreshToken,
  mode: ErrorMessageMode = 'modal',
) {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudOauthRefreshToken,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
