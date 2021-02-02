import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router';
import store from '@/store'
import {getToken, setToken} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    var res = response.data;
    var code = res.code || res.infoCode;
    if (200 === code) {
      return res;
      // return JSON.parse(JSON.stringify(res).replace(/null/g, "-"));
    } else if (401 === code) {
      Message.error('用户身份已失效!');
      setToken('');
      router.replace('/login')
    } else if (400 === code) {
      Message.error(res.message);
    } else if (code === 404) {
      Message.error('接口找不到，请求异常！');
    } else if (500 === code) {
      Message.error('数据异常，请重试!');
      console.error('请-求-地-址=' + JSON.stringify(response.config.url));
    } else {
      Message.error('服务正在治疗中...');
    }
    return Promise.reject(res);
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
