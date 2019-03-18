/**
 * 
 * @param {Array} data  tree data
 * @return {Array}
 * @author rainci(刘雨熙)
 * @time 2019.3.18
 */
export const generateList = (() => {//将多层级的数据处理成单层级的数据方法
    let dealData = new Map();
    return function dealDataFn(data = [],flag) {
        if(flag) {//当flag为true时，则说明新流入数据，要从新渲染dealData，此时dealData清空
            dealData = new Map();
        }
        for (let i = 0; i < data.length; i++) {
            const node = data[i],
                tagId = node.tagId;
            dealData.set(tagId, node);
            if (node.children && node.children.length) {
                dealDataFn(node.children);
            }
        }
        return dealData;
    }
})();