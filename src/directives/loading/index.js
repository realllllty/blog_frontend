//实现loading组件的插入和销毁
import { createApp } from 'vue';
import Loading from './index.vue';

// 引入Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

//指令的定义对象
export const loading = {
  mounted(el, binding) {
    //绑定元素的父组件以及他自己所有子节点都被挂载后调用
    const app = createApp(Loading);
    app.use(vuetify);
    const instance = app.mount(document.createElement('div'));
    el.instance = instance; //通过访问el.instance访问Vue应用实例
    // el.style.position = 'relative';
    if (binding.value) {
      appendEl(el);
    }
  },
  updated(el, binding) {
    //绑定元素的父组件以及他自己所有子节点都更新后调用
    if (binding.value !== binding.oldValue) {
      binding.value ? appendEl(el) : removeEl(el);
    }
  },
};

const appendEl = (el) => {
  el.appendChild(el.instance.$el);
};

const removeEl = (el) => {
  el.removeChild(el.instance.$el);
};

export default loading;
