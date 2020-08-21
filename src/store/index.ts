import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import dayjs from 'dayjs';
Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: [],
        currentTag: undefined,
        createTagErr: null
    } as RootState,
    mutations: {
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        createRecord(state, record: RecordItem) {
            const result: RecordItem = clone(record);
            result.createAt = new Date().toISOString();
            result._id = dayjs().valueOf().toString();
            state.recordList.push(result);
            store.commit('saveRecord');
        },
        saveRecord(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        },
        deleteRecord(state, id: string){
            for (let i = 0; i < state.recordList.length; i++) {
                if (state.recordList[i]._id === id) {
                    state.recordList.splice(i, 1);
                    store.commit('saveRecord');
                    return;
                }
            }
        },
        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
            if (!state.tagList || state.tagList.length === 0) {
                store.commit('createTag', '衣');
                store.commit('createTag', '食');
                store.commit('createTag', '住');
                store.commit('createTag', '行');
            }
        },
        setCurrentTag(state, id: string) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0];
        },
        createTag(state, name: string) {
            state.createTagErr = null;
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                state.createTagErr = new Error('duplicate');
                return;
            }
            const id = createId().toString();
            state.tagList.push({id, name});
            store.commit('saveTags');
        },
        updateTag(state, payload: { id: string; name: string }) {
            const {id, name} = payload;
            const idList = state.tagList.map(item => item.id);
            // 可优化逻辑
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复');
                } else {
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit('saveTags');
                }
            }
        },
        deleteTag(state, id: string) {
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    state.tagList.splice(i, 1);
                    store.commit('saveTags');
                    return;
                }
            }
            window.alert('标签删除失败');
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        }
    }
});
export default store;
