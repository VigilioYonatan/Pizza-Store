<script lang="ts" setup>
import Bars3Icon from "@heroicons/vue/24/outline/Bars3Icon";
import XCircleIcon from "@heroicons/vue/24/outline/XCircleIcon";
import useDropdown from "~/composables/useDropdown";
import { watch } from "vue";

const { dropdownOpen, onOpen, onClose } = useDropdown();

watch(
    dropdownOpen,
    (val) => {
        document.body.classList.toggle("overflow-hidden", val);
    },
    { deep: true }
);
</script>
<template>
    <button
        role="button"
        aria-label="boton hamburguesa"
        @click="onOpen"
        type="button"
    >
        <Bars3Icon class="w-8 h-8 text-white" />
    </button>
    <div
        class="fixed top-0 bottom-0 left-0 w-full bg-black bg-opacity-80 z-[500] delay-1"
        :class="dropdownOpen ? 'visible' : 'invisible '"
        @click="onClose"
    >
        <aside
            @click="(e) => e.stopPropagation()"
            class="sm:w-[350px] bg-white delay-1 h-screen"
            :class="dropdownOpen ? 'translate-x-0' : '-translate-x-full'"
        >
            <button
                role="button"
                aria-label="boton para cerrar responsive"
                @click="onClose"
                class="bg-primary flex justify-center items-center py-2 gap-2"
            >
                <XCircleIcon class="w-5 h-5 text-white" />
                <p class="text-white font-semibold">Cerrar</p>
            </button>
            <div class="py-6">
                <div class="">
                    <a role="link" href="/" class="text-white">Home</a>
                </div>
                <div class="">
                    <a role="link" href="/" class="text-white">Home</a>
                </div>
                <div class="">
                    <a role="link" href="/" class="text-white">Home</a>
                </div>
            </div>
        </aside>
    </div>
</template>
