<template>
    <b-button>Speed <b>x0.75</b></b-button>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BButton } from 'bootstrap-vue';

@Component({
    components: {
        BButton,
    }
})
export default class ChangeSpeedButton extends Vue {
}
</script>


<style lang="scss" scoped>
button {
    font-size: 15px;
}
</style>
