<script lang="ts" setup>
import authApi from "../api/auth.api";
import zodResolver from "@vigilio/vue-form/resolvers/zod";
import UserIcon from "@heroicons/vue/24/solid/UserIcon";
import LockClosedIcon from "@heroicons/vue/24/solid/LockClosedIcon";
import AtSymbolIcon from "@heroicons/vue/24/solid/AtSymbolIcon";
import CheckCircleIcon from "@heroicons/vue/24/outline/CheckCircleIcon";
import ShowPassword from "~/components/ShowPassword.vue";
import Loading from "~/components/Loading.vue";
import { type AuthRegisterDto, authRegisterDto } from "../dtos/authRegisterDto";
import { type AuthMode } from "./index.vue";
import { useForm } from "@vigilio/vue-form";
import { ErrorBody } from "~/lib/handleError";
import { useToast } from "vue-toast-notification";

const emits = defineEmits<{ (e: "change-mode", payload: AuthMode): void }>();

const { mutate, isSuccess, data, isLoading } = authApi.register();
const { control, errores, reset, handleSubmit, methods } =
    useForm<AuthRegisterDto>({
        resolver: zodResolver(authRegisterDto),
    });

const onRegister = handleSubmit((data) => {
    mutate(data, {
        onSuccess: (data) => {
            if (data.success) {
                reset();
            }
        },
        onError(err) {
            const error = err as ErrorBody<AuthRegisterDto>;
            if (error.response?.data && !error.response.data.success) {
                const { body, message } = error.response.data;
                methods.setError(body, message);
                return;
            }
            useToast().error(
                `Comuniquese con el desarrollador, Error: ${error.message}`
            );
        },
    });
});
</script>
<template>
    <template v-if="isSuccess && data?.success">
        <div class="py-12">
            <div
                class="text-success text-2xl flex justify-center items-center gap-4 text-center font-semibold"
            >
                <CheckCircleIcon class="w-12 h-12" />
                <h4 class="">Cuenta Creada correctamente</h4>
            </div>
            <div class="mt-6">
                <p class="text-2xl text-center text-white">
                    Gracias por registrarte
                    <b class="text-primary">{{ data.user.name }}</b>
                </p>
                <button
                    role="button"
                    aria-label="boton para inciar sesión"
                    @click="emits('change-mode', 'login')"
                    type="button"
                    class="text-white bg-primary px-6 py-2 rounded-md text-center mt-6 hover:bg-opacity-70 block mx-auto"
                >
                    Iniciar sesión
                </button>
            </div>
        </div>
    </template>
    <template v-else
        ><div class="flex flex-col gap-2 p-4 justify-center items-center">
            <h4
                class="dark:text-background-light text-background-dark text-3xl font-semibold tracking-wider"
            >
                Registrar Cuenta
            </h4>
            <p
                class="dark:text-paper-light tracking-wider text-paper-dark text-center"
            >
                Se parte de nuestro restaurante
            </p>
        </div>
        <div class="h-[1px] bg-paper-light" />
        <div class="py-8 px-2">
            <form
                class="w-10/12 md:w-8/12 mx-auto pb-6"
                novalidate
                @submit="onRegister"
            >
                <div class="mb-4">
                    <label
                        class="text-xs uppercase block dark:text-paper-light text-paper-dark"
                        for="name"
                        >Nombre</label
                    >
                    <div class="flex items-center border-b-2">
                        <input
                            type="text"
                            placeholder="nombre de usuario"
                            class="w-full text-background-dark dark:text-paper-light e py-2 bg-transparent outline-none"
                            autocomplete="false"
                            :="control('name')"
                        />
                        <UserIcon
                            class="w-5 h-5 dark:text-background-light text-background-dark"
                        />
                    </div>

                    <p v-if="errores.name" class="text-red-600 text-sm mt-2">
                        {{ errores.name.message }}
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
                            class="w-full text-background-dark dark:text-paper-light py-2 bg-transparent outline-none"
                            autocomplete="true"
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

                    <p
                        v-if="errores.password"
                        class="text-red-600 text-sm mt-2"
                    >
                        {{ errores.password.message }}
                    </p>
                </div>
                <div class="mb-2">
                    <label
                        class="text-xs uppercase block dark:text-paper-light text-paper-dark"
                        for="repeat_password"
                        >Repetir contraseña</label
                    >
                    <div class="flex items-center border-b-2">
                        <input
                            type="password"
                            placeholder="repitir contraseña"
                            class="w-full py-2 text-background-dark dark:text-paper-light placeholder:capitalize bg-transparent outline-none"
                            autocomplete="false"
                            :="control('repeat_password')"
                        />
                        <LockClosedIcon
                            class="w-5 h-5 dark:text-background-light text-background-dark"
                        />
                    </div>

                    <p
                        v-if="errores.repeat_password"
                        class="text-red-600 text-sm mt-2"
                    >
                        {{ errores.repeat_password.message }}
                    </p>
                </div>

                <button
                    role="button"
                    type="submit"
                    aria-label="boton para registrar cuenta"
                    class="bg-primary rounded-md py-4 w-full text-white mt-5 uppercase text-sm font-semibold tracking-wide"
                >
                    <template v-if="isLoading"><Loading /></template>
                    <template v-else>Registrar</template>
                </button>
            </form>
            <div class="h-[1px] bg-paper-light" />
            <div class="flex items-center justify-center mt-6">
                <button
                    type="button"
                    role="button"
                    aria-label="boton para ir a iniciar sesión"
                    @click="emits('change-mode', 'login')"
                    class="text-center text-sm hover:underline dark:text-background-light block"
                >
                    Ya tengo una cuenta
                </button>
            </div>
        </div>
    </template>
</template>
