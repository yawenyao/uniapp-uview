const baseUrl = '你的接口基础地址'; // 替换为实际的接口基础域名，比如 https://api.example.com

// 登录接口请求函数
export const login = async (params) => {
  const token = uni.getStorageSync('token'); // 从本地存储获取 token，假设之前存储过，可根据实际情况调整获取方式
  return await uni.request({
    url: `${baseUrl}/login`, // 假设登录接口路径是 /login，按实际调整
    method: 'POST',
    header: {
      'Authorization': `Bearer ${token}` // 添加 token 到请求头，格式根据后端要求可能有变化
    },
    data: params
  });
};