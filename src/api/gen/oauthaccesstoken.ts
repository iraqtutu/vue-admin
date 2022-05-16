import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { OauthAccessToken } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryOauthAccessTokens = '/oauth-access-token/list', //?page=1&size=1
  crudOauthAccessToken = '/oauthAccessToken',
}

/**
 * @description: 根据ID查询oauth_access_token缓存
 */
export function getOauthAccessToken(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<OauthAccessToken>(
    {
      url: Api.crudOauthAccessToken + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询oauth_access_token缓存,包含各种状态的
 */
export function queryOauthAccessTokens(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<OauthAccessToken>>(
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
 * @description: 根据ID逻辑删除oauth_access_token缓存
 */
export function deleteOauthAccessToken(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudOauthAccessToken + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增oauth_access_token缓存
 */
export function saveOauthAccessToken(param: OauthAccessToken, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
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
 * @description: 更新oauth_access_token缓存
 */
export function updateOauthAccessToken(param: OauthAccessToken, mode: ErrorMessageMode = 'modal') {
  return curHttp.put<Boolean>(
    {
      url: Api.crudOauthAccessToken,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
