import {
	request
} from '@/utils/request.js';

const baseUrl = process.env.VUE_APP_BASE_URL;

// saveOrder 接口请求函数
export const saveOrder = async (params) => {
	return await request({
		url: `${baseUrl}/order/saveOrder`,
		method: 'POST',
		data: params
	});
};

// getOrders 接口请求函数
export const getOrders = async (params) => {
	return await request({
		url: `${baseUrl}/order/getOrders`,
		method: 'GET',
		data: params
	});
};

// login 接口请求函数
export const login = async (params) => {
	return await request({
		url: `${baseUrl}/login`,
		method: 'POST',
		data: params,
		isLogin: true
	});
};