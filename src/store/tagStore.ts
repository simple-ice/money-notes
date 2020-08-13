import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';
const tagStore = {
    tagList: [] as Tag[],
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];
    },
    fetchTags() {
        this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.tagList;
    },
    createTag(name: string) {
        const tagName = name.trim();
        if (tagName === '') {
            window.alert('标签名不能为空');
            return 'not found';
        } else {
            const names = this.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签不能重复');
                return 'duplicated';
            }
            const id = createId().toString();
            this.tagList.push({id, name});
            this.saveTags();
            window.alert('标签创建成功!');
            return 'success';
        }
    },
    updateTag(id: string, name: string) {
        const idList = this.tagList.map(item => item.id);
        // 可优化逻辑
        if (idList.indexOf(id) >= 0) {
            const names = this.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                const tag = this.tagList.filter(item => item.id === id)[0];
                tag.name = name;
                this.saveTags();
                return 'success';
            }
        } else {
            return 'not found';
        }
    },
    deleteTag(id: string) {
        for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].id === id) {
                this.tagList.splice(i, 1);
                this.saveTags();
                return true;
            }
        }
        return false;
    },
    saveTags() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
    }
};
tagStore.fetchTags();
export default tagStore;