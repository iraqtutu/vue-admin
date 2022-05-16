export interface Appadmin {
  id: string;
  userId: string;
  appId: string;
  note: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface Appfunction {
  id: string;
  appId: string;
  groupId: string;
  functionId: string;
  functionEname: string;
  functionCname: string;
  url: string;
  note: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface Application {
  clientId: string;
  resourceIds: string;
  clientSecret: string;
  scope: string;
  authorizedGrantTypes: string;
  webServerRedirectUri: string;
  authorities: string;
  accessTokenValidity: number;
  refreshTokenValidity: number;
  additionalInformation: string;
  createTime: string;
  archived: string;
  trusted: string;
  autoapprove: string;
  appname: string;
  description: string;
  logo: string;
  copId: string;
}
export interface Apprequest {
  id: string;
  copId: string;
  status: number;
  appEname: string;
  appCnname: string;
  appNote: string;
  viewrefappid: string;
  email: string;
  mobile: string;
  adminId: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface Approle {
  id: string;
  appId: string;
  groupId: string;
  roleEname: string;
  roleCname: string;
  note: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface Appview {
  id: string;
  copId: string;
  isbase: number;
  note: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface Copadmin {
  id: string;
  copId: string;
  userId: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface Copconfig {
  id: string;
  copId: string;
  logo: string;
  bizLicense: string;
  email: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface Coperation {
  id: string;
  copName: string;
  logo: string;
  bizLicense: string;
  linkMan: string;
  linkManMobile: string;
  address: string;
  checked: number;
  checkUser: string;
  revision: number;
  createdBy: string;
  creatorMobile: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
  copDesc: string;
  status: number;
}
export interface Department {
  id: string;
  copId: string;
  viewId: string;
  departmentName: string;
  parentId: string;
  extenalJson: string;
  note: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface DepFunc {
  id: string;
  appId: string;
  departmentId: string;
  functionId: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface DepRole {
  id: string;
  appId: string;
  departmentId: string;
  roleId: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface Funccategory {
  id: string;
  appid: string;
  parentId: string;
  groupName: string;
  note: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface Platadmin {
  id: string;
  userId: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface Platconfig {
  id: string;
  varName: string;
  varValue: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface Rolecategory {
  id: string;
  appid: string;
  parentId: string;
  groupName: string;
  note: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface RoleFunc {
  id: string;
  appId: string;
  roleId: string;
  funcId: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface User {
  uuid: string;
  createTime: string;
  archived: string;
  version: number;
  username: string;
  nickname: string;
  realname: string;
  password: string;
  phone: string;
  email: string;
  idnum: string;
  avatar: string;
  idcarda: string;
  idcardb: string;
  note: string;
  defaultUser: string;
  lastLoginTime: string;
  creatorId: string;
  signature: string;
  introduction: string;
  address: string;
  copId: string;
  locked: string;
  accountExpiredTime: string;
  pwdExpiredTime: string;
}
export interface UserDep {
  id: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  viewId: string;
  departmentId: string;
  userId: string;
  deleteFlag: number;
}
export interface UserFunc {
  id: string;
  appId: string;
  userId: string;
  funcId: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface UserPrivilege {
  uuid: string;
  createTime: string;
  archived: string;
  version: number;
  userId: string;
  privilege: string;
}
export interface UserRole {
  id: string;
  appId: string;
  userId: string;
  roleId: string;
  revision: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deleteFlag: number;
}
export interface OauthAccessToken {
  createTime: string;
  tokenId: string;
  token: string;
  authenticationId: string;
  userName: string;
  clientId: string;
  authentication: string;
  refreshToken: string;
}
export interface OauthCode {
  createTime: string;
  code: string;
  authentication: string;
}
export interface OauthRefreshToken {
  createTime: string;
  tokenId: string;
  token: string;
  authentication: string;
}
