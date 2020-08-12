<template>
    <Layout>
        <div class="wrap">
            <div class="navBar">
                <Icon class="leftIcon" name="left"/>
                <span class="title">编辑标签</span>
            </div>
            <div class="inputWrap">
                <InputItem field-name="标签名" placeholder="请输入标签名"/>
            </div>
            <div class="delete">
                <Button>删除标签</Button>
            </div>
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import tagListModel from '@/models/tagListModel';
    import InputItem from '@/components/Money/InputItem.vue';
    import Button from '@/components/Button.vue';

    @Component({
        components: {Button, InputItem}
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
    .wrap {
        width: 100%;
        height: 100%;
        position: relative;

        .navBar {
            min-height: 48px;
            font-size: 16px;
            text-align: center;
            line-height: 48px;
            position: relative;
            background: white;

            > .leftIcon {
                font-size: 24px;
                position: absolute;
                left: 16px;
                top: 50%;
                transform: translateY(-50%);
            }

            > .title {

            }
        }

        .inputWrap {
            margin-top: 8px;
            background: white;
            max-height: 44px;
            line-height: 44px;
        }

        .delete {
            position: absolute;
            bottom: 33px;
            left: 50%;
            transform: translateX(-50%);
        }
    }

</style>