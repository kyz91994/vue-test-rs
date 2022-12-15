import Vue from 'vue';
import App from './App';

import './plugins/element';

import '../src/assets/style/reset.css';


Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});

