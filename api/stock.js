// getOrders 接口请求函数
import {
	request
} from '@/utils/request.js';
import config from '@/config.js';

const baseUrl = config.baseUrl;

export const getStockInList = async (params) => {
	return await request({
		url: `${baseUrl}/getStockInList`,
		method: 'GET',
		data: params
	});
};
export const getStockOutList = async (params) => {
	return await request({
		url: `${baseUrl}/getStockOutList`,
		method: 'GET',
		data: params
	});
};