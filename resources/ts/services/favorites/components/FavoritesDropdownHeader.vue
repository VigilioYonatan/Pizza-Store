<script lang="ts" setup>
import HeartIcon from "@heroicons/vue/24/outline/HeartIcon";
import useDropdown from "~/composables/useDropdown";
import { useFavoritesStore } from "../store";
import { storeToRefs } from "pinia";
import FavoriteCard from "./FavoriteCard.vue";
const { favoritesTotal, state, favoritesEmpty } = storeToRefs(
    useFavoritesStore()
);
const { onOpen, trigger, dropdown, dropdownOpen } = useDropdown();
</script>
<template>
    <div class="relative flex items-center">
        <button
            @click="onOpen"
            ref="trigger"
            type="button"
            aria-label="boton para abrir favoritos"
            role="button"
            class="relative cursor-pointer"
        >
            <HeartIcon class="w-7 h-7 text-white" />
            <p
                class="text-white bg-red-600 px-1.5 text-center absolute -top-1 -right-2 rounded-full text-sm"
            >
                {{ favoritesTotal }}
            </p>
        </button>
        <div
            ref="dropdown"
            class="absolute right-0 top-8 bg-background-light w-[300px] shadow dark:bg-background-dark rounded-md delay-1 py-2 flex flex-col gap-2 justify-center items-center"
            :class="
                dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            "
        >
            <template v-if="favoritesEmpty">
                <p
                    class="text-secondary-dark dark:text-secondary-light font-semibold py-2"
                >
                    No hay favoritos
                </p>
            </template>
            <div v-else class="flex justify-center items-center gap-2">
                <span
                    class="text-secondary-dark dark:text-secondary-light my-2 font-semibold text-center block"
                    >Favoritos</span
                >
                <span
                    class="text-white bg-primary px-2 rounded-full flex items-center justify-center"
                >
                    {{ favoritesTotal }}</span
                >
            </div>
            <div class="flex flex-col px-2 gap-3">
                <FavoriteCard :key="id" v-for="id in state" :product="{ id }" />
            </div>
        </div>
    </div>
</template>
