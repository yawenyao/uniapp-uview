// request.js
// 假设你将 token 存储在本地存储中，根据你的实际情况调整
const getToken = () => {
	return uni.getStorageSync('token');
};

// 统一的请求处理函数
export const request = async (config) => {
	const {
		url,
		method,
		data,
		isLogin = false
	} = config;
	let headers = {
		'Content-Type': 'application/json',
		'Cache-Control': 'no-cache',
		'Pragma': 'no-cache',
		'Expires': '0'
	};
	if (!isLogin) {
		const token = getToken();
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}
	}
	try {
		const response = await uni.request({
			url: url,
			method: method,
			data: data,
			header: headers,
			timeout: 10000
		});
		// 处理响应，例如根据状态码进行不同的操作
		if (response.statusCode === 200) {
			return response.data;
		} else {
			throw new Error(`请求失败，状态码为 ${response.statusCode}`);
		}
	} catch (error) {
		// 处理错误，例如网络错误、请求超时等
		console.error('请求错误:', error);
		throw error;
	}
};