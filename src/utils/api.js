import axios from 'axios'
import { Message } from 'element-ui';

//响应拦截器
axios.interceptors.response.use(success => {
    //业务错误
    if (success.status && success.status == 200 && success.data.status == 500) {
        Message.error({Message: success.data.msg});
        return;
    }
    return success.data;
}, error => {
    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({Message: '服务端出错'});
    } else if (error.response.status == 403) {
        Message.error({Message: '权限不足'})
    } else if (error.response.status == 401) {
        Message.error({Message: '请登录'})
    } else {
        if (error.response.data.msg) {
            Message.error({Message: error.response.data.msg})
        } else {
            Message.error({Message: '未知错误'})
        }
    }
    return;
})


let base = '';

export const postKeyValueRequest = (url, parmas)=>{
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: parmas,
        transformRequest: [function (data) {
            let rlt = '';
            for (let i in data){
                rlt += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
            }
            console.log(rlt);
            return rlt;
        }],
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}
