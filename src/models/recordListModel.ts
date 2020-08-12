// localStorage
const localStorageKeyName = 'recordList';
const recordListModel = {
    data: [] as RecordItem[],
    clone(data: RecordItem[] | RecordItem) {
        return JSON.parse(JSON.stringify(data));
    },
    getData() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.data;
    },
    setData() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};

export default recordListModel;