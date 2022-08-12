import requests from "./request";
import mockRequests from './mockRequest';
// 对api进行集中管理
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });

// 获取banner 轮播图接口
export const reqGetBannerList = () => mockRequests.get('/banner');

// 获取floor 数据接口
export const reqGetFloorList = () => mockRequests.get('/floor');

// 获取搜索页面数据
export const reqSearchList = (params) => requests({
    url: '/list',
    method: 'post',
    data: params
})

// 获取商品详情列表数据
export const reqGoodList = (skuId) => requests.get(`/item/${skuId}`);

// 添加或更新购物车
export const reqAddOrUpdateShopCar = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})

// 获取购物车列表
export const reqShopCartList = () => requests({
    url: '/cart/cartList',
    method: 'get'
})

// 删除购物车
export const deleteShopCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// 更改商品选中状态
export const updateShopCartCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'GET'
})

// 获取验证码
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get',
})

// 注册用户请求
export const reqUserRegister = (data) => requests({
    url: '/user/passport/register',
    data,
    method: 'post'
})

// 用户登录
export const reqUserLogin = (data) => requests({
    url: '/user/passport/login',
    data,
    method: 'post',
})

// 获取用户信息
export const reqUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get',
})

// 退出登录
export const reqLogout = () => requests({
    url: '/user/passport/logout',
    method: 'get',
})

// 获取订单地址信息
export const reqAddressInfo = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})

// 获取订单页面商品信息
export const reqOrderInfo = () => requests({
    url: '/order/auth/trade',
    method: 'get',
})

// 这里不再使用vuex来发请求存储数据 
// 提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
})

// 获取订单支付信息
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
})

// 获取订单支付状态信息
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})

// 获取我的订单信息
export const reqMyOrderList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
})