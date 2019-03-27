/**
 * 
 * @param {Function} reducer 
 * @param {any} preloadedState 
 * @param {any} enhancer 
 * @returns {Object}
 */
export default function createStore(reducer, preloadedState, enhancer) {
    let currentReducer = reducer
    let currentState = preloadedState
    let currentListeners = []
    let nextListeners = currentListeners
    function ensureCanMutateNextListeners() {//将nextListeners和currentListeners断开指针关系
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice()
        }
    }

    function getState() {//获取变量currentState
        return currentState
    }
    function subscribe(listener) {//将nextListeners添加回调函数
        ensureCanMutateNextListeners()
        nextListeners.push(listener)
        return function unsubscribe() {//返回函数去掉当前传入的listener
            ensureCanMutateNextListeners()
            const index = nextListeners.indexOf(listener)
            nextListeners.splice(index, 1)
        }
    }
    function dispatch(action) {//触发dispatch函数
        try {
            currentState = currentReducer(currentState, action)//执行reducer函数,生成新的state
        } finally {
        }
        const listeners = (currentListeners = nextListeners)//将subscribe进来的回调函数,一个一个都执行
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i]
            listener()
        }
        return action//返回传入的action
    }
    function replaceReducer(nextReducer) {
        currentReducer = nextReducer
        dispatch({ type: ActionTypes.REPLACE })
    }
    dispatch({ type: ActionTypes.INIT })
    return {
        dispatch,
        subscribe,
        getState,
        replaceReducer,
        [$$observable]: observable
    }
}