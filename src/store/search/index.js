import { reqSearchList } from "@/api";
// search模块小仓库
const actions = {
    async getSearchList(context, value) {
        let results = await reqSearchList(value);
        if (results.code === 200) {
            context.commit('GETSEARCHLIST', results);
        }
    }
};
const mutations = {
    GETSEARCHLIST(state, value) {
        state.searchList = value.data;
    }
};
const state = {
    searchList: {}
};
// 简化数据
const getters = {
    // 这里的state指的是当前小仓库的数据
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList;
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    }
};
export default {
    actions,
    mutations,
    state,
    getters
}