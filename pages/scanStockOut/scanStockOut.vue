<template>
  <view class="scan-stock-page">
    <view class="scan-section">
      <u-button @click="handleScan">点击扫码</u-button>
    </view>
    <view class="form-container">
      <view class="form-item">
        <text>箱码:</text>
        <u-input v-model="boxCode" placeholder="自动填充"></u-input>
      </view>
      <view class="form-item">
        <text>序列号:</text>
        <u-input v-model="serialNumber" placeholder="自动填充"></u-input>
      </view>
      <view class="form-item">
        <text>产品名称:</text>
        <u-input v-model="productName" placeholder="自动填充"></u-input>
      </view>
      <view class="form-item">
        <text>入库时间:</text>
        <u-datetime-picker
          v-model="stockInTime"
          :show="showDateTimePicker"
          @confirm="onDateTimeConfirm"
          @cancel="showDateTimePicker = false"
        ></u-datetime-picker>
        <u-button @click="showDateTimePicker = true">选择入库时间</u-button>
      </view>
      <view class="form-item">
        <text>供应商:</text>
          <u-picker :show="show" ref="uPicker" :columns="mockSupplierData" @confirm="confirm" @change="changeHandler"></u-picker>

        </u-picker>
      </view>
      <u-button @click="saveRecord">入库</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      boxCode: '',
      serialNumber: '',
      productName: '',
      stockInTime: '',
      selectedSupplierIndex: -1,
      selectedSupplier: '',
      showDateTimePicker: false,
      showSupplierPicker: false,
      supplierList: []
    };
  },
  async created() {
    try {
      const mockSupplierData = [
        { id: 1, name: '供应商 A' },
        { id: 2, name: '供应商 B' },
        { id: 3, name: '供应商 C' }
      ];
      this.supplierList = mockSupplierData;
    } catch (error) {
      console.error('获取供应商数据出错:', error);
      uni.showToast({
        title: '获取供应商数据失败，请稍后再试',
        icon: 'none'
      });
    }
  },
  methods: {
    async handleScan() {
      uni.scanCode({
        success: async (res) => {
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
              title: '获取产品详情失败，请稍后再试',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          console.error('扫码失败:', err);
          uni.showToast({
            title: '扫码失败，请稍后再试',
            icon: 'none'
          });
        }
      });
    },
	changeHandler(e) {
	                const {
	                    columnIndex,
	                    value,
	                    values, // values为当前变化列的数组内容
	                    index,
						// 微信小程序无法将picker实例传出来，只能通过ref操作
	                    picker = this.$refs.uPicker
	                } = e
	                // 当第一列值发生变化时，变化第二列(后一列)对应的选项
	                if (columnIndex === 0) {
	                    // picker为选择器this实例，变化第二列对应的选项
	                    picker.setColumnValues(1, this.columnData[index])
	                }
	            },
				// 回调参数为包含columnIndex、value、values
				confirm(e) {
	                console.log('confirm', e)
	                this.show = false
				},
    onDateTimeConfirm(e) {
      if (e.detail && e.detail.value) {
        this.stockInTime = e.detail.value;
      }
      this.showDateTimePicker = false;
    },
    onSupplierConfirm(e) {
      const selected = e.detail.value;
      this.selectedSupplierIndex = selected;
      this.selectedSupplier = this.supplierList[selected].name;
      this.showSupplierPicker = false;
    },
    async saveRecord() {
      if (!this.boxCode || !this.serialNumber || !this.productName || !this.stockInTime || this.selectedSupplierIndex === -1) {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'none'
        });
        return;
      }
      try {
        // 这里添加调用接口保存数据的逻辑，例如 await saveStockRecord({
        //   boxCode: this.boxCode,
        //   serialNumber: this.serialNumber,
        //   productName: this.productName,
        //   stockInTime: this.stockInTime,
        //   supplier: this.selectedSupplier
        // });
        uni.showToast({
          title: '入库成功',
          icon: 'success'
        });
        // 清空表单数据
        this.boxCode = '';
        this.serialNumber = '';
        this.productName = '';
        this.stockInTime = '';
        this.selectedSupplierIndex = -1;
        this.selectedSupplier = '';
      } catch (error) {
        console.error('保存记录出错:', error);
        uni.showToast({
          title: '入库失败，请稍后再试',
          icon: 'none'
        });
      }
    }
  }
};
</script>

<style lang="scss">
.scan-stock-page {
  padding: 20px;

.scan-section {
    margin-bottom: 20px;
  }

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;

.form-item {
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
}
</style>