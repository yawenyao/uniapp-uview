<template>
  <view class="mine-page">
    <text v-if="userInfo">欢迎回来，{{ userInfo.name }}！</text>
    <text v-else>请登录以查看更多信息。</text>
  </view>
</template>

<script>
import store from '@/store'; // 引入Vuex store
import { mapState } from 'vuex';

export default {
  data() {
    return {
      userInfo: null // 假设用户信息将被存储在这里
    };
  },
  computed: {
    ...mapState(['user']) // 映射user状态
  },
  watch: {
    // 监听 Vuex 中的 user 状态变化
    user(newValue) {
      this.userInfo = newValue;
    }
  },
  methods: {
    fetchUser() {
      const user = uni.getStorageSync('user');
      if (user) {
        this.userInfo = user;
      } else {
        // 如果本地存储中没有用户信息，尝试从 Vuex 获取
        this.userInfo = this.user;
      }
    }
  },
  created() {
    this.fetchUser(); // 在组件创建时获取用户信息
  }
};
</script>

<style lang="scss">
.mine-page {
  padding: 20px;
  text-align: center;
}
</style>