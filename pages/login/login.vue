<template>
	<view class="login-page">
		<u-form ref="form" :rules="rules" :model="formData" class="form-container">
			<u-form-item prop="username">
				<view class="input-wrapper">
					<u-icon name="account" size="18" color="#888"></u-icon>
					<u-input v-model="formData.username" :placeholder="$t('login.username')" class="styled-input"></u-input>
				</view>
			</u-form-item>
			<u-form-item prop="password">
				<view class="input-wrapper">
					<u-icon name="lock" size="18" color="#888"></u-icon>
					<u-input v-model="formData.password" :placeholder="$t('login.password')" type="password" class="styled-input"></u-input>
				</view>
			</u-form-item>
			<u-button type="primary" @click="login" class="styled-button">{{ $t('login.loginBtn') }}</u-button>
		</u-form>
		<!-- 多语言控制按钮部分 -->
		<view class="lang-switch-wrapper">
			<u-icon name="globe" size="20" color="#888" @tap="showBtn"></u-icon>
			<u-popup :show="showLangMenu" class="u-popup">
				<view v-show="showLangMenu" class="lang-menu">
					<u-button type="primary" @click="switchLanguage('zh')" :class="currentLanguage === 'zh' ? 'active-lang' : ''">{{ $t('login.langMenu.zh') }}</u-button>
					<u-button type="primary" @click="switchLanguage('en')" :class="currentLanguage === 'en' ? 'active-lang' : ''">{{ $t('login.langMenu.en') }}</u-button>
				</view>
			</u-popup>
		</view>
	</view>
</template>
<script>
import { mapMutations } from 'vuex';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { ssoLogin } from '@/api/login.js';

export default {
	data() {
		return {
			formData: {
				username: '',
				password: ''
			},
			rules: {
				username: [{ required: true, message: this.$t('login.required', { field: this.$t('login.username') }), trigger: 'blur' }],
				password: [{ required: true, message: this.$t('login.required', { field: this.$t('login.password') }), trigger: 'blur' }]
			},
			showLangMenu: false,
			currentLanguage: 'en'
		};
	},
	methods: {
		switchLanguage(lang) {
			this.$i18n.locale = lang;
			this.showLangMenu = false;
			
		},
		async login() {
			if (this.$refs.form.validate()) {
				const params = {
					...this.formData
				};
				this.$store.dispatch('login', params);
			}
		},
		showBtn() {
			console.log(111);
			this.showLangMenu = !this.showLangMenu;
		}
	}
};
</script>
<style lang="scss">
.login-page {
	background: linear-gradient(to top, #ecf4ff, #d4dde7);
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	// 背景图片样式设置
	.login-bg {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		filter: blur(3px); // 给背景图添加模糊效果，可根据喜好调整模糊度
	}

	.form-container {
		width: 90%; // 适当调整表单宽度，更美观
		height: 100vh;
		align-content: center;
		background-color: rgba(255, 255, 255, 0.8); // 半透明背景色，使其在背景图上更清晰
		border-radius: 10px;
		padding: 30px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // 添加阴影效果
	}

	.input-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		border: none;

		.u-icon {
			margin-right: 10px;
		}

		.styled-input {
			flex: 1;
			font-size: 16px;
			border: none;
			outline: none;
			background-color: transparent;
		}
	}

	// 多语言控制按钮相关样式
	.lang-switch-wrapper {
		position: absolute;
		right: 20px;
		top: 20px;
		z-index: 10;
	}
}
</style>
