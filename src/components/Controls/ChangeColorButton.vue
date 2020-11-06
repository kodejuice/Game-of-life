<template>
    <b-dropdown text="" variant="info" ref="dropdown">
        <b-dropdown-form>
            <b-form-input
                type="color"
                v-model="input_color"
                @change="color_select(input_color)"
                validate
            />
            <div class="dropdown-divider"></div>
            <b-button @click="color_select('random')" id="random" title="Random colors">Random</b-button>
        </b-dropdown-form>
    </b-dropdown>
</template>


<script lang="ts">
import W from '../../util/state';
import { Component, Vue } from 'vue-property-decorator';
import { BButton, BDropdown, BDropdownForm, BFormInput, DropdownPlugin } from 'bootstrap-vue';
Vue.use(DropdownPlugin);

@Component({
    components: {
        BButton,
        BDropdown,
        BDropdownForm,
        BFormInput,
    }
})
export default class ChangeColorButton extends Vue {
    input_color: string = W.APP_STATE.cell_color;

    color_select(color: string) {
        this.$emit('update_color', color);
        this.hideDropdown();
    }

    hideDropdown() {
        (this.$refs.dropdown as any).hide(true);
    }
}
</script>


<style lang="scss" scoped>
button#random {
    width: 100%;
    margin-top: 1px;
    border-top: 1px solid #333;
}
</style>
