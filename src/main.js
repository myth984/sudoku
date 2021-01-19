import Vue from 'vue'
import App from './App.vue'
import { Dialog } from 'element-ui';
Vue.use(Dialog);

Vue.config.productionTip = false




new Vue({
    render: h => h(App),
    data: {
        curIndex: "1"
    }
}).$mount('#app')