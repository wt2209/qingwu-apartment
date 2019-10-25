import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

/**
  *
  * @api {get} /api/login/account 用户使用账户密码登录
  * @apiName loginByAccount
  * @apiGroup Login
  * @apiVersion  major.minor.patch
  *
  *
  * @apiParam  {String} username 用户名
  * @apiParam  {String} password 密码
  *
  * @apiSuccess (200) {String} token 从服务端获取到的jwt token
  * @apiSuccess (200) {String} currentAuthority 用户所属角色，取值：admin|user|guest
  * @apiSuccess (200) {String} status 状态，取值：ok|error
  *
  *
  * @apiSuccessExample {json} Success-Response:
  * {
  *     status : ok,
  *     token: this_is_a_jwt_token,
  *     currentAuthority: admin
  * }
  *
  */
export async function accountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
