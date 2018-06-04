import request from '../utils/request';


let projectName = "/projectf"

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request(`${projectName}/api/business/autho/currentaccount`);
}
