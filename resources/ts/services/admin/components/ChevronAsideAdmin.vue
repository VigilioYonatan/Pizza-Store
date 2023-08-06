<script lang="ts" setup>
import { ref } from "vue";
import ChevronUpIcon from "@heroicons/vue/24/outline/ChevronUpIcon";
import ChevronDownIcon from "@heroicons/vue/24/outline/ChevronDownIcon";
const isOpen = ref(false);
interface Nav {
    title: string;
    uri: string;
}
const props = defineProps<{
    title: string;
    uri: string;
    children: Nav[];
}>();
</script>
<template>
    <div
        class="flex items-center justify-center w-full hover:bg-primary text-[#79a4ee] rounded-md hover:text-white gap-3 md:justify-between py-3 px-2"
    >
        <a
            role="link"
            :href="props.uri"
            class="flex items-center gap-2 w-full justify-center md:justify-normal"
        >
            <slot />
            <p class="text-gray-300 hidden md:block">{{ props.title }}</p>
        </a>
        <button
            role="button"
            type="button"
            class="hidden md:block"
            @click="isOpen = !isOpen"
        >
            <ChevronUpIcon v-if="isOpen" class="w-6 h-6" />
            <ChevronDownIcon v-else class="w-6 h-6" />
        </button>
    </div>
    <div
        class="flex flex-col overflow-hidden delay-1 w-full"
        :class="isOpen ? 'max-h-[200px]' : 'max-h-[0px]'"
    >
        <a
            role="link"
            :href="nav.uri"
            v-for="nav in props.children"
            class="justify-center flex gap-2 items-center hover:text-secondary-light dark:text-secondary-light py-1 dark:hover:bg-background-dark px-2 capitalize text-[#79a4ee]"
        >
            {{ nav.title }}
        </a>
    </div>
</template>
