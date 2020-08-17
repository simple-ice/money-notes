import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class TagHelper extends Vue{
    createTag() {
        const name = window.prompt('请输入标签名');
        if (name !== null) {
            const tagName = name.trim();
            if (tagName === '') {
                return window.alert('标签名不能为空');
            }else {
                this.$store.commit('createTag', tagName);
                if (this.$store.state.createTagErr){
                    return window.alert('标签名重复');
                }else{
                    window.alert('标签创建成功')
                }
            }
        }
    }
}