let baseUrl;
if (process.env.NODE_ENV === 'development') {
	baseUrl = 'http://localhost:9000/beef-api'; // 开发环境的 API 基础地址
} else {
	baseUrl = 'https://api.example.com'; // 生产环境的 API 基础地址
}

export default {
	baseUrl
};