import { getPaymentList } from '../services/api';

export default {
    namespace: 'payment',

    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(getPaymentList, payload);
            yield put({
                type: 'save',
                payload: response,
            });
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
