/**
 * 
 *  @param {Object} reducers
 *  @returns {Function}
 */
export default function combineReducers(reducers) {
    const reducerKeys = Object.keys(reducers)//eq:[reducerA,reducerB]
    const finalReducers = {}
    for (let i = 0; i < reducerKeys.length; i++) {
        const key = reducerKeys[i]
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key]
        }
    }
    const finalReducerKeys = Object.keys(finalReducers)

    return function combination(state = {}, action) {//返回新的reducer函数
        let hasChanged = false
        const nextState = {}//新reducer执行后的state
        for (let i = 0; i < finalReducerKeys.length; i++) {
            const key = finalReducerKeys[i]
            const reducer = finalReducers[key]//每个reducer
            const previousStateForKey = state[key]//对应的preState
            const nextStateForKey = reducer(previousStateForKey, action)//执行每个reducer,返回新的state
            
            nextState[key] = nextStateForKey//将每个reducer执行的state放在nextState中

            hasChanged = hasChanged || nextStateForKey !== previousStateForKey
        }
        return hasChanged ? nextState : state
    }
}