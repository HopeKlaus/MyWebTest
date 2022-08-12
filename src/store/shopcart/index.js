import { reqShopCartList, deleteShopCartById, updateShopCartCheckedById } from '@/api';
const actions = {
    // 获取购物车列表
    async getShopCartList(context) {
        let results = await reqShopCartList();
        if (results.code == 200) {
            // 这里加 ||[] 是防止购物车为空时，后台返回的数据为空，会导致控制台报错
            context.commit('GETSHOPCARTLIST', results.data[0] || []);
        }

    },
    // 删除购物车列表
    async deleteShopCart(context, skuId) {
        let results = await deleteShopCartById(skuId);
        if (results.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 修改商品选中状态
    async updateCheckById(context, { skuId, isChecked }) {
        let results = await updateShopCartCheckedById(skuId, isChecked);
        if (results.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 删除所有被选中商品
    deleteAllCheckedCart({ dispatch, getters }) {
        let promiseAll = [];
        getters.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteShopCart', item.skuId) : '';
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    },
    // 全选按钮
    updateAllChecked({ dispatch, state }, isChecked) {
        let promiseAll = [];
        state.cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise);
        })
        return Promise.all(promiseAll);
    }
};
const mutations = {
    GETSHOPCARTLIST(state, value) {
        state.cartInfoList = value.cartInfoList || [];
    }
};
const state = {
    cartInfoList: []
};
const getters = {
    cartInfoList(state) {
        return state.cartInfoList || [];
    }
};
export default {
    actions,
    mutations,
    state,
    getters
}