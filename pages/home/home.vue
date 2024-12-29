<template>
  <view class="home-page">
    <!-- 轮播图区域 -->
    <view class="swiper-section">
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
        <swiper-item class="swiper-item red-bg"></swiper-item>
        <swiper-item class="swiper-item blue-bg"></swiper-item>
        <swiper-item class="swiper-item green-bg"></swiper-item>
      </swiper>
    </view>
    <!-- 菜单区域（功能区） -->
    <view class="menu-section">
      <u-grid :column-num="3">
        <u-grid-item @click="navigateToPage('stockIn')">
          <view class="grid-item-content">
            <image src="../../static/icon/rukuliebiao.png" class="iconSize"></image>
            <text class="grid-item-text">入库管理</text>
          </view>
        </u-grid-item>
        <u-grid-item @click="navigateToPage('stockOut')">
          <view class="grid-item-content">
            <image src="../../static/icon/chukuliebiao.png" class="iconSize"></image>
            <text class="grid-item-text">出库管理</text>
          </view>
        </u-grid-item>
        <u-grid-item @click="navigateToPage('scanStockIn')">
          <view class="grid-item-content">
            <image src="../../static/icon/scanin.png" class="iconSize"></image>
            <text class="grid-item-text">扫码入库</text>
          </view>
        </u-grid-item>
        <u-grid-item @click="navigateToPage('scanStockOut')">
          <view class="grid-item-content">
            <image src="../../static/icon/scanout.png" class="iconSize"></image>
            <text class="grid-item-text">扫码出库</text>
          </view>
        </u-grid-item>
        <u-grid-item @click="navigateToPage('productList')">
          <view class="grid-item-content">
            <image src="../../static/icon/list.png" class="iconSize"></image>
            <text class="grid-item-text">产品列表</text>
          </view>
        </u-grid-item>
        <u-grid-item @click="navigateToPage('mine')">
          <view class="grid-item-content">
            <image src="../../static/icon/shezhi.png" class="iconSize"></image>
            <text class="grid-item-text">个人中心</text>
          </view>
        </u-grid-item>
      </u-grid>
    </view>
    <!-- 个人中心引导区域 -->
  </view>
</template>

<script>
export default {
  methods: {
    navigateToPage(page) {
      switch (page) {
        case'stockIn':
          uni.navigateTo({ url: '/pages/stockInRecord/stockInRecord' });
          break;
        case'stockOut':
          uni.navigateTo({ url: '/pages/stockOutRecord/stockOutRecord' });
          break;
        case'scanStockIn':
          uni.navigateTo({ url: '/pages/scanStockIn/scanStockIn' });
          break;
        case'scanStockOut':
          uni.navigateTo({ url: '/pages/scanStockOut/scanStockOut' });
          break;
        case 'productList':
          uni.navigateTo({ url: '/pages/productList/productList' });
          break;
        case'mine':
          uni.navigateTo({ url: '/pages/mine/mine' });
          break;
        default:
          break;
      }
    },
  }
};
</script>

<style lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

.swiper-section {
    width: 100%;
    height: 30%;
    swiper {
      height: 100%;
    }
.swiper-item {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
    }
.red-bg {
      background-color: #002fa7;
    }
.blue-bg {
      background-color: #f9dc24;
    }
.green-bg {
      background-color: #e85827;
    }
  }

.menu-section {
    width: 95%;
    flex: 2;
    padding: 30px;
    u-grid-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
.grid-item-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
.grid-item-text {
      font-size: 16px;
    }
  }

.personal-section {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
.personal-text {
      font-size: 18px;
    }
  }
 .iconSize {
    width: 35px; // 适当增大图标尺寸
    height: 35px;
    margin-bottom: 10px; // 增加图标和文字之间的间距
  }
}
</style>