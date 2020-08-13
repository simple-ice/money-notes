import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/views/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

window.tagList = tagListModel.getData();
window.createTag = (name) => {
    const msg = tagListModel.createData(name);
    if (msg === 'duplicated'){
        window.alert('标签不能重复')
    }else{
        window.alert('标签创建成功!')
    }
}
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
