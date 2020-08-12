<template>
    <Layout>
        <div class="tags">
            <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id"><span>{{tag.name}}</span>
                <Icon name="right"/>
            </router-link>
        </div>
        <div class="createTag">
            <Button @click.native="createTag">新建标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import tagListModel from '@/models/tagListModel';
    import Button from '@/components/Button.vue';

    tagListModel.getData();
    @Component({
        components: {Button}
    })
    export default class Labels extends Vue {
        tags = tagListModel.data;

        createTag() {
            const name = window.prompt('请输入标签名')
            if (name !== null) {
                const tagName = name.trim();
                if (tagName === '') {
                    window.alert('标签名不能为空');
                    return;
                } else {
                    const msg = tagListModel.createData(name);
                    if (msg === 'duplicated'){
                        window.alert('标签不能重复')
                    }else{
                        window.alert('标签创建成功!')
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/helps.scss";

    .tags {
        background: white;
        padding-left: 16px;

        > .tag {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid #e6e6e6;

            svg {
                margin-right: 12px;
            }
        }
    }

    .createTag {
        text-align: center;
        margin-top: 44px;

        > button {
            background: $color-highlight;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            height: 40px;
            padding: 0 16px;
        }
    }
</style>