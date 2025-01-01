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
		</view>
		<!-- 加载更多的提示信息 -->
		<view v-if="loadingMore" class="loading-more">加载更多...</view>
	</view>
</template>

<script>
import { getStockOutList } from '../../api/stock';
import { request } from '@/utils/request.js';
import Mock from 'mockjs';
const baseUrl = process.env.VUE_APP_BASE_URL;

export default {
	data() {
		return {
			originalData: [],
			searchKey: '',
			sortOrder: false, // false 表示正序，true 表示倒序
			page: 1,
			pageSize: 10,
			loadingMore: false // 控制是否正在加载更多数据
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
		}
	},
	async created() {
		try {
			await this.loadData();
		} catch (error) {
			console.error('获取入库记录数据出错:', error);
			uni.showToast({
				title: '获取数据失败，请稍后再试',
				icon: 'none'
			});
		}
	},
	methods: {
		// 加载数据的函数
		async loadData() {
			// this.loadingMore = true;
			this.originalData = [
				{ boxCode: 'BC12345678901234567890', serialNumber: 'SN001', stockInTime: '2024-01-01 10:00:00', supplier: 'Supplier A' },
				{ boxCode: 'BC23456789012345678901', serialNumber: 'SN002', stockInTime: '2024-01-02 11:00:00', supplier: 'Supplier B' },
				{ boxCode: 'BC34567890123456789012', serialNumber: 'SN003', stockInTime: '2024-01-03 12:00:00', supplier: 'Supplier C' },
				{ boxCode: 'BC45678901234567890123', serialNumber: 'SN004', stockInTime: '2024-01-04 13:00:00', supplier: 'Supplier D' },
				{ boxCode: 'BC56789012345678901234', serialNumber: 'SN005', stockInTime: '2024-01-05 14:00:00', supplier: 'Supplier E' }
			];
			//    getStockOutList().then(res=>{
			//  if(res.status===200){
			//   this.originalData= res.data
			//  }else{
			//  this.originalData =  [
			//     { boxCode: 'BC12345678901234567890', serialNumber: 'SN001', stockInTime: '2024-01-01 10:00:00', supplier: 'Supplier A' },
			//     { boxCode: 'BC23456789012345678901', serialNumber: 'SN002', stockInTime: '2024-01-02 11:00:00', supplier: 'Supplier B' },
			//     { boxCode: 'BC34567890123456789012', serialNumber: 'SN003', stockInTime: '2024-01-03 12:00:00', supplier: 'Supplier C' },
			//     { boxCode: 'BC45678901234567890123', serialNumber: 'SN004', stockInTime: '2024-01-04 13:00:00', supplier: 'Supplier D' },
			//     { boxCode: 'BC56789012345678901234', serialNumber: 'SN005', stockInTime: '2024-01-05 14:00:00', supplier: 'Supplier E' }
			//   ];
			//  }
			// })
		},
		// 获取入库记录列表的接口请求函数
		async getStockInList(params) {
			return await request({
				url: `${baseUrl}/order/getStockInList`,
				method: 'GET',
				data: params
			});
		},
		handleSearch() {
			// 输入框输入时触发模糊查询
		},
		async navigateToDetail(item) {
			// 点击列表项跳转到入库详情页面
			uni.navigateTo({
				url: `/pages/stockOutDetail/stockOutDetail?boxCode=${item.boxCode}&serialNumber=${item.serialNumber}&stockInTime=${item.stockInTime}&supplier=${item.supplier}`
			});
		},
		// 监听页面滚动到底部的事件
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
	}

	.loading-more {
		text-align: center;
		margin-top: 20rpx;
		color: #999;
	}
}
</style>
