import { reqAddressInfo, reqOrderInfo } from "@/api";

const actions = {
    async getAddressInfo(context) {
        let results = await reqAddressInfo();
        if (results.code == 200) {
            context.commit('GETADDRESSINFO', results.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    async getOrderInfo(context) {
        let results = await reqOrderInfo();
        if (results.code == 200) {
            context.commit('GETORDERINFO', results.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    }
};
const mutations = {
    GETADDRESSINFO(state, value) {
        state.addressInfo = value;
    },
    GETORDERINFO(state, value) {
        state.orderInfo = value;
    }
};
const state = {
    addressInfo: [],
    orderInfo: {},
};
const getters = {};
export default {
    actions,
    mutations,
    state,
    getters,
}