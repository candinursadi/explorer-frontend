<script setup lang="ts">
import type { Content, Folder } from '../../domain/entities/Folder';
import { FolderService } from '../../application/services/folderService';
import { ref, watch, defineAsyncComponent } from 'vue';
import { Folder as FolderIcon, File as FileIcon } from "lucide-vue-next";

const Card = defineAsyncComponent(() => import('./Ui/Card.vue')); // lazy
const Spinner = defineAsyncComponent(() => import('./Ui/Spinner.vue')); // lazy

interface Props { folder: Folder | null }
const props = defineProps<Props>();

const currentFolder = ref<Folder | null>(props.folder);
const contents = ref<Content[]>([]);
const loading = ref(false);

const selectedId = ref<string | null>(null); // ✅ track item yg dipilih

const limit = 12;
const contentMeta = ref({ total: 0, perPage: limit, currentPage: 1, lastPage: 1 });

async function fetchData(folderId: string, page = 1, append = false) {
  loading.value = true;
  try {
    const conts = await FolderService.getContents(folderId, page, contentMeta.value.perPage);
    contents.value = append ? [...contents.value, ...conts.items] : conts.items;
    contentMeta.value = conts.meta;
  } finally {
    loading.value = false;
  }
}

function hasNextPage() {
  return contentMeta.value.currentPage < contentMeta.value.lastPage;
}

function loadMore() {
  if (hasNextPage() && currentFolder.value) {
    fetchData(currentFolder.value.id, contentMeta.value.currentPage + 1, true);
  }
}

function onItemClick(sf: Content) {
  selectedId.value = sf.id; // ✅ set item yg di klik
}

async function onItemDblClick(sf: Content) {
  if (sf.type === "folder") {
    currentFolder.value = { id: sf.id, name: sf.name, type: "folder" } as unknown as Folder;
    await fetchData(sf.id, 1);
    selectedId.value = null; // reset highlight setelah masuk folder
  }
}

// kalau props.folder berubah dari luar, sync ke currentFolder
watch(() => props.folder, (newVal) => {
  currentFolder.value = newVal;
  if (newVal) fetchData(newVal.id, 1);
});
</script>

<template>
  <div>
    <h2 class="font-bold text-lg mb-3">
      {{ currentFolder ? currentFolder.name : 'Select a folder' }}
    </h2>
    <div v-if="!currentFolder" class="text-gray-500">Nothing selected.</div>

    <div v-else>
      <Card class="mb-4 p-4">
        <!-- Loading state -->
        <div v-if="loading && contents.length === 0" class="py-6 flex justify-center"><Spinner /></div>

        <!-- Grid -->
        <ul v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <li
            v-for="sf in contents"
            :key="sf.id"
            class="group flex flex-col items-center p-3 rounded-xl border border-transparent hover:border-blue-400 hover:shadow transition cursor-pointer"
            :class="selectedId === sf.id ? 'bg-blue-100 border-blue-500' : ''" 
            @click="onItemClick(sf)"
            @dblclick="onItemDblClick(sf)"
          >
            <!-- Icon -->
            <div class="mb-2">
              <component
                :is="sf.type === 'folder' ? FolderIcon : FileIcon"
                class="w-10 h-10"
                :class="sf.type === 'folder' ? 'text-yellow-500 group-hover:text-yellow-600' : 'text-gray-500 group-hover:text-gray-700'"
              />
            </div>
            <!-- Name -->
            <span class="text-sm text-gray-700 font-medium truncate w-full text-center">
              {{ sf.name }}
            </span>
          </li>

        </ul>

        <!-- Load more -->
        <div v-if="hasNextPage()" class="mt-4 flex justify-center">
          <button
            @click="loadMore"
            class="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition disabled:opacity-50"
            :disabled="loading"
          >
            <span v-if="loading">Loading…</span>
            <span v-else>Load more</span>
          </button>
        </div>
      </Card>
    </div>
  </div>
</template>
