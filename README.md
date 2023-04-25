# platform

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

```
本项目中，接口采用的是Mockjs，使用本地mock数据对功能进行测试
按需已经实现题二功能，可以执行本代码进行测试
```

```
方案设计，前端使用vue2 + router + axios进行操作，考虑到只有两个页面，所以并没有使用传统中后台的双栏布局
而是直接进行页面的展示
接口使用的是Mockjs进行本地数据的mock
题二功能有一些地方需要再次确认，例如合并项的通过和拒绝是怎么传值的，那些接口更新了需要更新detail和tablelist接口等
这些都是需要和相应的产品侧或者业务方进行沟通
```
