<template>
  <view class="login-page">
    <u-form ref="form" :rules="rules" :model="formData">
      <u-form-item prop="username">
        <view class="input-wrapper">
          <u-icon name="account" size="18"></u-icon>
          <u-input v-model="formData.username" placeholder="请输入用户名"></u-input>
        </view>
      </u-form-item>
      <u-form-item prop="password">
        <view class="input-wrapper">
          <u-icon name="lock" size="18"></u-icon>
          <u-input v-model="formData.password" placeholder="请输入密码" type="password"></u-input>
        </view>
      </u-form-item>
      <u-button type="primary" @click="login">登录</u-button>
    </u-form>
  </view>
</template>

<script>
import { mapMutations } from 'vuex';
import { login as apiLogin } from '@/api/login.js';

export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
 ...mapMutations(['setToken']),
    async login() {
      if (this.$refs.form.validate()) {
        const { username, password } = this.formData;
        try {
          const res = await apiLogin({ username, password });
          if (res.data && res.data.success) {
            const token = res.data.token;
            this.setToken(token);
            const userInfo = res.data.userInfo;
            uni.setStorageSync('userInfo', userInfo);
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
          // 修改为 switchTab 方法跳转到入库记录页面（假设是 tabBar 页面）
          uni.navigateTo({ url: '/pages/home/home' });
        }
      }
    }
  }
};
</script>

<style lang="scss">
.login-page {
  padding: 20px;
  background-color: #f8f8f8;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

.u-form {
    width: 90%;
  }

.u-form-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

 .input-wrapper {
      width: 100%; // 修改为 100% 以匹配 u-form-item 的宽度
      display: flex;
      align-items: center;
    }

 .u-icon {
      margin-right: 10px;
    }
  }
}
</style>