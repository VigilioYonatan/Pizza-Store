<script lang="ts" setup>
import { User } from "#/web/components/HeaderIcos.vue";

const props = defineProps<{ user: User | null }>();
</script>
<template>
    <div
        class="flex bg-primary flex-col gap-2 items-center justify-center py-2"
    >
        <div
            class="rounded-full flex justify-center items-center overflow-hidden w-[60px] h-[60px] bg-paper-dark dark:bg-paper-light"
        >
            <img
                v-if="props.user?.foto"
                :src="props.user.foto"
                width="60"
                height="60"
                :alt="props.user.name"
            />
            <p v-else class="w-[60px] h-[60px]">{{ props.user?.name[0] }}</p>
        </div>

        <p class="text-secondary-light font-bold text-2xl">
            {{ props.user?.name }}
        </p>
    </div>
</template>
