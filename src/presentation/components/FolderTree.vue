<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Folder } from '../../domain/entities/Folder';
import { FolderService } from '../../application/services/folderService';
import { Folder as FolderIcon, FolderOpen } from 'lucide-vue-next'; // 👈 ikon folder

interface Props {
    parentId?: string | null;
}

const props = withDefaults(defineProps<Props>(), { parentId: null });
const emits = defineEmits<{ (e: 'select', folder: Folder): void }>();

const folders = ref<Folder[]>([]);
const expanded = ref<Record<string, boolean>>({});
const loading = ref(false);

const pageById = ref<Record<string, number>>({});
const metaById = ref<
    Record<string, { total: number; perPage: number; currentPage: number; lastPage: number }>
>({});

const limit = 5;

async function load(page = 1, append = false) {
    loading.value = true;
    try {
        if (!props.parentId) {
            const { items, meta } = await FolderService.getRootFolders(page, limit);
            folders.value = append ? [...folders.value, ...items] : items;
            metaById.value['root'] = meta;
            pageById.value['root'] = page;
        } else {
            const { items, meta } = await FolderService.getSubFolders(props.parentId, page, limit);
            folders.value = append ? [...folders.value, ...items] : items;
            metaById.value[props.parentId] = meta;
            pageById.value[props.parentId] = page;
        }
    } finally {
        loading.value = false;
    }
}

function toggle(f: Folder) {
    expanded.value[f.id] = !expanded.value[f.id];
}

function select(f: Folder) {
    emits('select', f);
}

function hasNextPage() {
    const key = props.parentId ?? 'root';
    const meta = metaById.value[key];
    if (!meta) return false;
    return meta.currentPage < meta.lastPage;
}

function loadMore() {
    const key = props.parentId ?? 'root';
    const currentPage = pageById.value[key] ?? 1;
    void load(currentPage + 1, true);
}

onMounted(() => {
  void load();
});
</script>

<template>
    <div>
        <!-- Loading state -->
        <div v-if="loading && folders.length === 0" class="text-sm text-gray-400 pl-2">Loading folders…</div>

        <ul class="pl-2 space-y-1">
            <li
                v-for="f in folders"
                :key="f.id"
                class="cursor-pointer select-none"
            >
                <div
                @click="() => { toggle(f); select(f); }"
                class="flex items-center gap-2 p-1 rounded-lg transition-colors hover:bg-blue-50"
                >
                    <!-- Folder icon -->
                    <component
                        :is="expanded[f.id] ? FolderOpen : FolderIcon"
                        class="w-5 h-5 text-yellow-500 shrink-0"
                    />
                    <!-- Folder name -->
                    <span class="truncate font-medium text-sm text-gray-700">{{ f.name }}</span>
                </div>

                <!-- Subfolders -->
                <transition name="fade">
                    <Suspense>
                        <template #default>
                            <FolderTree
                                v-if="expanded[f.id]"
                                :parent-id="f.id"
                                @select="select"
                            />
                        </template>
                        <template #fallback>
                            <div class="pl-6 text-xs text-gray-400">Loading…</div>
                        </template>
                    </Suspense>
                </transition>
            </li>
        </ul>

        <!-- Load more -->
        <div v-if="hasNextPage()" class="pl-7 mt-2">
            <button
                @click="loadMore"
                class="text-sm text-blue-600 font-medium px-3 py-1 rounded-lg hover:bg-blue-100 transition disabled:opacity-50"
                :disabled="loading"
            >
                Load more…
            </button>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
