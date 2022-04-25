import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { OauthClientDetails } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryOauthClientDetailss = '/oauth-client-details/list', //?page=1&size=1
  crudOauthClientDetails = '/oauthClientDetails',
}

/**
 * @description: 根据ID查询OAUTH客户端应用表
 */
export function getOauthClientDetails(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<OauthClientDetails>(
    {
      url: Api.crudOauthClientDetails + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询OAUTH客户端应用表,包含各种状态的
 */
export function queryOauthClientDetailss(
  params: BasicPageParams,
  mode: ErrorMessageMode = 'modal',
) {
  return localDebugHttp.get<Page<OauthClientDetails>>(
    {
      url: Api.queryOauthClientDetailss,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除OAUTH客户端应用表
 */
export function deleteOauthClientDetails(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudOauthClientDetails + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增OAUTH客户端应用表
 */
export function saveOauthClientDetails(
  param: OauthClientDetails,
  mode: ErrorMessageMode = 'modal',
) {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudOauthClientDetails,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新OAUTH客户端应用表
 */
export function updateOauthClientDetails(
  param: OauthClientDetails,
  mode: ErrorMessageMode = 'modal',
) {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudOauthClientDetails,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
