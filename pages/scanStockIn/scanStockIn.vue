<template>
	<view class="scan-stock-page">
		<view class="scan-section">
			<u-button type="pinkOrange" @click="handleScan">
				请扫描箱码
				<u-icon name="scan" color="#fff" size="24"></u-icon>
			</u-button>
		</view>
		<view class="form-container">
			<view class="form-item">
				<text>箱码:</text>
				<u-input v-model="boxCode" placeholder="自动填充" disabled />
			</view>
			<view class="form-item">
				<text>序列号:</text>
				<u-input v-model="serialNumber" placeholder="自动填充" disabled />
			</view>
			<view class="form-item">
				<text>产品名称:</text>
				<u-input v-model="productName" placeholder="自动填充" disabled />
			</view>
			<view class="form-item">
				<text>报关单号:</text>
				<u-input v-model="declarationNumber" placeholder="请输入报关单号"></u-input>
			</view>
			<view class="form-item">
				<text>供应商名称:</text>
				<u-input v-model="supplierName" placeholder="请选择供应商" disabled @tap="showPicker = true" />
				<u-picker :show="showPicker" @confirm="handlePickerConfirm" @cancel="showPicker = false" :columns="formattedColumns" keyName="name"></u-picker>
			</view>
			<view class="form-item">
				<text>入库时间:</text>
				<uni-datetime-picker v-model="stockInTime" type="datetime"></uni-datetime-picker>
			</view>
			<u-button type="primary" @click="saveRecord">入库</u-button>
		</view>
	</view>
</template>

<script>
// 引入 uni-datetime-picker 组件
import { UniDatetimePicker } from '@dcloudio/uni-ui';
// 导入接口函数
import { getSuppliers } from '@/api/supplier.js'; // 根据你的实际文件路径修改

export default {
	components: {
		UniDatetimePicker
	},
	data() {
		return {
			boxCode: '',
			serialNumber: '',
			productName: '',
			declarationNumber: '',
			stockInTime: '',
			showPicker: false,
			supplierName: '',
			supplierId: '',
			columns: []
		};
	},
	computed: {
		formattedColumns() {
			return this.columns;
		}
	},
	created() {
		// 在组件创建时调用接口获取供应商数据
		this.fetchSuppliers();
	},
	methods: {
		fetchSuppliers() {
			getSuppliers({})
				.then((response) => {
					if (response.code === 200) {
						console.log(response.data);
						this.columns = response.data;
					} else {
						console.error('获取供应商数据失败:', response);
						uni.showToast({
							title: '获取供应商数据失败，请检查网络或联系管理员',
							icon: 'none'
						});
					}
				})
				.catch((error) => {
					console.error('请求供应商数据时出错:', error);
					uni.showToast({
						title: '请求供应商数据出错，请检查网络或联系管理员',
						icon: 'none'
					});
				});
		},
		handleScan() {
			uni.scanCode({
				success: (res) => {
					const url = res.result;
					const parts = url.split('/');
					const codeParts = parts[parts.length - 1].split('bc');
					// 解析箱码和序列号
					this.boxCode = 'bc' + codeParts[1].slice(0, -3);
					this.serialNumber = codeParts[1].slice(-3);
					try {
						// 模拟产品详情数据
						this.productName = '示例产品名称';
					} catch (error) {
						console.error('获取产品详情出错:', error);
						uni.showToast({
							title: '获取产品详情失败，请检查相关配置或联系管理员',
							icon: 'none'
						});
					}
				},
				fail: (err) => {
					console.error('扫码失败:', err);
					uni.showToast({
						title: '扫码失败，请确保摄像头权限已开启并稍后再试',
						icon: 'none'
					});
				}
			});
		},
		handlePickerConfirm(e) {
			console.log('Event detail:', e.indexs); // 输出事件详情，以便调试
			console.log('Event detail:', e.value); // 输出事件详情，以便调试
			console.log('Event formattedColumns:', this.formattedColumns[0][e.indexs].id); // 输出事件详情，以便调试
			this.supplierName = this.formattedColumns[0][e.indexs].name;
			this.supplierId = this.formattedColumns[0][e.indexs].id;
			this.showPicker = false;
		},
		saveRecord() {
			if (!this.boxCode || !this.serialNumber || !this.productName || !this.declarationNumber || !this.stockInTime) {
				uni.showToast({
					title: '请填写完整信息',
					icon: 'none'
				});
				return;
			}
			try {
				// 这里添加调用接口保存数据的逻辑，例如
				// 假设 saveStockRecord 是一个用于保存数据的函数
				// await saveStockRecord({
				//   boxCode: this.boxCode,
				//   serialNumber: this.serialNumber,
				//   productName: this.productName,
				//   declarationNumber: this.declarationNumber,
				//   stockInTime: this.stockInTime,
				//   supplierId: this.selectedSupplier.id
				// });
				console.log('要保存的数据:', {
					boxCode: this.boxCode,
					serialNumber: this.serialNumber,
					productName: this.productName,
					declarationNumber: this.declarationNumber,
					stockInTime: this.stockInTime,
					supplierId: this.supplierId
				});
				uni.navigateTo({ url: '/pages/stockInRecord/stockInRecord' });
				uni.showToast({
					title: '入库成功',
					icon: 'success'
				});
				// 清空表单数据
				this.boxCode = '';
				this.serialNumber = '';
				this.productName = '';
				this.declarationNumber = '';
				this.stockInTime = '';
				this.supplierId = '';
			} catch (error) {
				console.error('保存记录出错:', error);
				uni.showToast({
					title: '入库失败，请检查输入信息或联系管理员后重试',
					icon: 'none'
				});
			}
		},
		handleTimeChange(e) {
			// console.log('eerrrrrrr',e.detail)
			// this.stockInTime = e.detail.value;
		}
	},
	watch: {
		supplierId: {
			handler(newVal) {
				if (newVal) {
					// 当 supplierId 发生变化时，更新输入框中的显示
					this.supplierName = newVal.name;
				}
			},
			deep: true
		}
	}
};
</script>

<style lang="scss">
.scan-stock-page {
	padding: 20px;
}
.scan-section {
	margin-bottom: 20px;
}
.form-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.form-item {
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
	width: 100%;
}
.arrow-icon {
	position: absolute;
	right: 10px;
}
.u-picker {
	z-index: 999; // 确保 u-picker 在合适的层级显示
}
</style>
