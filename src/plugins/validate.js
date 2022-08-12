// 表单验证插件
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Vue.use(VeeValidate);

VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}`
    },
    attributes: {
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '密码不一致，请重新输入',
        isAgree: '协议'
    }
});

VeeValidate.Validator.extend('isAgree', {
    validate: (value) => {
        return value;
    },
    getMessage: (field) => field + '必须同意',
})