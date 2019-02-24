import axios from 'axios'
import api from './config'
function myAxios(ax){
  return new Promise(function (resolve, reject) {
      axios(ax)
      .then((response) => {
          if (response.status === 200) {
              resolve(response.data)
          } else {
              reject({status:response.status})
          }
      })
      .catch((err)=> {
          let {response: {status}} = err;
          reject({status});
      })
  })
}
export default {
  getTableList(){//获取table list data
    return myAxios({
        url: `${api}/tablelist`,
        method: 'get', 
    })
},
}