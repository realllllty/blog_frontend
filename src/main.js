import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import VueKinesis from 'vue-kinesis';
import VWave from 'v-wave';
import router from './router/index';
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { md3 } from 'vuetify/blueprints';
import pinia from './stores/index.js';

//自定义指令
import { loading } from './directives/loading';

const vuetify = createVuetify({
  components,
  directives,
  blueprint: md3,
});

const app = createApp(App);
app.use(VueKinesis);
app.use(VWave, {
  initialOpacity: 0.5,
  duration: 0.5,
  easing: 'ease-in',
});
app.use(router);
app.use(pinia);

app.use(vuetify); //引入Vuetify插件
app.directive('loading', loading); //注册自定义指令
app.mount('#app');
