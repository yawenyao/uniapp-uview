<template>
  <view class="stock-in-record-page">
    <view class="search-sort-container">
      <view class="search-container">
        <u-search
          v-model="searchKey"
          placeholder="请输入箱码查询"
          @input="handleSearch"
          clearable="true"
          clear-icon-position="right"
		  shape="square"
        ></u-search>
      </view>
      <!-- <view class="sort-container">
        <u-button
          plain
          @click="sortOrder =!sortOrder"
          :style="{ color: sortOrder? '#333' : '#999' }"
        >
          <u-icon name="arrow-up" :size="20"></u-icon>
          <text>{{ sortOrder? '倒序' : '正序' }}</text>
        </u-button>
      </view> -->
    </view>
    <view class="list-container">
      <view
        v-for="(item, index) in filteredData"
        :key="index"
        class="list-item-container"
        @click="navigateToDetail(item)"
      >
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
  </view>
</template>

<script>
export default {
  data() {
    return {
      originalData: [],
      searchKey: '',
      sortOrder: false, // false 表示正序，true 表示倒序
    };
  },
  computed: {
    filteredData() {
      let data = this.originalData;
      // 模糊查询
      if (this.searchKey) {
        data = data.filter(item => item.boxCode.includes(this.searchKey));
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
    // 模拟从接口获取数据，这里先使用模拟数据，后续可替换为真实接口调用
    try {
      const mockData = [
        { boxCode: 'BC12345678901234567890', serialNumber: 'SN001', stockInTime: '2024-01-01 10:00:00', supplier: 'Supplier A' },
        { boxCode: 'BC23456789012345678901', serialNumber: 'SN002', stockInTime: '2024-01-02 11:00:00', supplier: 'Supplier B' },
        { boxCode: 'BC34567890123456789012', serialNumber: 'SN003', stockInTime: '2024-01-03 12:00:00', supplier: 'Supplier C' },
        { boxCode: 'BC45678901234567890123', serialNumber: 'SN004', stockInTime: '2024-01-04 13:00:00', supplier: 'Supplier D' },
        { boxCode: 'BC56789012345678901234', serialNumber: 'SN005', stockInTime: '2024-01-05 14:00:00', supplier: 'Supplier E' }
      ];
      this.originalData = mockData;
    } catch (error) {
      console.error('获取入库记录数据出错:', error);
      uni.showToast({
        title: '获取数据失败，请稍后再试',
        icon: 'none'
      });
    }
  },
  methods: {
    handleSearch() {
      // 输入框输入时触发模糊查询
    },
    async navigateToDetail(item) {
      // 点击列表项跳转到入库详情页面
      uni.navigateTo({
        url: `/pages/stockInDetail/stockInDetail?boxCode=${item.boxCode}&serialNumber=${item.serialNumber}&stockInTime=${item.stockInTime}&supplier=${item.supplier}`
      });
    },
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
}
</style>