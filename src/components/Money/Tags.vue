<template>
    <div class="tags">
        <ul class="current">
            <li v-for="tag in dataTags" :key="tag"
                @click="toggle(tag)"
                :class=" {selected: selectedTags.indexOf(tag) >= 0} ">{{tag}}
            </li>
        </ul>
        <div class="newTag">
            <button @click="createTag">新增标签</button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class Tags extends Vue {
        selectedTags: string[] = [];
        @Prop(Array) dataTags: string[] | undefined;

        toggle(tag: string) {
            const index = this.selectedTags.indexOf(tag);
            if (index >= 0) {
                this.selectedTags.splice(index, 1);
            } else {
                this.selectedTags.push(tag);
            }
            this.$emit('update:selected', this.selectedTags);
        }

        createTag() {
            const name = window.prompt('请输入标签名');
            if (name !== null) {
                const tagName = name.trim();
                if (tagName === '') {
                    window.alert('标签名不能为空');
                    return;
                } else if (this.dataTags) {
                    this.$emit('update:dataTags', [...this.dataTags, tagName]);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tags {
        width: 100%;
        font-size: 14px;
        padding: 16px;
        overflow: auto;

        .current {
            display: flex;
            flex-wrap: wrap;

            > li {
                $bg: #D9D9D9;
                background: $bg;
                $h: 24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                padding: 0 16px;
                margin-right: 12px;
                margin-top: 10px;

                &.selected {
                    background: darken($bg, 50%);
                    color: white;
                }
            }

        }

        .newTag {
            padding-top: 16px;

            > button {
                background: transparent;
                border: none;
                border-bottom: 1px solid;
                padding: 0 4px;
                color: #999999;
            }
        }
    }
</style>