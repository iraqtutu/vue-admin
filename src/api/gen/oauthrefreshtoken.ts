import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { OauthRefreshToken } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryOauthRefreshTokens = '/oauth-refresh-token/list', //?page=1&size=1
  crudOauthRefreshToken = '/oauthRefreshToken',
}

/**
 * @description: 根据ID查询Refresh Token
 */
export function getOauthRefreshToken(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<OauthRefreshToken>(
    {
      url: Api.crudOauthRefreshToken + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询Refresh Token,包含各种状态的
 */
export function queryOauthRefreshTokens(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<OauthRefreshToken>>(
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
 * @description: 根据ID逻辑删除Refresh Token
 */
export function deleteOauthRefreshToken(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudOauthRefreshToken + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增Refresh Token
 */
export function saveOauthRefreshToken(param: OauthRefreshToken, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
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
 * @description: 更新Refresh Token
 */
export function updateOauthRefreshToken(
  param: OauthRefreshToken,
  mode: ErrorMessageMode = 'modal',
) {
  return curHttp.put<Boolean>(
    {
      url: Api.crudOauthRefreshToken,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
