type RecordItem = {
    tags: Tag[];
    remark: string;
    type: string;
    amount: number;
    createAt?: string;
}

type Tag = {
    id: string;
    name: string;
}

type TagListModel = {
    data: Tag[];
    fetchData: () => Tag[];
    createData: (data: string) => 'success' | 'duplicated';// 联合类型
    updateData: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
    saveData: () => void;
    deleteData: (id: string) => boolean;
}

type RootState = {
    recordList: RecordItem[];
    tagList: Tag[];
    currentTag?: Tag;
}
// interface Window {
// }