import axios from 'axios'
let instance = axios.create({
  timeout: 150000
})
instance.interceptors.request.use(config => {
  // get 请求
  if (config.method !== 'post') return config

  if (config.postType === 'form') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  } else {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  }
  // do something
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})


// http response 拦截器
instance.interceptors.response.use(response => {
  const { data } = response
  // do something
  return data
}, (error) => {
  if (error.request) {
    return Promise.reject('请求无响应！')
  } else {
    return Promise.reject('异常错误，请稍后重试！')
  }
})

export const http = instance

