<template>
    <Layout>
        <div class="tags">
            <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id">
                <span>{{tag.name}}</span>
                <Icon name="right"/>
            </router-link>
        </div>
        <div class="createTag">
            <Button @click.native="createTag">新建标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import Button from '@/components/Button.vue';
    import {mixins} from 'vue-class-component';
    import {TagHelper} from '@/mixins/TagHelper';

    @Component({
        components: {Button}
    })
    export default class Labels extends mixins(TagHelper) {
        get tags() {
            return this.$store.state.tagList;
        }
        created(){
            this.$store.commit('fetchTags');
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/helps.scss";

    .tags {
        > .tag {
            padding-left: 16px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid #e6e6e6;
            border-radius: 14px;
            background: white;
            margin-top: 5px;
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