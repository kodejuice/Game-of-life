<template>
    <b-dropdown text="" variant="info" ref="dropdown">
        <b-dropdown-form>
            <b-form-input
                type="color"
                value="#17A2B8"
                @change="hideDropdown"
            />
            <div class="dropdown-divider"></div>
            <b-button @click="hideDropdown" id="random">Random</b-button>
        </b-dropdown-form>
    </b-dropdown>
</template>


<script lang="ts">
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
