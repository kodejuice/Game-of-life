<template>
    <div
        ref="cell"
        @click="$emit('mouse_move', $event, true, index)"
        @mousemove="$emit('mouse_move', $event, false, index)"
        :class="{col: true, [`scale-${scale_factor}`]: true}"
        :style="{background: active ? cell_color : 'unset'}"
    ></div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Cell extends Vue {
    @Prop() active!: boolean;
    @Prop() index!: {i:number, j:number};
    @Prop() scale_factor!: 1|2|3|4|5|6|7;
    @Prop() cell_color!: string;
}
</script>


<style lang="scss" scoped>
$border: 0.5px solid #000;

@mixin box($size) {
    // flex-item with equal width & height
    height: 0;
    padding: 0;
    flex: 0 0 $size;
    max-width: $size;
    padding-bottom: $size;
}

.col {
    border-right: $border;
    border-bottom: $border;
    &.color { background: #17A2B8; }

    // represents the size of each cell/column
    &.scale-1 { @include box(.66666%); }  /*150 columns*/
    &.scale-2 { @include box(1%); }   /*100 columns*/
    &.scale-3 { @include box(2%); }   /*50 columns*/
    &.scale-4 { @include box(4%); }   /*25 columns*/
    &.scale-5 { @include box(5%); }   /*20 columns*/
    &.scale-6 { @include box(10%); }  /*10 columns*/
    &.scale-7 { @include box(20%); }  /*5 columns*/
}
</style>
