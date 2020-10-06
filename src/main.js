import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

//导入方法
import {postRequest} from "./utils/api";
import {postKeyValueRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {initMenu} from "./utils/menus";

Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;


Vue.use(ElementUI);
Vue.config.productionTip = false

//路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next();
  } else {
    //已登陆
    if (window.sessionStorage.getItem("user")) {
      initMenu(router, store);
      next();
    } else {
      //去登陆
      next('/?redirect=' + to.path);
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
