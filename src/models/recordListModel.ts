import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
    data: [] as RecordItem[],

    createData(record: RecordItem) {
        const result = clone(record);
        result.createAt = new Date();
        this.data.push(result);
        this.saveData();
    },
    fetchData() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.data;
    },
    saveData() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};

export default recordListModel;