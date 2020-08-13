import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';


const tagListModel: TagListModel = {
    data: [],
    getData() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    createData(name) {
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            return 'duplicated';
        }
        const id = createId().toString();
        this.data.push({id, name});
        this.saveData();
        return 'success';
    },
    updateData(id, name) {
        const idList = this.data.map(item => item.id);
        // 可优化逻辑
        if (idList.indexOf(id) >= 0) {
            const names = this.data.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                const tag = this.data.filter(item => item.id === id)[0];
                tag.id = tag.name = name;
                this.saveData();
                return 'success';
            }
        } else {
            return 'not found';
        }
    },
    deleteData(id) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                this.data.splice(i, 1);
                this.saveData();
                return true;
            }
        }
        return false;
    },
    saveData() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};

export default tagListModel;