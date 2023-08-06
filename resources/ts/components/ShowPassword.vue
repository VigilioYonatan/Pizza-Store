<script lang="ts" setup>
import { ref } from "vue";
import EyeSlashIcon from "@heroicons/vue/24/outline/EyeSlashIcon";
import EyeIcon from "@heroicons/vue/24/outline/EyeIcon";
const showPassword = ref(false);
</script>
<template>
    <slot :showPassword="showPassword" />
    <button
        aria-label="boton para mostrar contraseña"
        type="button"
        @click="showPassword = !showPassword"
    >
        <EyeSlashIcon
            v-if="showPassword"
            class="w-5 h-5 dark:text-background-light text-background-dark"
        />
        <EyeIcon
            v-else
            class="w-5 h-5 dark:text-background-light text-background-dark"
        />
    </button>
</template>
