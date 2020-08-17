<template>
    <div class="tags">
        <ul class="current">
            <li v-for="tag in tagList" :key="tag.id"
                @click="toggle(tag)"
                :class=" {selected: selectedTags.indexOf(tag) >= 0} ">{{tag.name}}
            </li>
        </ul>
        <div class="newTag">
            <button @click="createTag">新增标签</button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component';
    import {TagHelper} from '@/mixins/TagHelper';

    @Component
    export default class Tags extends mixins(TagHelper) {
        selectedTags: Tag[] = [];
        get tagList() {
            return this.$store.state.tagList;
        }
        created(){
            this.$store.commit('fetchTags');
        }
        toggle(tag: Tag) {
            const index = this.selectedTags.indexOf(tag);
            if (index >= 0) {
                this.selectedTags.splice(index, 1);
            } else {
                this.selectedTags.push(tag);
            }
            this.$emit('update:selected', this.selectedTags);
        }

    }
</script>

<style lang="scss" scoped>
    .tags {
        width: 100%;
        font-size: 14px;
        padding: 16px;
        overflow: auto;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        flex-grow: 1;
        .current {
            display: flex;
            flex-wrap: wrap;
            overflow: auto;
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