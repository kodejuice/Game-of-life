<template>
    <b-button @click="advanceCursor">Speed <b>x{{speed[cursor]}}</b></b-button>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BButton } from 'bootstrap-vue';
import W from '../../state';

@Component({
    components: {
        BButton,
    }
})
export default class ChangeSpeedButton extends Vue {
    cursor: number = 2;
    speed: number[] = [
        0.25, // 2.5fps
        0.5,  // 5fps
        0.75, // 7.5fps
        1     // 10fps
    ];

    advanceCursor() {
        const next = (this.cursor + 1) % this.speed.length;
        this.cursor = next;

        const speed = this.speed[this.cursor];
        W.APP_STATE.grid.simulation.fps = speed * 10;
    }

}
</script>


<style lang="scss" scoped>
button {
    font-size: 15px;
}
</style>
