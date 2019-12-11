import HelloWorld from './common/HelloWorld.vue';

const globalComponents = {
  install(Vue) {
    Vue.component('HelloWorld', HelloWorld);
  },
};

export default globalComponents;
