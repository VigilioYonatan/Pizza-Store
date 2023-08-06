<script lang="ts" setup>
import MagnifyingGlassIcon from "@heroicons/vue/24/solid/MagnifyingGlassIcon";
import ShoppingBagIcon from "@heroicons/vue/24/outline/ShoppingBagIcon";
import Cog6ToothIcon from "@heroicons/vue/24/outline/Cog6ToothIcon";
import UserIcon from "@heroicons/vue/24/outline/UserIcon";
import ArrowRightOnRectangleIcon from "@heroicons/vue/24/outline/ArrowRightOnRectangleIcon";
import useDropdown from "~/composables/useDropdown";
import Modal from "~/components/Modal.vue";
import Auth from "#/auth/components/index.vue";
import ProfileHeaderWeb from "#/auth/components/ProfileHeaderWeb.vue";
import FavoritesDropdownHeader from "#/favorites/components/FavoritesDropdownHeader.vue";
import ThemeChevron from "#/theme/components/ThemeChevron.vue";
import LangChevron from "#/languages/components/LangChevron.vue";
const languageDropdown = useDropdown();
export interface User {
    id: number;
    name: string;
    email: string;
    foto: string | null;
    slug: string;
}
const props = defineProps<{
    user: User | null;
}>();
</script>
<template>
    <button
        type="button"
        aria-label="boton para hacer busquedas"
        role="button"
        class="cursor-pointer"
    >
        <MagnifyingGlassIcon class="w-7 h-7 text-white" />
    </button>
    <FavoritesDropdownHeader />

    <button
        type="button"
        aria-label="boton para abrir modal de carrito de compras"
        role="button"
        class="relative cursor-pointer"
    >
        <ShoppingBagIcon class="w-7 h-7 text-white" />
        <p
            class="text-white bg-red-600 px-1.5 text-center absolute -top-1 -right-2 rounded-full text-sm"
        >
            0
        </p>
    </button>
    <div class="relative">
        <button
            :ref="languageDropdown.trigger"
            @click="languageDropdown.onOpen"
            type="button"
            aria-label="boton para abrir dropdown de configuracin"
            role="button"
            class="flex items-center"
        >
            <Cog6ToothIcon class="w-7 h-7 text-white" />
        </button>

        <div
            :ref="languageDropdown.dropdown"
            class="absolute right-0 top-8 bg-paper-light w-[200px] dark:bg-paper-dark rounded-md delay-1 py-2"
            :class="
                languageDropdown.dropdownOpen.value
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible'
            "
        >
            <template v-if="props.user">
                <ProfileHeaderWeb :user="props.user" />
            </template>
            <template v-else>
                <Modal>
                    <template #trigger="{ onOpen, trigger }">
                        <button
                            aria-label="boton para iniciar sesión"
                            role="button"
                            ref="trigger"
                            @click="onOpen"
                            class="flex items-center gap-3 p-2 text-secondary-dark dark:text-secondary-light"
                        >
                            <UserIcon class="w-5 h-5" />
                            <span class="text-lg tracking-wider"
                                >Sign In / Join</span
                            >
                        </button>
                    </template>
                    <template #default="{ onClose, dropdown }">
                        <Auth @on-close="onClose" :="dropdown" />
                    </template>
                </Modal>
            </template>
            <div class="h-[1px] bg-primary" />
            <LangChevron />
            <div class="h-[1px] bg-primary" />
            <ThemeChevron />
            <div class="h-[1px] bg-primary" />
            <template v-if="user">
                <a
                    href="/admin"
                    role="link"
                    class="flex items-center gap-3 p-2 text-white"
                >
                    <ArrowRightOnRectangleIcon class="w-5 h-5" />
                    <span class="text-lg tracking-wider">Ir a admin</span>
                </a>
                <a
                    :href="`/profile/${props.user!.slug}`"
                    role="link"
                    class="flex items-center gap-3 p-2 text-white"
                >
                    <ArrowRightOnRectangleIcon class="w-5 h-5" />
                    <span class="text-lg tracking-wider">Ver perfil</span>
                </a>
                <a
                    href="/auth/logout"
                    role="link"
                    class="flex items-center gap-3 p-2 bg-primary text-white"
                >
                    <ArrowRightOnRectangleIcon class="w-5 h-5" />
                    <span class="text-lg tracking-wider">Salir</span>
                </a>
            </template>
        </div>
    </div>
</template>
