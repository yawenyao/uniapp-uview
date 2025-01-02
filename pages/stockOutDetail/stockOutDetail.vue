<template>
	<view class="stock-in-detail-page">
		<view class="detail-item">
			<text>箱码:</text>
			<u-input v-model="boxCode" placeholder="箱码"></u-input>
		</view>
		<view class="detail-item">
			<text>序列号:</text>
			<u-input v-model="serialNumber" placeholder="序列号"></u-input>
		</view>
		<view class="detail-item">
			<text>出库时间:</text>
			<u-input v-model="stockInTime" placeholder="入库时间"></u-input>
		</view>
		<view class="detail-item">
			<text>供应商:</text>
			<u-input v-model="supplier" placeholder="供应商"></u-input>
		</view>
		<view class="button-container">
			<u-button type="primary" @click="saveRecord">保存</u-button>
			<u-button type="error" @click="handleDelete">删除</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			boxCode: '',
			serialNumber: '',
			stockInTime: '',
			supplier: ''
		};
	},
	onLoad(option) {
		this.boxCode = option.boxCode;
		this.serialNumber = option.serialNumber;
		this.stockInTime = option.stockInTime;
		this.supplier = option.supplier;
	},
	methods: {
		async saveRecord() {
			try {
				// 这里添加调用接口保存数据的逻辑，例如 await updateStockInRecord({
				//   boxCode: this.boxCode,
				//   serialNumber: this.serialNumber,
				//   stockInTime: this.stockInTime,
				//   supplier: this.supplier
				// });
				uni.showToast({
					title: '保存成功',
					icon: 'success'
				});
			} catch (error) {
				console.error('保存记录出错:', error);
				uni.showToast({
					title: '保存失败，请稍后再试',
					icon: 'none'
				});
			}
		},
		async handleDelete() {
			uni.showModal({
				title: '确认删除',
				content: '确定要删除该入库记录吗？',
				success: async (res) => {
					if (res.confirm) {
						try {
							// 这里添加调用接口删除数据的逻辑，例如 await deleteStockInRecord(this.boxCode);
							uni.showToast({
								title: '删除成功',
								icon: 'success'
							});
							uni.navigateBack({
								delta: 1 // 返回到上一页（列表页）
							});
						} catch (error) {
							console.error('删除记录出错:', error);
							uni.showToast({
								title: '删除失败，请稍后再试',
								icon: 'none'
							});
						}
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.stock-in-detail-page {
	padding: 20px;

	.detail-item {
		margin-bottom: 10px;
	}

	.button-container {
		display: flex;
		justify-content: space-around;
		margin-top: 20px;
	}
}
</style>
