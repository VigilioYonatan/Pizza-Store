<script lang="ts" setup>
import ChevronDownIcon from "@heroicons/vue/24/outline/ChevronDownIcon";
import ChevronUpIcon from "@heroicons/vue/24/outline/ChevronUpIcon";
import { ref } from "vue";
const isOpen = ref(false);
function onOpenClose(e: MouseEvent) {
    e.stopPropagation();
    isOpen.value = !isOpen.value;
}
</script>
<template>
    <div class="flex flex-col py-2">
        <div
            class="flex items-center px-2 justify-between text-secondary-dark dark:text-secondary-light"
            @click="onOpenClose"
        >
            <div class="flex items-center gap-2">
                <slot name="title" />
            </div>
            <button aria-label="boton para chrevron" class="p-2" type="button">
                <ChevronUpIcon v-if="isOpen" class="w-4 h-4" />
                <ChevronDownIcon v-else class="w-4 h-4" />
            </button>
        </div>
        <div
            class="flex flex-col overflow-hidden delay-1"
            :class="isOpen ? 'max-h-[200px]' : 'max-h-[0px]'"
        >
            <slot />
        </div>
    </div>
</template>
