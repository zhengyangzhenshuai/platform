 
const Mock = require('mockjs')
 
// 使用setup配置请求的响应时间，单位是毫秒
Mock.setup({
  // timeout: 1000 // 意味着接口1s后返回
  timeout: '100-500' // 意味这接口响应时间介于200毫秒-1s之间
})
Mock.mock('/list', 'get', {
  code: 0,
  ...{'data|1-10': [{'table': 2}]}
})