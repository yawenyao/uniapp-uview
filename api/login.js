import {
	request
} from '@/utils/request.js';
import config from '@/config.js';
const baseUrl = config.baseUrl;
// login 接口请求函数
export const ssoLogin = async (params) => {
	return await request({
		url: `${baseUrl}/login`,
		method: 'post',
		data: params,
		isLogin: true
	});
};