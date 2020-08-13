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
    import Button from '@/components/Button.vue';
    import store from '@/store/index2';

    @Component({
        components: {Button}
    })
    export default class Labels extends Vue {
        tags = store.tagList;

        createTag() {
            const name = window.prompt('请输入标签名')
            if (name !== null) {store.createTag(name);}
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
    }
</style>