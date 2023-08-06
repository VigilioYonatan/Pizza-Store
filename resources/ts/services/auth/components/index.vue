<script lang="ts" setup>
import XMarkIcon from "@heroicons/vue/24/solid/XMarkIcon";
import Login from "./Login.vue";
import Register from "./Register.vue";
import ForgetPassword from "./ForgetPassword.vue";
import { ref } from "vue";
export type AuthMode = "login" | "register" | "forget-password";
const props = defineProps<{ trigger: any }>();
const emits = defineEmits<{ (e: "on-close"): void }>();
const authMode = ref<AuthMode>("login");

function changeMode(mode: AuthMode) {
    authMode.value = mode;
}
</script>
<template>
    <div
        :ref="props.trigger"
        class="relative w-11/12 md:w-[650px] bg-paper-light dark:bg-paper-dark rounded-md"
    >
        <button
            type="button"
            role="button"
            aria-label="this button is to close modal"
            @click="emits('on-close')"
            class="absolute top-0 right-0 m-4"
        >
            <XMarkIcon class="w-6 h-6 text-white" />
        </button>

        <Login v-if="authMode === 'login'" @change-mode="changeMode" />
        <Register
            v-else-if="authMode === 'register'"
            @change-mode="changeMode"
        />
        <ForgetPassword
            v-else-if="authMode === 'forget-password'"
            @change-mode="changeMode"
        />
        <Login v-else @change-mode="changeMode" />
    </div>
</template>
