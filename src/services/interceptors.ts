import { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, HeadersDefaults } from "axios";
import Cookie from 'js-cookie';

import api from "./api";

type ApiData = {
  'access-token': string;
  client: string;
  expiry: number;
  'token-type': string;
  uid: string;
}

function authRequestIntercept(req: AxiosRequestConfig<any>) {
  const cookie = Cookie?.get('@api-data');
  if (cookie) {
    const apiData: ApiData & AxiosRequestHeaders = JSON.parse(cookie)
    req.headers = apiData;
  }
  return req;
}

function authResponseIntercept(res: AxiosResponse<any>) {
  if (res.headers['access-token'] && res.headers['access-token'] !== '') {
    const headers = { ...api.defaults.headers };
    const apiData: ApiData & HeadersDefaults = {
      ...headers,
      'access-token': res.headers['access-token'],
      'client': res.headers['client'],
      'expiry': Number(res.headers['expiry']),
      'token-type': res.headers['token-type'],
      'uid': res.headers['uid']
    }
    api.defaults.headers = apiData;
    Cookie.set('@api-data', JSON.stringify(apiData))
  }

  return res
}

export { authRequestIntercept, authResponseIntercept }