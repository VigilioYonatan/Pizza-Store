<script lang="ts" setup>
import HeartIcon from "@heroicons/vue/24/solid/HeartIcon";
import { productsShowApi } from "#/products/apis/products.show.api";
import { useFavoritesStore } from "../store";
const props = defineProps<{
    product: { id: number };
}>();

const { onRemoveProductToFavorite } = useFavoritesStore();
const { isLoading, data, isSuccess } = productsShowApi(props.product.id);

function onRemove(e: MouseEvent) {
    e.stopPropagation();
    onRemoveProductToFavorite(props.product.id);
}
</script>
<template>
    <div class="flex gap-2 items-center h-[80px]">
        <template v-if="isLoading">
            <div
                class="dark:bg-background-dark rounded-md animate-pulse bg-background-light w-full h-full"
            ></div>
        </template>
        <template v-if="isSuccess">
            <picture vid class="h-full w-[200px]">
                <img
                    width="100"
                    height="100"
                    src="https://demo-53.woovinapro.com/wp-content/uploads/2020/11/22-300x330.jpg"
                    alt=""
                    class="h-full w-full object-cover rounded-md"
                />
            </picture>
            <div class="w-full flex flex-col items-center">
                <span
                    class="dark:text-secondary-light text-secondary-dark text-center"
                    >{{ data?.product.name }}</span
                >
                <div class="flex items-center justify-center mt-2">
                    <button @click="onRemove" type="button">
                        <HeartIcon class="w-6 h-6 text-primary" />
                    </button>
                </div>
            </div>
        </template>
    </div>
</template>
