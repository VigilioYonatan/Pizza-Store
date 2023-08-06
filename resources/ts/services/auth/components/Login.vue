<script lang="ts" setup>
import UserIcon from "@heroicons/vue/24/solid/UserIcon";
import zodResolver from "@vigilio/vue-form/resolvers/zod";
import Loading from "~/components/Loading.vue";
import ShowPassword from "~/components/ShowPassword.vue";
import authApi from "#/auth/api/auth.api";
import { useForm } from "@vigilio/vue-form";
import { type AuthLoginDto, authLoginDto } from "#/auth/dtos/authLoginDto";
import { type AuthMode } from "./index.vue";
import { getError } from "~/lib/handleError";
import { useToast } from "vue-toast-notification";
import { AxiosError } from "axios-minified";

const emits = defineEmits<{ (e: "change-mode", payload: AuthMode): void }>();

const { mutate, isLoading, isError, error } = authApi.login();
const { control, errores, handleSubmit, methods } = useForm<AuthLoginDto>({
    resolver: zodResolver(authLoginDto),
});

const onLogin = handleSubmit((data) => {
    mutate(data, {
        onSuccess: (data) => {
            if (data.success) {
                useToast().success(`Bienvenido ${data.user.name}`, {
                    onDismiss: () => {
                        window.location.href = data.page;
                    },
                    duration: 1000,
                });
            }
        },
        onError() {
            methods.onReset("password");
        },
    });
});
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
            <div v-if="isError" class="my-3">
                <p class="text-danger uppercase text-center text-sm">
                    {{ getError(error)("message") }}
                    <a
                        v-if="((error as AxiosError<{verificado:false}>).response?.data.verificado === false)"
                        href="/auth/verificar"
                        class="text-white hover:underline"
                        >Verificar</a
                    >
                </p>
            </div>
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
                    <UserIcon
                        class="w-5 h-5 dark:text-background-light text-background-dark"
                    />
                </div>

                <p v-if="errores.email" class="text-red-600 text-sm mt-2">
                    {{ errores.email.message }}
                </p>
            </div>
            <div class="mb-2">
                <label
                    class="text-xs uppercase block dark:text-paper-light text-paper-dark"
                    for="password"
                    >Contraseña</label
                >
                <div class="flex items-center border-b-2">
                    <ShowPassword #="{ showPassword }">
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            placeholder="tu contraseña"
                            class="w-full py-2 text-background-dark dark:text-paper-light placeholder:capitalize bg-transparent outline-none"
                            autocomplete="false"
                            :="control('password')"
                        />
                    </ShowPassword>
                </div>

                <p v-if="errores.password" class="text-red-600 text-sm mt-2">
                    {{ errores.password.message }}
                </p>
            </div>
            <div class="flex items-center gap-3 mt-">
                <input id="remember" type="checkbox" />
                <label
                    for="remember"
                    class="dark:text-background-light text-background-dark text-sm"
                >
                    Remember Me
                </label>
            </div>
            <button
                aria-label="boton para iniciar sesión"
                role="button"
                type="submit"
                class="bg-primary rounded-md py-2 w-full flex justify-center items-center text-white mt-5 uppercase text-sm font-semibold tracking-wide"
            >
                <template v-if="isLoading"><Loading /></template>
                <template v-else>Iniciar Sesión</template>
            </button>
            <div class="flex items-center justify-between mt-6">
                <button
                    aria-label="boton para recuperar contraseña"
                    role="button"
                    type="button"
                    class="text-center text-sm hover:underline dark:text-background-light block"
                    @click="emits('change-mode', 'forget-password')"
                >
                    Me olvidé mi contraseña?
                </button>
                <button
                    role="button"
                    aria-label="boton para ir a registrar cuenta"
                    type="button"
                    class="text-center text-sm hover:underline dark:text-background-light block"
                    @click="emits('change-mode', 'register')"
                >
                    No tengo una cuenta
                </button>
            </div>
            <div class="my-6">
                <p class="text-white mb-2 text-center">Iniciar sesión con</p>
                <div class="flex flex-col gap-4">
                    <a
                        role="link"
                        href="/auth/facebook"
                        class="flex items-center rounded-md justify-center bg-[#3D5A98] gap-3 text-white"
                    >
                        <img
                            width="50"
                            height="50"
                            src="https://logotipoz.com/wp-content/uploads/2021/10/logo-facebook-png.png"
                        />

                        <p class="text-lg font-semibold">
                            Iniciar con Facebook
                        </p>
                    </a>
                    <a
                        role="link"
                        href="/auth/google"
                        class="flex items-center justify-center p-3 rounded-md bg-white gap-3 text-white"
                    >
                        <img
                            width="30"
                            height="30"
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                        />

                        <p class="text-lg text-black font-semibold">
                            Iniciar con Google
                        </p>
                    </a>
                </div>
            </div>
        </form>
    </div>
</template>
