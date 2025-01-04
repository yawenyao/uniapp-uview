<template>
	<view class="mine-page">
		<view class="account-display-area" v-if="userInfo">
			<text class="username">{{ userInfo.name }}</text>
		</view>
		<text v-else>请登录以查看更多信息。</text>
		<view class="info-section-wrapper" v-if="userInfo">
			<view class="info-section">
				<view class="info-title" @tap="showPersonalInfo = !showPersonalInfo">个人信息</view>
				<view class="info-list" v-if="showPersonalInfo">
					<view class="info-item" v-if="userInfo.gender">
						<text class="info-label">性别：</text>
						<text class="info-value">{{ userInfo.gender }}</text>
					</view>
					<view class="info-item" v-if="userInfo.age">
						<text class="info-label">年龄：</text>
						<text class="info-value">{{ userInfo.age }}</text>
					</view>
					<view class="info-item" v-if="userInfo.contact">
						<text class="info-label">性别：</text>
						<text class="info-value">{{ userInfo.contact }}</text>
					</view>
					<view class="info-item" v-if="userInfo.address">
						<text class="info-label">地址：</text>
						<text class="info-value">{{ userInfo.address }}</text>
					</view>
				</view>
				<view class="info-section">
					<view class="info-title" @tap="showEnterpriseInfo = !showEnterpriseInfo">企业信息</view>
					<view class="info-list" v-if="showEnterpriseInfo">
						<view class="info-item" v-if="userInfo.enterpriseName">
							<text class="info-label">企业名称：</text>
							<text class="info-value">{{ userInfo.enterpriseName }}</text>
						</view>
						<view class="info-item" v-if="userInfo.enterpriseAddress">
							<text class="info-label">企业地址：</text>
							<text class="info-value">{{ userInfo.enterpriseAddress }}</text>
						</view>
					</view>
				</view>
				<view class="logout-area">
					<u-button type="sunOrange" @click="showLogoutConfirm">退出登录</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import { mapState } from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		user: {
			name: '张三',
			gender: '男',
			age: 25,
			contact: '13812345678',
			address: '北京市朝阳区',
			enterpriseName: 'ABC 公司',
			enterpriseAddress: '北京市海淀区'
		}
	},
	mutations: {
		updateUser(state, newUser) {
			state.user = newUser;
		}
	},
	actions: {
		// 可添加异步操作更新用户信息的 actions
	},
	getters: {
		// 可添加获取用户信息的 getters
	}
});

export default {
	store,
	data() {
		return {
			showPersonalInfo: false,
			showEnterpriseInfo: false
		};
	},
	computed: {
		userInfo() {
			return this.user;
		},
		...mapState(['user'])
	},
	watch: {
		user(newValue) {
			this.userInfo = newValue;
		}
	},
	methods: {
		fetchUser() {
			// 从 Vuex 中获取用户信息
			this.userInfo = this.user;
		},
		navigateToUsernameEdit() {
			// 跳转到用户名修改页面
			uni.navigateTo({ url: '/pages/usernameEdit/usernameEdit' });
		},
		navigateToGenderEdit() {
			// 跳转到性别修改页面
			uni.navigateTo({ url: '/pages/genderEdit/genderEdit' });
		},
		navigateToAgeEdit() {
			// 跳转到年龄修改页面
			uni.navigateTo({ url: '/pages/ageEdit/ageEdit' });
		},
		navigateToContactEdit() {
			// 跳转到联系方式修改页面
			uni.navigateTo({ url: '/pages/contactEdit/contactEdit' });
		},
		navigateToAddressEdit() {
			// 跳转到地址修改页面
			uni.navigateTo({ url: '/pages/addressEdit/addressEdit' });
		},
		navigateToEnterpriseNameEdit() {
			// 跳转到企业名称修改页面
			uni.navigateTo({ url: '/pages/enterpriseNameEdit/enterpriseNameEdit' });
		},
		navigateToEnterpriseAddressEdit() {
			// 跳转到企业地址修改页面
			uni.navigateTo({ url: '/pages/enterpriseAddressEdit/enterpriseAddressEdit' });
		},
		showLogoutConfirm() {
			uni.showModal({
				title: '确认退出登录',
				content: '确定要退出登录吗？',
				success: (res) => {
					if (res.confirm) {
						this.logout();
					}
				}
			});
		},
		async logout() {
			try {
				// 调用退出登录 API
				await logoutApi();
				// 清除 Vuex 中的用户信息
				this.$store.commit('updateUser', null);
				this.userInfo = null;
				// 可添加其他操作，如提示用户已退出登录
				uni.showToast({
					title: '已退出登录',
					icon: 'none'
				});
			} catch (error) {
				console.error('退出登录异常:', error);
				uni.showToast({
					title: '退出登录失败，请稍后再试',
					icon: 'none'
				});
			}
		}
	},
	created() {
		this.fetchUser();
	}
};
</script>

<style lang="scss">
.mine-page {
  // padding: 20rpx;
  height: 100vh;
  text-align: center;
  background-color: #ecf4ff;

.account-display-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to bottom, #008c8c, #53e3a6);
    padding: 20px 0;
    height: 300rpx;
    // border-radius: 10px;
    margin-bottom: 20rpx;


.username {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
  }

.info-section-wrapper {
    padding: 0 40rpx;

.info-section {
	border-radius: 10px;
    width: 100%;
    margin-bottom: 10px;

.info-title {
	align-content: start;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
    }

.info-list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

.info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      width: 100%;

 .info-label {
        color: #333;
        font-weight: bold;
      }

 .info-value {
        color: #666;
      }
    }
  }

.logout-area {
    width: 100%;

// .logout-button {
//       width: 100%;
//       background-color: red;
//       color: #fff;
//       padding: 10px;
//       border: none;
//       border-radius: 5px;
//       margin-top: 20px;
//     }
  }
}
}
</style>
