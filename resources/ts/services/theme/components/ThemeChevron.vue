<script lang="ts" setup>
import PaintBrushIcon from "@heroicons/vue/24/outline/PaintBrushIcon";
import Chevron from "~/components/Chevron.vue";
import useThemeStore from "../store/theme.store";
const { changeThemeMode, themesMode } = useThemeStore();
</script>
<template>
    <Chevron>
        <template #title>
            <PaintBrushIcon class="w-5 h-5" />
            <span class="text-lg tracking-wider">Temas</span>
        </template>
        <template #default>
            <button
                v-for="theme in themesMode"
                type="button"
                class="text-secondary-dark justify-center flex gap-2 items-center hover:text-secondary-light dark:text-secondary-light py-1 hover:bg-primary dark:hover:bg-background-dark px-2 capitalize"
                role="button"
                aria-label="boton para cambiar de thema"
                @click="() => changeThemeMode(theme)"
            >
                {{ theme }}
            </button>
        </template>
    </Chevron>
</template>
