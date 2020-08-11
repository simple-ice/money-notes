<template>
    <Layout>
        <div>
            <Icon name="left" />
            <span>编辑标签</span>
        </div>
        <Remark field-name="标签名" placeholder="请输入标签名" />
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import tagListModel from '@/models/tagListModel';
    import Remark from '@/components/Money/Remark.vue';
    @Component({
        components: {Remark}
    })
    export default class EditLabel extends Vue {
        created() {
            const id = this.$route.params.id;
            tagListModel.getData();
            const tags = tagListModel.data;
            const tag = tags.filter(t => t.id === id)[0];
            if (tag) {
                console.log(tag);
            } else {
                this.$router.replace('/404');
            }

        }
    }
</script>

<style lang="scss" scoped>

</style>