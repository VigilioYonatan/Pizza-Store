<script lang="ts" setup>
import zodResolver from "@vigilio/vue-form/resolvers/zod";
import { AuthLoginDto, authLoginDto } from "../dtos/authLoginDto";
import { useForm } from "@vigilio/vue-form";
import { AuthMode } from "./index.vue";
import AtSymbolIcon from "@heroicons/vue/24/solid/AtSymbolIcon";

const emits = defineEmits<{ (e: "change-mode", payload: AuthMode): void }>();

const { control, errores, handleSubmit } = useForm<AuthLoginDto>({
    resolver: zodResolver(authLoginDto),
});

const onLogin = handleSubmit((_data) => {});
</script>
<template>
    <div class="flex flex-col gap-2 p-4 justify-center items-center">
        <h4
            class="dark:text-background-light text-background-dark text-3xl font-semibold tracking-wider"
        >
            Iniciar Sesión
        </h4>
        <p
            class="dark:text-paper-light tracking-wider text-paper-dark text-center"
        >
            Inicia sesión y obten nuestros beneficios
        </p>
    </div>
    <div class="h-[1px] bg-paper-light" />
    <div class="py-8 px-2">
        <form class="w-10/12 md:w-8/12 mx-auto" novalidate @submit="onLogin">
            <div class="mb-4">
                <label
                    class="text-xs uppercase block dark:text-paper-light text-paper-dark"
                    for="email"
                    >email</label
                >
                <div class="flex items-center border-b-2">
                    <input
                        type="email"
                        placeholder="email de usuario"
                        class="w-full text-background-dark dark:text-paper-light placeholder:capitalize py-2 bg-transparent outline-none"
                        autocomplete="false"
                        :="control('email')"
                    />
                    <AtSymbolIcon
                        class="w-5 h-5 dark:text-background-light text-background-dark"
                    />
                </div>

                <p v-if="errores.email" class="text-red-600 text-sm mt-2">
                    {{ errores.email.message }}
                </p>
            </div>
            <button
                role="button"
                type="submit"
                aria-label="boton para ir a recuperar contraseña"
                class="bg-primary py-2 w-full flex justify-center items-center text-white mt-5 uppercase text-sm font-semibold tracking-wide"
            >
                Recuperar contraseña
            </button>
            <div class="flex items-center justify-center mt-6">
                <button
                    role="button"
                    type="button"
                    class="text-center text-sm hover:underline dark:text-background-light block"
                    @click="emits('change-mode', 'login')"
                >
                    Tengo una cuenta
                </button>
            </div>
        </form>
    </div>
</template>
