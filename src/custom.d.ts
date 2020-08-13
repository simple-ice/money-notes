type RecordItem = {
    tags: string[];
    remark: string;
    type: string;
    amount: number;
    createAt?: Date;
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

interface Window {
    tagList: Tag[];
    findTag: (id: string) => Tag | undefined;
    createTag: (name: string) => void;
    deleteTag: (id: string) => boolean;
    updateTag: TagListModel['updateData']; //跟TagListModel 中的updateData类型完全一样，可以直接复用
    recordList: RecordItem[];
    createRecord: (record: RecordItem) => void;
}