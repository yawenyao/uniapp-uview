<template>
  <view class="app">
    <router-view></router-view>
  </view>
</template>

<script>
	import store from '@/store'; // 引入 Vuex store

export default {
  onLaunch: function() {
    console.log('App Launch');
    // 检查用户是否已经登录，例如通过本地存储的 token 或其他登录状态标志
	// this.checkLoginStatus();
	store.dispatch('checkLoginStatus');
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  },
   methods: {
      checkLoginStatus() {
        const token = uni.getStorageSync('token');
        if (!token) {
          uni.navigateTo({
            url: '/pages/login/login'
          });
        } else {
          // 如果已经登录，可以导航到首页或其他部分页面
          uni.navigateTo({ url: '/pages/home/home' });
        }
      }
    }
};
</script>

<style lang="scss">
// 导入 uview 的样式
@import "~uview-ui/index.scss";
// 修改 u-button 的圆角
::v-deep.u-button {
  border-radius: 20px!important;
  margin: 45rpx 20rpx 14rpx 14rpx!important;
  height: 84rpx!important;
}

// 修改 u-input 的圆角
::v-deep.u-input {
  border-radius: 4rpx!important;
  margin: 8rpx!important;
  border-color: #008c8c!important;
  text-size-adjust: auto!important;
  padding: 15rpx!important;
  border: none!important;
  border-bottom: 1px solid #008c8c!important;
}
// 修改 u-button 不同 type的颜色
::v-deep.u-button--primary {
  background-color: #008c8c!important;
  border-color: #008c8c!important;
  color: white!important;
}

::v-deep.u-button--success {
  background-color: #4cd964!important;
  border-color: #4cd964!important;
  color: white!important;
}

::v-deep.u-button--warning {
  background-color: #f5d700!important;
  border-color: #f5d700!important;
  color: white!important;
}

::v-deep.u-button--error {
  background-color: #f55555!important;
  border-color: #f55555!important;
  color: white!important;
}

::v-deep.u-input__inner {
  border: 2px solid #ccc!important;
  padding: 10px!important;
  font-size: 16px!important;
}
.u-button--pinkOrange{
  background-color: #ff9669!important;
  border-color: #ff9669!important;
  color: white!important;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2)!important;
}
.u-button--sunOrange {
  background-color: #fa8723!important;
  border-color: #fa8723!important;
  color: white!important;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2)!important;
}
/deep/ .uni-datetime-picker {
  border: none !important;
  border-bottom: 1px solid #008c8c !important;
  border-radius: 0 !important;
}
/deep/ .uni-date__x-input{
	padding: 9rpx;
	border: none !important;
	border-bottom: 1px solid #008c8c !important;
	border-radius: 0 !important;
}
/deep/ .uni-calendar-item__weeks-box .uni-calendar-item--checked{
	 border: 0px!important;
	 background: #008c8c!important;
}

/deep/ .uni-datetime-picker-btn-text{
	 color: #008c8c!important;
}
/deep/ .uni-date-x--border{
	 border: none!important;
}
/deep/ .uni-datetime-picker--btn {
  background-color: #008c8c!important; /* 确认按钮背景色 */
  border-radius: 3rpx;
  color: #fff; /* 确认按钮字体颜色 */
  font-family: PingFang SC; /* 字体 */
  font-size: 14px; /* 字体大小 */
  font-weight: 400; /* 字体粗细 */
}
</style>