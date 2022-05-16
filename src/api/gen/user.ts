import { apiHttp as curHttp } from '/@/utils/http/axios';
import { BasicPageParams, Page } from '/@/api/model/baseModel';
import { User } from '/@/api/model/genModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  queryUsers = '/user/list', //?page=1&size=1
  crudUser = '/user',
}

/**
 * @description: 根据ID查询系统用户
 */
export function getUser(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<User>(
    {
      url: Api.crudUser + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 分页查询系统用户,包含各种状态的
 */
export function queryUsers(params: BasicPageParams, mode: ErrorMessageMode = 'modal') {
  return curHttp.get<Page<User>>(
    {
      url: Api.queryUsers,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 根据ID逻辑删除系统用户
 */
export function deleteUser(id: string, mode: ErrorMessageMode = 'modal') {
  return curHttp.delete<Boolean>(
    {
      url: Api.crudUser + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 新增系统用户
 */
export function saveUser(param: User, mode: ErrorMessageMode = 'modal') {
  return curHttp.post<Boolean>(
    {
      url: Api.crudUser,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新系统用户
 */
export function updateUser(param: User, mode: ErrorMessageMode = 'modal') {
  return curHttp.put<Boolean>(
    {
      url: Api.crudUser,
      data: param,
    },
    {
      errorMessageMode: mode,
    },
  );
}
