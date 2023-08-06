<script lang="ts" setup>
import { Teleport, watch } from "vue";
import useDropdown from "~/composables/useDropdown";
const { dropdownOpen, ...rest } = useDropdown();
watch(dropdownOpen, (drop) => {
    document.body.classList.toggle("overflow-hidden", drop);
});
</script>
<template>
    <Teleport to="#teleport">
        <div
            @click="rest.onClose"
            class="bg-black delay-1 bg-opacity-80 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-[999]"
            :class="
                dropdownOpen ? 'visible opacity-100' : 'invisible opacity-0'
            "
        >
            <slot :="rest" />
        </div>
    </Teleport>
    <slot name="trigger" :="rest" />
</template>
