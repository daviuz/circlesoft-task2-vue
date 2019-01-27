import Vue from "vue";
/* eslint-disable */
import {
  Icon,
  Select,
  Header,
  Container,
  Row,
  Card,
  Col,
  DatePicker,
  Loading
} from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";

Vue.use(Icon);
Vue.use(Select);
Vue.use(Header);
Vue.use(Container);
Vue.use(Row);
Vue.use(Card);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(Loading.directive);

locale.use(lang)

Vue.prototype.$loading = Loading.service;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
  /* eslint-disable */
}).$mount("#app");