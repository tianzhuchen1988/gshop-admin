import axios from 'axios'
import {getToken, getRefreshToken} from '@/libs/util'
// import { Spin } from 'iview'
import iView from 'iview'
import store from '@/store'
import router from '@/router'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const token = getToken();
    const config = {
      baseURL: this.baseUrl,
      //每次请求中，都添加token头
      headers: {
        Authorization: 'bearer' + (token ? token : '')
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      this.destroy(url)
      //如果为401状态码时，需要刷新令牌，refresh_token过期后，需重定向到登录页
      if(error.response.status === 401){
        //刷新令牌
        store.dispatch('handleRefreshToken', getRefreshToken()).then(res => {
          error.config.headers.Authorization = 'bearer' + res
          return axios(error.config)
        }).catch(err => {
          //刷新令牌失败时，重定向到登录页
          iView.Message.error("令牌已过期，请重新授权登录")
          store.dispatch('handleLogOut')
          router.replace({name: 'login'})
        })
      }
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
