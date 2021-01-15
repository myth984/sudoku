import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    data: {
        curIndex: "1"
    }
}).$mount('#app')