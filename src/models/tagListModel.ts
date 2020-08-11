const localStorageKeyName = 'tagList';

type Tag = {
    id: string;
    name: string;
}

type TagListModel = {
    data: Tag[];
    getData: () => Tag[];
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
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            return 'duplicated'
        }
        this.data.push({
            id: name,
            name: name
        });
        this.saveData();
        return 'success';
    },
    saveData() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};

export default tagListModel;