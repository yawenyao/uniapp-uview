import Mock from 'mockjs';
if (process.env.NODE_ENV === 'development') {
	Mock.mock(/^http:\/\/192\.168\.31\.156:9000\/beef-api\/supplier\/getSuppliers(\?.*)?$/, 'get', (options) => {
		console.log('Mock.js 拦截了 /supplier/getSuppliers 请求', options);
		const suppliers = [];
		for (let i = 0; i < 10; i++) {
			suppliers.push({
				id: Mock.Random.id(),
				name: Mock.Random.cname(),
				address: Mock.Random.county(true),
				contact: Mock.Random.name(),
				phone: Mock.Random.integer(10000000000, 99999999999)
			});
		}
		console.log('Mock.js 生成的模拟数据:', suppliers);
		return {
			code: 200,
			data: suppliers
		};
	});
	console.log('Mock.js 已启用供应商接口的模拟');
	// 拦截 POST 请求
	console.log(1111)
	Mock.mock('http://192.168.31.156:9000/beef-api/login', 'post', (options) => {
		console.log('Mock.js 拦截了 /login 请求', options);
		// 模拟用户信息
		const user = {
			id: Mock.Random.id(),
			username: Mock.Random.cname(),
			email: Mock.Random.email(),
			role: Mock.Random.pick(['admin', 'user', 'guest'])
		};
		// 模拟JWT的Payload部分
		const payload = {
			...user,
			iat: Math.floor(Date.now() / 1000), // 签发时间
			exp: Math.floor(Date.now() / 1000) + 3600, // 过期时间，这里设置为1小时后
		};
		// 模拟JWT的Header部分
		const header = {
			alg: 'HS256', // 签名算法
			typ: 'JWT', // 类型
		};
		// 将Header和Payload转换为Base64Url编码的字符串
		const base64UrlHeader = base64UrlEncode(JSON.stringify(header));
		const base64UrlPayload = base64UrlEncode(JSON.stringify(payload));
		// 模拟签名过程，实际应用中需要使用密钥进行签名
		const signature = 'mock-signature'; // 这里使用一个固定的字符串作为签名
		// 构造JWT
		const token = `${base64UrlHeader}.${base64UrlPayload}.${signature}`;
		return {
			status: 200,
			data: {
				token: token
			}
		};
		console.log('Mock.js 生成的模拟数据 token  :', token);
	});
	console.log('import Mock from mockjs....');
	// 拦截 GET 请求
	Mock.mock(RegExp('^http://192\\.168\\.31\\.156:9000/beef-api/getStockInList(\\?.*)?$'), 'get', (options) => {
		// ...
		try {
			// 解析URL参数
			const params = new URLSearchParams(options.url.split('?')[1] || '');
			const page = params.get('page') || 1;
			const pageSize = params.get('pageSize') || 20;
			const total = 50;
			const data = [];
			for (let i = (page - 1) * pageSize; i < page * pageSize; i++) {
				data.push({
					'boxCode': Mock.mock('@string("number", 20)'),
					'serialNumber': Mock.mock('@string("number", 6)'),
					'stockInTime': Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
					'supplier': Mock.mock('@string("cword", 3, 10)')
				});
			}
			return {
				code: 200,
				data,
				total
			};
		} catch (error) {
			console.error('生成 getStockInList 模拟数据出错:', error);
			return null;
		}
	});

	console.log('Mock.js 已启用登录接口的模拟');
}
// Base64Url编码函数，用于将字符串转换为Base64Url编码
function base64UrlEncode(str) {
	return Buffer.from(str).toString('base64')
		.replace(/\+/g, '-') // 将+替换为-
		.replace(/\//g, '_') // 将/替换为_
		.replace(/=+$/, ''); // 去掉末尾的=
}