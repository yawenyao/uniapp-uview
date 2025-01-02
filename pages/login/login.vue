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
import { ssoLogin } from '@/api/login.js';
import store from '@/store'; // 引入 Vuex store
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
    async login() {
      if (this.$refs.form.validate()) {
        const params = {
                ...this.formData,
              };
        store.dispatch('login', params)
      }
    }
  }
};
</script>

<style lang="scss">
.login-page {
  padding: 20px;
  background-color: #fff;
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
      margin-right: 10rpx;
    }
  }
}
</style>