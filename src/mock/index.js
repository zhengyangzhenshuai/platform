const Mock = require("mockjs");

// 使用setup配置请求的响应时间，单位是毫秒
Mock.setup({
  // timeout: 1000 // 意味着接口1s后返回
  timeout: "300-500", // 意味这接口响应时间介于200毫秒-1s之间
});
Mock.mock("/list", "get", {
  code: 0,
  ...{ "data|10": [{ table: 2 }] },
});
// Mock.mock("/table/list?username=&productLine=&industry=&startTime=&endTime=&pageNum=&pageSize=", "get", {
//   code: 0,
//   ...{
//     "data|10": [{username: Mock.mock('@name'),productLine: "产品线",time: Mock.mock('@time'), userId: Mock.mock('@time'), },],
//     "count|": 300
//   }
// });
Mock.mock("/table/list", "get", {
  code: 0,
  ...{
    "data|10": [{username: Mock.mock('@name'),productLine: "产品线",time: Mock.mock('@time'), userId: Mock.mock('@time'), },],
    "count|": 300
  }
});
Mock.mock("/industry/delete", "post", {
  code: 0
})
Mock.mock("/get/table/list", "get", {
  code: 0,
  ...{
      "data|4": [{
        title: Mock.mock('@title'),
        desc:  Mock.mock('@sentence'),
        userId: Mock.mock('321312'),
        imgs:  Mock.mock('@img'),
        page:  Mock.mock('@img'),
        pageUrl: Mock.mock('@string(70)')
      }],
      "count|": 300
  }
})
Mock.mock("/detail/list", "get", {
  code: 0,
  ...{
    "data|1": [{
      username: Mock.mock('@name'),
      userId: Mock.mock('@number'),
      companyUrl: Mock.mock('@string(20)'),
      power: Mock.mock('@sentence(8)'),
      oneIndustry: Mock.mock('@sentence(4)'),
      twoIndustry: Mock.mock('@sentence(4)'),
      userType: Mock.mock('@string(4)'),
      Annotations: Mock.mock('@sentence(10)')
    }]
  }
})
Mock.mock("/await/choose", "get", {
  code: 0
})
Mock.mock("/approve/choose", "post", {
  code: 0
})
Mock.mock("/reject/choose", "post", {
  code: 0
})
Mock.mock("/reject/account", "post", {
  code: 0
})