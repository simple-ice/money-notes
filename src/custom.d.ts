type RecordItem = {
    tags: Tag[];
    remark: string;
    type: string;
    amount: number;
    createAt?: string;
    _id: string;
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
    createTagErr: Error | null;
}
// interface Window {
// }