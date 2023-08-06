<script lang="ts" setup>
import HeartIcon from "@heroicons/vue/24/outline/HeartIcon";
import HeartSolidIcon from "@heroicons/vue/24/solid/HeartIcon";
import { useFavoritesStore } from "../store";
const props = defineProps<{
    product: {
        id: number;
    };
}>();
const favoriteStore = useFavoritesStore();
</script>
<template>
    <button
        type="button"
        aria-label="this button is to add product in favorite list"
        @click="() => favoriteStore.onAddProductToFavorite(props.product.id)"
        class="w-[40px] flex justify-center items-center absolute z-10 m-2 top-0 right-0 h-[40px] rounded-full bg-white"
    >
        <HeartSolidIcon
            v-if="favoriteStore.existFavoriteInFavorites(props.product.id)"
            class="w-6 h-6 text-primary"
        />
        <HeartIcon v-else class="w-6 h-6 text-primary" />
    </button>
</template>
