import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordStore = {
    recordList: [] as RecordItem[],
    fetchRecords() {
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.recordList;
    },
    createRecord(record: RecordItem) {
        const result = clone(record);
        result.createAt = new Date();
        this.recordList.push(result);
        this.saveRecord();
    },
    saveRecord() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    }
};
recordStore.fetchRecords();
export default recordStore;
