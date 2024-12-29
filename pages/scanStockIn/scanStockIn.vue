<template>
  <view class="scan-stock-page">
    <view class="scan-section">
      <u-button type="pinkOrange" @click="handleScan">点击扫码</u-button>
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
      <!-- 使用 uni-datetime-picker 组件作为入库时间的选择器 -->
      <view class="form-item">
        <text>入库时间:</text>
        <uni-datetime-picker 
          v-model="stockInTime" 
          type="datetime" 
          @change="handleTimeChange" 
        ></uni-datetime-picker>
      </view>
      <u-button type="primary" @click="saveRecord">入库</u-button>
    </view>
  </view>
</template>

<script>
// 引入 uni-datetime-picker 组件
import { UniDatetimePicker } from '@dcloudio/uni-ui';
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
      // 存储用户选择的入库时间
      stockInTime: ''
    };
  },
  created() {
    // 这里可以添加其他初始化逻辑，如从缓存或本地存储中读取数据等
  },
  methods: {
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
    saveRecord() {
      if (!this.boxCode ||!this.serialNumber ||!this.productName ||!this.declarationNumber ||!this.stockInTime) {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'none'
        });
        return;
      }
      try {
        // 这里添加调用接口保存数据的逻辑，例如
        // await saveStockRecord({
        //   boxCode: this.boxCode,
        //   serialNumber: this.serialNumber,
        //   productName: this.productName,
        //   declarationNumber: this.declarationNumber,
        //   stockInTime: this.stockInTime
        // });
        console.log('要保存的数据:', {
          boxCode: this.boxCode,
          serialNumber: this.serialNumber,
          productName: this.productName,
          declarationNumber: this.declarationNumber,
          stockInTime: this.stockInTime
        });
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
      } catch (error) {
        console.error('保存记录出错:', error);
        uni.showToast({
          title: '入库失败，请检查输入信息或联系管理员后重试',
          icon: 'none'
        });
      }
    },
    // 处理时间选择器的 change 事件
    handleTimeChange(e) {
      this.stockInTime = e.detail.value;
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
</style>