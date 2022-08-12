// home模块小仓库
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";
const actions = {
    // 调用api的接口函数，向服务器发送请求
    async categoryList(context) {
        let results = await reqCategoryList();
        context.commit('CATEGORYLIST', results);
    },
    // 获取轮播图数据
    async getBannerList(context) {
        let results = await reqGetBannerList();
        if (results.code === 200) {
            context.commit('GETBANNERLIST', results.data);
        };
    },
    async getFloorList(context) {
        let results = await reqGetFloorList();
        if (results.code === 200) {
            context.commit('GETFLOORLIST', results.data);
        }
    }
};
const mutations = {
    CATEGORYLIST(state, value) {
        state.categoryList = value;
    },
    GETBANNERLIST(state, value) {
        state.bannerList = value;
    },
    GETFLOORLIST(state, value) {
        state.floorList = value;
    }
};
const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
};
const getters = {};
export default {
    actions,
    mutations,
    state,
    getters
}