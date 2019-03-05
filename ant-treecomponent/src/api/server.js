import axios from 'axios'
import api from './config'
import {message} from 'antd';
function myAxios(ax) {
    return new Promise(function (resolve, reject) {
        axios(ax)
        .then((response) => {
            console.log('axios success：',response)
            let {status, data={} } = response;
            if (status === 200) {
                let { code, msg } = data;
                if(code === '1010013' || code === '1010006' || code === '1010009'){
                    msg = code === '1010013'? '登录失效，请重新登录' : msg;
                    message.error( msg,1,()=>{
                        console.log('mie~')
                        
                        // store.dispatch(push('/login'))
                        window.location.href = '/tablelist'
                    } )
                    return 
                    // this.props.history.push('/login')   
                }
                resolve(data)
            } else {
                reject({status})
            }
        })
        .catch( ( err = {response: {}} ) => {
            console.log('axios error：',JSON.stringify(err))
            if(!Object.keys(err).length){
                err = {response: {}} //当err为{},则为它赋默认值{response: {}}，防止下面结构报错
            }
            let { response: {status, statusText,data={}} } = err;
            reject({status,statusText});
            if(status === 401){
                let { code, msg } = data;
                if(code === '1010006' || code === '1010009' || code === '1010010'){
                    message.error(msg,1,()=>{
                        // store.dispatch(push('/login'))
                        // store.dispatch({type: 'GO_URL', payload : {path: '/login'}})   
                    })
                }
                message.error(msg,1)
                return  
            }
            message.error(statusText)
        })
    })
}
export default {
    getTableList() {//获取table list data
        return myAxios({
            url: `${api}/tablelist`,
            method: 'get',
        })
    },
    getDataSetIdList(filter,page=1){//数据中心数据集列表查询
        return myAxios({
            url: '/service/data/dataset/list',
            method: 'get', 
            params: {...{rows:10,page},...filter},
            headers: {}
        })   
    },
}