export interface BaseAuthParams {
  client_id: string;
  client_secret: string;
}

/**
 * @description: RefreshToken interface parameters
 */
export interface RefreshTokenParams extends BaseAuthParams {
  grant_type: string;
  refresh_token: string;
}

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  grant_type: string;
  scope: string;
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  jti: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  uuid: string;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
  // 手机号
  phone?: string;
  // 邮箱
  email?: string;
  // 地址
  address?: string;
  // 公司
  cop_id?: string;
}
