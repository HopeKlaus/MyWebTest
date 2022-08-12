import { reqGoodList, reqAddOrUpdateShopCar } from "@/api";
// 封装临时游客身份的模块
import { getUUID } from "@/utils/uuid_token";
const actions = {
    async getGoodList(context, value) {
        let results = await reqGoodList(value);
        if (results.code == 200) {
            context.commit('GETGOODLIST', results);
        }
    },
    async addOrUpdateShopCar(context, { skuId, skuNum }) {
        let results = await reqAddOrUpdateShopCar(skuId, skuNum);
        if (results.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    }
};
const mutations = {
    GETGOODLIST(state, value) {
        state.goodList = value.data;
    },

};
const state = {
    goodList: {},
    uuid_token: getUUID(),
};
const getters = {
    categoryView(state) {
        return state.goodList.categoryView || {};
    },
    skuInfo(state) {
        return state.goodList.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodList.spuSaleAttrList || [];
    }
};
export default {
    actions,
    mutations,
    state,
    getters
}