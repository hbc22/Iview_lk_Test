import axios from 'axios'
import qs from 'qs'
import config from '@/config'
import isPlainObject from 'lodash/isPlainObject'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

const http = axios.create({
    baseURL: baseUrl,
    timeout: 1000 * 180,
    withCredentials: true
  })

  http.interceptors.request.use(config => {
      console.log('22', config)
      config.headers['Accept-Language'] = Cookies.get('language') || 'zh-CN'
      // 默认参数
      var defaults = {}
      // 防止缓存，GET请求默认带_t参数
        if (config.method === 'get') {
            config.params = {
            ...config.params,
            ...{ '_t22': new Date().getTime() }
            }
        }
        if (isPlainObject(config.params)) {
            config.params = {
              ...defaults,
              ...config.params
            }
          }
          if (isPlainObject(config.data)) {
            config.data = {
              ...defaults,
              ...config.data
            }
            if (/^application\/x-www-form-urlencoded/.test(config.headers['content-type'])) {
              config.data = qs.stringify(config.data)
            }
          }
          return config

  }, error => {
      return Promise.reject(error)
  })
  export default http
