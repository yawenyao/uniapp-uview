import Mock from 'mockjs';

// 模拟 getStockInList 接口数据
Mock.mock(/\/order\/getStockInList/, 'get', (options) => {
    try {
        const { page = 1, pageSize = 10 } = options.url.split('?')[1]
        ? JSON.parse('{"' + options.url.split('?')[1].replace(/&/g, '","').replace(/=/g, '":"') + '"}')
          : {};
        const total = 100;
        const data = [];
        for (let i = (page - 1) * pageSize; i < page * pageSize; i++) {
            data.push({
                'boxCode': Mock.mock('@string("number", 20)'),
                'serialNumber': Mock.mock('@string("number", 6)'),
                'stockInTime': Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
                'supplier': Mock.mock('@string("cword", 3, 10)')
            });
        }
        return {
            data,
            total
        };
    } catch (error) {
        console.error('生成 getStockInList 模拟数据出错:', error);
        return null;
    }
});

// 模拟 getStockOutList 接口数据
Mock.mock(/\/order\/getStockOutList/, 'get', (options) => {
    try {
        const { page = 1, pageSize = 10 } = options.url.split('?')[1]
        ? JSON.parse('{"' + options.url.split('?')[1].replace(/&/g, '","').replace(/=/g, '":"') + '"}')
          : {};
        const total = 100;
        const data = [];
        for (let i = (page - 1) * pageSize; i < page * pageSize; i++) {
            data.push({
                'boxCode': Mock.mock('@string("number", 20)'),
                'serialNumber': Mock.mock('@string("number", 6)'),
                'stockOutTime': Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
                'customer': Mock.mock('@string("cword", 3, 10)')
            });
        }
        return {
            data,
            total
        };
    } catch (error) {
        console.error('生成 getStockOutList 模拟数据出错:', error);
        return null;
    }
});