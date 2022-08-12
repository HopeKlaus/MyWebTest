import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
import { getToken, setToken, removeToken } from "@/utils/token";
const actions = {
    async getCode(context, value) {
        let results = await reqGetCode(value)
        console.log(results);
        if (results.code == 200) {
            context.commit('GETCODE', results.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    async userRegister(context, value) {
        let results = await reqUserRegister(value);
        if (results.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    async userLogin(context, value) {
        let results = await reqUserLogin(value);
        if (results.code == 200) {
            context.commit('USERLOGIN', results.data);
            setToken(results.data.token);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    async getUserInfo(context) {
        let results = await reqUserInfo();
        if (results.code == 200) {
            context.commit('GETUSERINFO', results.data);
            return 'ok';
        } else {
            return console.log('未登录！');
        }
    },
    async logout(context) {
        let results = await reqLogout();
        if (results.code == 200) {
            context.commit('CLEARDATA');
        } else {
            return Promise.reject(new Error('faile'));
        }
    }
};
const mutations = {
    GETCODE(state, value) {
        state.code = value;
    },
    USERLOGIN(state, value) {
        state.token = value.token;
    },
    GETUSERINFO(state, value) {
        state.userInfo = value;
    },
    CLEARDATA(state) {
        state.token = '';
        state.userInfo = {};
        removeToken();
    }
};
const state = {
    code: '',
    token: getToken(),
    userInfo: {},
};
const getters = {};
export default {
    actions,
    mutations,
    state,
    getters
}