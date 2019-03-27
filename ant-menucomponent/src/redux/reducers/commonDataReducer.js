/**
 * @author rainci(刘雨熙)
 * @time 2019.3.27
 */
const defaultState = {
    menuData: [],//menu data
}
const commonDataReducer = (state = defaultState, {type, payload = {}}) => {//多个页面公共请求的不变的数据
    switch(type){
        default:
            return state    
    }
}
export default commonDataReducer;