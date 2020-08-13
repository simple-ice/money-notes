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

window.tagList = tagListModel.fetchData();
window.findTag = (id) => {
    return window.tagList.filter(t => t.id === id)[0];
};
window.createTag = (name) => {
    const msg = tagListModel.createData(name);
    if (msg === 'duplicated') {
        window.alert('标签不能重复');
    } else {
        window.alert('标签创建成功!');
    }
};
window.updateTag = (id, name) => {
    return tagListModel.updateData(id, name);
};
window.deleteTag = (id) => {
    return tagListModel.deleteData(id);
};
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
