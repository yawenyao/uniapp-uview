<template>
    <view class="home-page">
        <!-- 轮播图区域 -->
        <view class="swiper-section">
            <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" class="swiper-wrapper">
                <swiper-item class="swiper-item red-bg"></swiper-item>
                <swiper-item class="swiper-item green-bg"></swiper-item>
            </swiper>
        </view>
        <!-- 中间功能入口卡片区域 -->
        <view class="menu-section card">
            <u-grid :column-num="3">
                <u-grid-item @click="navigateToPage('stockIn')">
                    <view class="grid-item-content">
                        <image src="../../static/icon/rukuliebiao.png" class="iconSize"></image>
                        <text class="grid-item-text">{{ $t('home.scanStockIn') }}</text>
                    </view>
                </u-grid-item>
                <u-grid-item @click="navigateToPage('stockOut')">
                    <view class="grid-item-content">
                        <image src="../../static/icon/chukuliebiao.png" class="iconSize"></image>
                        <text class="grid-item-text">{{ $t('home.stockOut') }}</text>
                    </view>
                </u-grid-item>
                <u-grid-item @click="navigateToPage('scanStockIn')">
                    <view class="grid-item-content">
                        <image src="../../static/icon/scanin.png" class="iconSize"></image>
                        <text class="grid-item-text">{{ $t('home.scanStockIn') }}</text>
                    </view>
                </u-grid-item>
                <u-grid-item @click="navigateToPage('scanStockOut')">
                    <view class="grid-item-content">
                        <image src="../../static/icon/scanout.png" class="iconSize"></image>
                        <text class="grid-item-text">{{ $t('home.scanStockOut') }}</text>
                    </view>
                </u-grid-item>
                <u-grid-item @click="navigateToPage('productList')">
                    <view class="grid-item-content">
                        <image src="../../static/icon/list.png" class="iconSize"></image>
                        <text class="grid-item-text">{{ $t('home.productList') }}</text>
                    </view>
                </u-grid-item>
            </u-grid>
        </view>
        <!-- 下面个人中心卡片区域 -->
        <view class="menu-section card">
            <u-grid :column-num="3">
                <u-grid-item @click="navigateToPage('mine')">
                    <view class="grid-item-content">
                        <image src="../../static/icon/shezhi.png" class="iconSize"></image>
                        <text class="grid-item-text">{{ $t('home.mine') }}</text>
                    </view>
                </u-grid-item>
            </u-grid>
        </view>
    </view>
</template>
<script>
export default {
	methods: {
		navigateToPage(page) {
			switch (page) {
				case 'stockIn':
					uni.navigateTo({ url: '/pages/stockInRecord/stockInRecord' });
					break;
				case 'stockOut':
					uni.navigateTo({ url: '/pages/stockOutRecord/stockOutRecord' });
					break;
				case 'scanStockIn':
					uni.navigateTo({ url: '/pages/scanStockIn/scanStockIn' });
					break;
				case 'scanStockOut':
					uni.navigateTo({ url: '/pages/scanStockOut/scanStockOut' });
					break;
				case 'productList':
					uni.navigateTo({ url: '/pages/productList/productList' });
					break;
				case 'mine':
					uni.navigateTo({ url: '/pages/mine/mine' });
					break;
				default:
					break;
			}
		}
	}
};
</script>

<style lang="scss">
.home-page {
	display: flex;
	background-color: #ecf4ff;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	padding: 0 15px; // 给整个页面左右添加内边距，使卡片与屏幕边缘有间距
}

.swiper-section {
	width: 100%;
	height: 200px; // 调整轮播图区域高度，使其更矮一些
	border-radius: 10px; // 设置轮播图区域整体圆角
	overflow: hidden; // 隐藏超出圆角部分的内容，保证圆角效果
	margin-bottom: 28rpx; // 和下方卡片添加一定间距
	margin-top: 20rpx;
	swiper {
		height: 100%;
		.swiper-item {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24px;
			border-radius: 10px; // 设置每个轮播项自身的圆角
		}
	}
	.red-bg {
		background-color: #f9dc24;
	}
	.green-bg {
		background-color: #e85827;
	}
}

/* 通用卡片样式 */
.card {
	border-radius: 10px; // 设置卡片圆角
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); // 添加阴影效果，营造卡片立体感
	width: 100%;
	margin-bottom: 30rpx;
	margin-left: 40rpx;
	margin-right: 40rpx;
	background-color: #fff; // 设置卡片背景色为白色
}

.menu-section {
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
		padding: 18px;
	}
	.grid-item-text {
		font-size: 16px;
	}
}

.personal-section {
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
		padding: 10rpx;
	}
	.grid-item-text {
		font-size: 14px;
	}
}

.iconSize {
	width: 50rpx; // 适当增大图标尺寸
	height: 50rpx;
	margin-bottom: 10rpx; // 增加图标和文字之间的间距
}
</style>
