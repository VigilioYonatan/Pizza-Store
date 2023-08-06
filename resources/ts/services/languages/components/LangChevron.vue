<script lang="ts" setup>
import Chevron from "~/components/Chevron.vue";
import GlobeAltIcon from "@heroicons/vue/24/outline/GlobeAltIcon";
</script>
<template>
    <Chevron>
        <template #title>
            <GlobeAltIcon class="w-5 h-5" />
            <span class="text-lg tracking-wider"> Language</span>
        </template>
        <template #default>
            <button
                type="button"
                class="text-secondary-dark dark:text-secondary-light py-1 hover:bg-primary hover:text-secondary-light dark:hover:bg-background-dark px-2"
                aria-label="boton para cambiar de idioma a ingles"
                role="button"
            >
                English
            </button>
            <button
                type="button"
                class="text-secondary-dark dark:text-secondary-light py-1 hover:bg-primary hover:text-secondary-light dark:hover:bg-background-dark px-2"
                aria-label="boton para cambiar de idioma a español"
                role="button"
            >
                Spanish
            </button>
        </template>
    </Chevron>
</template>
