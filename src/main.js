import Vue from 'vue'
import App from './App.vue'
import { http } from './internet/http'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './mock/index'

Vue.config.productionTip = false
Vue.prototype.$http = instance

Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

