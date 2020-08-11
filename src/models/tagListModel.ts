const localStorageKeyName = 'tagList';

type TagListModel = {
    data: string[];
    getData: () => string[];
    createData: (data: string) => 'success' | 'duplicated';// 联合类型
    saveData: () => void;
}
const tagListModel: TagListModel = {
    data: [],
    getData() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    createData(name) {
        if (this.data.indexOf(name) >= 0) {
            return 'duplicated'
        }
        this.data.push(name);
        this.saveData();
        return 'success';
    },
    saveData() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};

export default tagListModel;