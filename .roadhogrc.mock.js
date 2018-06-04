import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';


import { getOrder } from './mock/business'

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {


  'GET /api/order': {
    list: [
      {
        key: '1',
        orderid: "001",
        userid: 'John Brown',
        amount: 32,
        createtime: "2018-01-01",
        status: 0,
      },
      {
        key: '2',
        orderid: "001",
        userid: 'John Brown',
        amount: 32,
        createtime: "2018-01-01",
        status: 1,
      },
      {
        key: '3',
        orderid: "001",
        userid: 'John Brown',
        amount: 32,
        createtime: "2018-01-01",
        status: 2,
      },
    ],
    pagination: {
      total: 100,
      pageSize: 10,
      current: 1,
    },
  },

  'GET /api/client': {
    list: [
      {
        key: '1',
        clientid: "001",
        balance: 32,
        createtime: "2018-01-01",
        communication:"电话 12xxxx",
        status: 0,
      },
      {
        key: '2',
        clientid: "002",
        balance: 32,
        createtime: "2018-01-01",
        communication:"微信 12xxxx",
        status: 2,
      },
      {
        key: '3',
        clientid: "003",
        balance: 32,
        createtime: "2018-01-01",
        communication:"qq 12xxxx",
        status: 1,
      },
    ],
    pagination: {
      total: 100,
      pageSize: 10,
      current: 1,
    },
  },

  'GET /api/account': {
    list: [
      {
        key: '1',
        accountid: "001",
        createtime: "2018-01-01",
        communication:"电话 12xxxx",
        type: 0,
      },
      {
        key: '2',
        accountid: "002",
        createtime: "2018-01-01",
        communication:"微信 12xxxx",
        type: 2,
      },
      {
        key: '3',
        accountid: "003",
        createtime: "2018-01-01",
        communication:"qq 12xxxx",
        type: 1,
      },
    ],
    pagination: {
      total: 100,
      pageSize: 10,
      current: 1,
    },
  },

  'GET /api/log': {
    list: [
      {
        key: '1',
        ID: "001",
        accountid:"xx",
        createtime: "2018-01-01",
        remark:"充值",

      },
      {
        key: '2',
        ID: "002",
        accountid:"xx",
        createtime: "2018-01-01",
        remark:"审核",

      },
      {
        key: '3',
        ID: "003",
        accountid:"xx",
        createtime: "2018-01-01",
        remark:"驳回",

      },
    ],
    pagination: {
      total: 100,
      pageSize: 10,
      current: 1,
    },
  },

  'GET /api/payment': {
    list: [
      {
        key: '1',
        ID: "001",
        clientid:"xx",
        amount:-10,
        balance:110,
        createtime: "2018-01-01",
        remark:"充值",

      },
      {
        key: '2',
        ID: "002",
        clientid:"xx",
        amount:-10,
        balance:110,
        createtime: "2018-01-01",
        remark:"充值",

      },
      {
        key: '3',
        ID: "003",
        clientid:"xx",
        amount:-10,
        balance:110,
        createtime: "2018-01-01",
        remark:"结算",

      },
    ],
    pagination: {
      total: 100,
      pageSize: 10,
      current: 1,
    },
  },

  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};

export default {


  'GET /projectf/api/business/autho/logout': 'http://localhost/',
  'GET /projectf/api/business/autho/currentaccount': 'http://localhost/',
  'POST /projectf/api/business/autho/login': 'http://localhost/',
  'PUT /projectf/api/business/autho/updatepassword': 'http://127.0.0.1/',

  'GET /projectf/api/business/resource/(.*)': 'http://localhost/projectf/api/business/resource',
  'PUT /projectf/api/business/resource/(.*)': 'http://localhost/projectf/api/business/resource',
  'POST /projectf/api/business/resource/(.*)': 'http://localhost/projectf/api/business/resource',
  'DELETE /projectf/api/business/resource/(.*)': 'http://localhost/projectf/api/business/resource',

  
};

//export default (noProxy ? {} : delay(proxy, 1000));
