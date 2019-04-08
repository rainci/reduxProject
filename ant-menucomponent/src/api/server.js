import axios from 'axios'
import api from './config'
import {message} from 'antd';
function myAxios(ax) {
    return new Promise(function (resolve, reject) {
        axios(ax)
        .then((response) => {
            // console.log('axios success：',response)
            let {status, data={} } = response;
            if (status === 200) {
                let { code, msg } = data;
                if(code === '1010013' || code === '1010006' || code === '1010009'){
                    msg = code === '1010013'? '登录失效，请重新登录' : msg;
                    message.error( msg,1,()=>{
                        console.log('mie~')
                        // store.dispatch(push('/login'))
                        // window.location.href = '/tablelist'
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
    getMenuData(filter) {//获取menu data
        return myAxios({
            url: `${api}/service/tag/tag/list`,
            method: 'get',
            params: {...filter},
            headers: {
                'Univer-Code': '9ad3a28d05c04502933568d41a29faa0',
                'Univer-token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5YWQzYTI4ZDA1YzA0NTAyOTMzNTY4ZDQxYTI5ZmFhMCIsImlhdCI6MTU1NDcxNzM3Nywic3ViIjoie1widXNlcklkXCI6MTQ4LFwiY29kZVwiOlwiOWFkM2EyOGQwNWMwNDUwMjkzMzU2OGQ0MWEyOWZhYTBcIixcInVzZXJuYW1lXCI6XCJmZWlmZW5nXCIsXCJuaWNrbmFtZVwiOlwiZmVpZmVuZ1wiLFwicGhvbmVcIjpcIjE4NjAwMDA4ODg4XCIsXCJlbWFpbFwiOlwibGl1ZmVpZmVuZ0B1bml2ZXIuYWlcIn0iLCJleHAiOjE1NTQ4MDM3Nzd9.Z1Uup_GT-A1CzOGYYCYep7nRlY-0V1_x35qSHWjJ0ck'
            }
        })
    },
    
}