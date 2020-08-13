import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {
    // record store
    recordList: recordListModel.fetchData(),
    createRecord: (record: RecordItem) => recordListModel.createData(record),
    // tag store
    tagList: tagListModel.fetchData(),
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];
    },
    createTag: (name: string) => {
        const msg = tagListModel.createData(name);
        if (msg === 'duplicated') {
            window.alert('标签不能重复');
        } else {
            window.alert('标签创建成功!');
        }
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.updateData(id, name);
    },
    deleteTag: (id: string) => {
        return tagListModel.deleteData(id);
    }
};

export default store;