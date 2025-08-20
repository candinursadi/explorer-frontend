<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    total: number;
    perPage: number;
    currentPage: number;
}

const props = defineProps<Props>();
const emits = defineEmits<{ (e: 'change', page: number): void }>();

const lastPage = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)));

function go(page: number) {
    const p = Math.min(lastPage.value, Math.max(1, page));
    emits('change', p);
}
</script>

<template>
    <div class="flex items-center gap-2">
        <button class="px-2 py-1 border rounded" @click="go(1)">« First</button>
        <button class="px-2 py-1 border rounded" @click="go(props.currentPage - 1)">‹Prev</button>
        <span class="text-sm">Page {{ props.currentPage }} / {{ lastPage }}</span>
        <button class="px-2 py-1 border rounded" @click="go(props.currentPage + 1)">Next›</button>
        <button class="px-2 py-1 border rounded" @click="go(lastPage)">Last »</button>
    </div>
</template>