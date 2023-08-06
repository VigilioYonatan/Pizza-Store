<script setup lang="ts">
import BellIcon from "@heroicons/vue/24/outline/BellIcon";
import ArrowLeftOnRectangleIcon from "@heroicons/vue/24/outline/ArrowLeftOnRectangleIcon";
import Cog8ToothIcon from "@heroicons/vue/24/outline/Cog8ToothIcon";
import CameraIcon from "@heroicons/vue/24/outline/CameraIcon";
import useDropdown from "~/composables/useDropdown";
import { User } from "#/web/components/HeaderIcos.vue";

const props = defineProps<{ user: User }>();
const { dropdown, trigger, dropdownOpen, onOpen } = useDropdown();
</script>
<template>
    <div class="flex gap-2 md:gap-4 items-center">
        <BellIcon class="w-6 h-6" />
        <div class="flex items-center gap-3">
            <button
                ref="trigger"
                @click="onOpen"
                type="button"
                aria-label="boton para abrir perfil"
                class="w-[50px] h-[50px] flex justify-center items-center border rounded-full bg-paper-light dark:bg-paper-dark overflow-hidden"
            >
                <img
                    v-if="props.user.foto"
                    :src="props.user.foto"
                    class="rounded-full w-[50px] h-[50px] object-cover"
                    width="50"
                    height="50"
                    alt=""
                />
                <p v-else>{{ props.user.name[0] }}</p>
            </button>

            <p class="font-semibold text-md hidden md:block">
                {{ props.user.name }}
            </p>
            <div
                ref="dropdown"
                class="bg-background-light w-[220px] flex justify-center items-center flex-col shadow dark:bg-background-dark fixed top-[4.5rem] right-6 overflow-hidden rounded-md"
                :class="dropdownOpen ? 'visible' : 'invisible'"
            >
                <div
                    class="py-2 relative w-full h-full flex justify-center items-center"
                >
                    <img
                        width="300"
                        height="300"
                        src="https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?cs=srgb&dl=pexels-pixabay-36717.jpg&fm=jpg"
                        alt="wallpaper"
                        class="absolute w-full h-full object-cover top-0 left-0 right-0 bottom-0 -z-10"
                    />
                    <a
                        href=""
                        class="w-[80px] group cursor-pointer h-[80px] relative -bottom-10 flex justify-center items-center rounded-full overflow-hidden"
                    >
                        <div
                            class="absolute group-hover:visible invisible bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0 flex justify-center items-center"
                        >
                            <CameraIcon class="w-6 h-6 text-white" />
                        </div>

                        <img
                            v-if="user.foto"
                            :src="user.foto"
                            width="80"
                            height="80"
                            alt=""
                        />
                        <p v-else>{{ props.user.name[0] }}</p>
                    </a>
                </div>
                <p class="text-black mt-10 font-semibold mb-2">
                    {{ props.user.name }}
                </p>
                <div class="flex flex-col w-full">
                    <a
                        href="/profile"
                        class="text-center py-1.5 flex justify-center items-center gap-2"
                    >
                        <Cog8ToothIcon
                            class="w-6 h-6 dark:text-secondary-light text-secondary-dark"
                        />
                        Configuración
                    </a>
                </div>
                <div class="flex flex-col w-full">
                    <a
                        href="/auth/logout"
                        class="bg-danger text-white text-center py-1.5 flex justify-center items-center gap-2"
                    >
                        <ArrowLeftOnRectangleIcon class="w-6 h-6 text-white" />
                        Salir
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
