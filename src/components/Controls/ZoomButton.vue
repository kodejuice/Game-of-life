<template>
    <b-button-group>
        <b-button
            id='zoom'
            title="Zoom in"
            variant="outline-primary"
            :disabled="!can_scale_up"
            @click="$emit('scale_up')"
        >+</b-button>
        <b-button
            id='zoom'
            title="Zoom out"
            variant="outline-primary"
            :disabled="!can_scale_down"
            @click="$emit('scale_down')"
        >-</b-button>
    </b-button-group>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { BButton, BButtonGroup } from 'bootstrap-vue';

@Component({
    components: {
        BButton,
        BButtonGroup,
    }
})
export default class ZoomButton extends Vue {
    @Prop() can_scale_up!: boolean;
    @Prop() can_scale_down!: boolean;
}
</script>


<style lang="scss" scoped>
button#zoom {
    font-weight: 900;
}
</style>
