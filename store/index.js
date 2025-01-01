import Vue from 'vue';
import Vuex from 'vuex';
import {
	ssoLogin
} from '../api/login';
import {
	parseToken
} from '../utils/parseToken.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// 存储状态信息
		user: null,
		token: null
	},
	mutations: {
		// 定义修改状态的方法
		setToken(state, token) {
			state.token = token;
		},
		setUser(state, user) {
			state.token = user;
		}
	},
	actions: {
		async login({
			commit
		}, params) {
			// 登录操作
			try {
				console.log('发送表单到登录接口')
				const res = await ssoLogin(params);
				console.log(res)
				if (res.status === 200) {
					const token = res.data.token;
					const user = parseToken(token);
					console.log(user)
					commit('setToken', token);
					commit('setUser', user);
					uni.setStorageSync('user', user);
					uni.navigateTo({
						url: '/pages/home/home'
					});
				} else {
					uni.showToast({
						title: '登录失败，请检查用户名和密码',
						icon: 'none'
					});
					return;
				}
			} catch (error) {
				console.error('登录接口调用出错：', error);
				uni.showToast({
					title: '网络异常，请稍后再试',
					icon: 'none'
				});
				return;
			} finally {
				// uni.navigateTo({ url: '/pages/home/home' });
			}
		},
		checkLoginStatus({
			commit
		}) {
			const token = uni.getStorageSync('token');
			if (!token) {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			} else {
				// 如果已经登录，可以导航到首页或其他部分页面
				uni.navigateTo({
					url: '/pages/home/home'
				});
			}
		}
	},
	modules: {}
});