<template>
    <b-button-group>
        <b-button variant="outline-primary" id='zoom'>+</b-button>
        <b-button variant="outline-primary" id='zoom'>-</b-button>
    </b-button-group>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BButton, BButtonGroup } from 'bootstrap-vue';

@Component({
    components: {
        BButton,
        BButtonGroup,
    }
})
export default class ZoomButton extends Vue {
}
</script>


<style lang="scss" scoped>
button#zoom {
    font-weight: 900;
}
</style>
