import {
	request
} from '@/utils/request.js';
import config from '@/config.js';

const baseUrl = config.baseUrl;

export const getSuppliers = async (params) => {
	let url = `${baseUrl}/supplier/getSuppliers`;
	if (params) {
		const queryString = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join(
			'&');
		url += `?${queryString}`;
	}
	console.log(`请求的 URL：${url}`, `请求参数：${JSON.stringify(params)}`);
	try {
		return await request({
			url: url,
			method: 'GET'
		});
	} catch (error) {
		console.error('获取供应商信息时出错:', error);
		// 可以根据实际情况添加更多的错误处理逻辑，如显示错误消息给用户等
		throw error;
	}
};