<template>
    <div
        @mousemove="$emit('mouse_move', $event, false, index)"
        @click="$emit('mouse_move', $event, true, index)"
        :class="{col: true, [`scale-${scale_factor}`]: true, color: active}"
    ></div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Cell extends Vue {
    @Prop() active!: boolean;
    @Prop() index!: {i:number, j:number};
    @Prop() scale_factor!: 1|2|3|4|5|6|7;
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
    &.scale-1 { @include box(.5%); }  /*200 cols*/
    &.scale-2 { @include box(1%); }   /*100 cols*/
    &.scale-3 { @include box(2%); }   /*50 cols*/
    &.scale-4 { @include box(4%); }   /*25 cols*/
    &.scale-5 { @include box(5%); }   /*20 cols*/
    &.scale-6 { @include box(10%); }  /*10 cols*/
    &.scale-7 { @include box(20%); }  /*5 cols*/
}
</style>
