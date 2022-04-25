import { localDebugHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { UserDep } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryUserDeps = '/user-dep/list', //?page=1&size=1
  crudUserDep = '/userDep',
}

/**
 * @description: 根据ID查询用户岗位关联
 */
export function getUserDep(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<UserDep>(
    {
      url: Api.crudUserDep + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询用户岗位关联,包含各种状态的
 */
export function queryUserDeps(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.get<Page<UserDep>>(
    {
      url: Api.queryUserDeps,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除用户岗位关联
 */
export function deleteUserDep(id: string, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.delete<Boolean>(
    {
      url: Api.crudUserDep + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增用户岗位关联
 */
export function saveUserDep(param: UserDep, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.post<Boolean>(
    {
      url: Api.crudUserDep,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新用户岗位关联
 */
export function updateUserDep(param: UserDep, mode: ErrorMessageMode = 'modal') {
  return localDebugHttp.put<Boolean>(
    {
      url: Api.crudUserDep,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
