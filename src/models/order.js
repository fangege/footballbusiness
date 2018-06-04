import { getOrderList,createOrder,confirmOrder } from '../services/api';
import {ENUMS} from '../utils/enums'
import { routerRedux } from 'dva/router';
import {optSucessNotify,optFailedNotify} from '../utils/notify'


export default {
    namespace: 'order',

    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(getOrderList, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },

        *create({payload},{call,put}){
            const response = yield call(createOrder, payload);
            if(response.code==ENUMS.ErrCode.Success){
                optSucessNotify("操作成功");
                yield put({
                    type: 'reload',
                });
            }else{
                optFailedNotify("操作失败："+response.message)
            }
        },

        *update({payload},{call,put}){
            const response = yield call(updateOrder, payload);
            if(response.code==ENUMS.ErrCode.Success){
                optSucessNotify("操作成功");
                yield put({
                    type: 'reload',
                });
            }else{
                optFailedNotify("操作失败："+response.message)
            }
        },


        *confirm({payload},{call,put}){
            const response = yield call(confirmOrder, payload);
            if(response.code==ENUMS.ErrCode.Success){
                optSucessNotify("操作成功");
                yield put({
                    type: 'reload',
                });
            }else{
                optFailedNotify("操作失败："+response.message)
            }
        },



        *reload(_,{put,select}){
            const pagination = yield select(state => state.order.data.pagination);
            let payload = {
                page:pagination.current,
                count:pagination.pageSize
            }
            yield put({
                type: 'fetch',
                payload,
            })
        }

    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                data: action.payload,
            };
        },
    },
};
