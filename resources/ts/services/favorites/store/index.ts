import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
    const state = ref<number[]>([]);

    const favoritesTotal = computed(() => state.value.length);
    const favoritesEmpty = computed(() => !state.value.length);
    const existFavoriteInFavorites = (id: number) =>
        state.value.some((productId) => productId === id);

    function onRemoveProductToFavorite(id: number) {
        state.value = state.value.filter((productId) => productId !== id);
    }
    function onAddProductToFavorite(id: number) {
        if (existFavoriteInFavorites(id)) {
            onRemoveProductToFavorite(id);
            return;
        }
        state.value = [...state.value, id];
    }

    return {
        state,
        favoritesTotal,
        favoritesEmpty,
        existFavoriteInFavorites,
        onAddProductToFavorite,
        onRemoveProductToFavorite,
    };
});
