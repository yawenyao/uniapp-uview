<template>
	<view class="stock-in-record-page">
		<view class="search-sort-container">
			<view class="search-container">
				<u-search v-model="searchKey" placeholder="请输入箱码查询" @input="handleSearch" clearable="true" clear-icon-position="right" shape="square"></u-search>
			</view>
		</view>
		<view class="list-container">
			<view v-for="(item, index) in filteredData" :key="index" class="list-item-container" @click="navigateToDetail(item)">
				<view class="list-item">
					<view class="item-top">
						<text class="box-code">{{ item.boxCode }}</text>
					</view>
					<view class="item-bottom">
						<text class="serial-number">序列号: {{ item.serialNumber }}</text>
						<text class="stock-in-time">入库时间: {{ item.stockInTime }}</text>
					</view>
				</view>
			</view>
			<!-- 显示加载更多提示或无更多数据提示 -->
			<view v-if="hasMoreData" class="load-more">加载更多...</view>
			<view v-else-if="total > 0 && originalData.length >= total" class="no-more-data">没有更多数据了</view>
		</view>
	</view>
</template>

<script>
import { getStockInList } from '../../api/stock';

export default {
	data() {
		return {
			originalData: [],
			searchKey: '',
			sortOrder: false, // false 表示正序，true 表示倒序
			page: 1,
			pageSize: 20,
			total: 0 // 存储总数据量
		};
	},
	computed: {
		filteredData() {
			let data = this.originalData;
			// 模糊查询
			if (this.searchKey) {
				data = data.filter((item) => item.boxCode.includes(this.searchKey));
			}
			// 排序
			if (this.sortOrder) {
				data.sort((a, b) => new Date(b.stockInTime) - new Date(a.stockInTime));
			} else {
				data.sort((a, b) => new Date(a.stockInTime) - new Date(b.stockInTime));
			}
			return data;
		},
		hasMoreData() {
			// 根据总数据量和当前数据量判断是否还有更多数据
			return this.total === 0 || this.originalData.length < this.total;
		}
	},
	created() {
		this.loadData();
	},
	methods: {
		handleSearch() {
			// 输入框输入时触发模糊查询，并重置分页和数据
			this.page = 1;
			this.originalData = [];
			this.loadData();
		},
		async navigateToDetail(item) {
			// 点击列表项跳转到入库详情页面
			uni.navigateTo({
				url: `/pages/stockInDetail/stockInDetail?boxCode=${item.boxCode}&serialNumber=${item.serialNumber}&stockInTime=${item.stockInTime}&supplier=${item.supplier}`
			});
		},
		async loadData() {
			try {
				const response = await getStockInList({
					page: this.page,
					pageSize: this.pageSize
				});
				if (response.code === 200) {
					if (response.data && response.data.length > 0) {
						this.originalData = [...this.originalData, ...response.data];
						this.page++;
						// 存储总数据量，假设接口返回的总数据量在 response.total 中
						if (response.total) {
							this.total = response.total;
						}
					} else {
						this.hasMoreData = false;
					}
				} else {
					console.log(response);
				}
			} catch (error) {
				console.error('获取入库记录数据出错:', error);
				uni.showToast({
					title: '获取数据失败，请稍后再试',
					icon: 'none'
				});
			}
		},
		onReachBottom() {
			this.loadData();
		}
	}
};
</script>

<style lang="scss">
.stock-in-record-page {
	padding: 20rpx;

	.search-sort-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15rpx;

		.search-container {
			display: flex;
			align-items: center;
			flex: 1;
			margin-right: 5rpx;

			.u-search {
				flex: 1;
			}
		}

		.sort-container {
			display: flex;
			align-items: center;
		}
	}

	.list-container {
		margin-top: 40rpx;
		border-radius: 7rpx;
		overflow: hidden;

		.list-item-container {
			position: relative;
			display: flex;
			align-items: center;
			padding: 8rpx;
			margin-bottom: 1rpx;
			border-bottom: 2px solid #008c8c;
			transition: background-color 0.3s;

			.list-item {
				flex: 1;

				.item-top {
					font-size: 18px;
					font-weight: bold;
					margin-bottom: 5px;
				}

				.item-bottom {
					display: flex;
					justify-content: space-between;
					font-size: 14px;
					color: #666;
				}
			}
		}

		.load-more {
			text-align: center;
			padding: 10rpx;
			color: #666;
		}

		.no-more-data {
			text-align: center;
			padding: 10rpx;
			color: #666;
		}
	}
}
</style>
