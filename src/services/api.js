import { stringify } from 'qs';
import request from '../utils/request';

let projectName = "/projectf"


export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}


export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}



export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

//登录相关
export async function accountLogin(params){
  return request(`${projectName}/api/business/autho/login`, {
    method: 'POST',
    body: params,
  });
}

export async function accountLogout(){
  return request(`${projectName}/api/business/autho/logout`);
}

export async function updatePassword(params){
  return request(`${projectName}/api/business/autho/updatepassword`, {
    method: 'PUT',
    body: params,
  });
}

//拉取订单列表
export async function getOrderList(params){
  return request(`${projectName}/api/business/resource/order?${stringify(params)}`);
}

export async function createOrder(params){
  return request(`${projectName}/api/business/resource/order`, {
    method: 'POST',
    body: params,
  });
}
export async function confirmOrder(params){
  return request(`${projectName}/api/business/resource/confirmorder`, {
    method: 'PUT',
    body: params,
  });
}

export async function getPaymentList(params){
  return request(`${projectName}/api/business/resource/payment?${stringify(params)}`);
}




