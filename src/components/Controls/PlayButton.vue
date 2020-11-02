<template>
    <b-button variant="success">
        <b-icon icon="pause" font-scale="1.4" /> START
    </b-button>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BButton, BIcon, BIconPlay, BIconPause } from 'bootstrap-vue';

@Component({
    components: {
        BButton,
        BIcon,
        BIconPlay,
        BIconPause,
    }
})
export default class PlayButton extends Vue {
}
</script>


<style lang="scss" scoped>
button {
    svg {
        vertical-align: top;
    }
}
</style>
