import { localDebugHttp } from '/@/utils/http/axios';
import { BaseAuthParams, LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/oauth/token',
  Logout = '/logout',
  GetUserInfo = '/api/userinfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api,return token
 */
export function loginApi(
  params: LoginParams,
  authinfo: BaseAuthParams,
  mode: ErrorMessageMode = 'modal',
) {
  debugger;
  return localDebugHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      data: params,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      auth: { username: authinfo.client_id, password: authinfo.client_secret },
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo(accessToken: string) {
  return localDebugHttp.get<GetUserInfoModel>(
    {
      url: Api.GetUserInfo,
      params: {
        access_token: accessToken,
      },
      withCredentials: true,
    },
    { errorMessageMode: 'none' },
  );
}

export function getPermCode() {
  return localDebugHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return localDebugHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return localDebugHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
