<script setup lang="ts"></script>

<template>
    <div class="flex items-center justify-center p-6" role="status" arialabel="loading">
        <svg class="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"opacity="0.25" />
            <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokewidth="4" />
        </svg>
    </div>
</template>