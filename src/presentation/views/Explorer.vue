<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import type { Folder } from '../../domain/entities/Folder';

const FolderTree = defineAsyncComponent(() => import('../components/FolderTree.vue'));
const RightPane = defineAsyncComponent(() => import('../components/RightPane.vue'));

const selected = ref<Folder | null>(null);
</script>

<template>
    <div class="h-screen flex flex-col bg-gray-50">
        <!-- Header -->
        <header class="h-14 flex items-center justify-between px-4 border-b bg-white shadow-sm">
            <h1 class="font-bold text-lg text-gray-700">📁 Explorer</h1>
        </header>

        <!-- Body -->
        <main class="flex flex-1 overflow-hidden">
            <!-- Sidebar -->
            <aside class="w-1/4 border-r bg-white overflow-auto p-2 shadow-inner">
                <FolderTree @select="(f: Folder) => (selected = f)" />
            </aside>

            <!-- Content -->
            <section class="flex-1 p-4 overflow-auto">
                <RightPane :folder="selected" />
            </section>
        </main>
    </div>
</template>
