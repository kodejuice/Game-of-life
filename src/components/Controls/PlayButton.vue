<template>
    <b-button
        :variant="button_variant"
        @click="$emit('update:running', !running)"
    >
        <b-icon font-scale="1.4" :icon="button_type.toLowerCase()" /> {{button_type}}
    </b-button>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
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
    @Prop() running!: boolean;

    get button_type() {
        return this.running ? "PAUSE" : "PLAY";
    }

    get button_variant() {
        return this.running ? "warning" : "success";
    }
}
</script>


<style lang="scss" scoped>
button {
    svg {
        vertical-align: top;
    }
}
</style>
