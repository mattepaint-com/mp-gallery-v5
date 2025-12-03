<script setup lang="ts">
const searchQuery = ref('')

interface Breadcrumb {
  label: string
  to?: string
}

defineProps<{
  breadcrumbs?: Breadcrumb[]
}>()
</script>

<template>
  <header class="sticky top-0 z-40 flex flex-col bg-black/80 backdrop-blur-md border-b border-zinc-800">
    <div class="px-8 py-4 flex items-center justify-between">
      <!-- Search Bar -->
      <div class="relative w-full max-w-4xl group">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
        <input 
          v-model="searchQuery"
          type="text" 
          class="block w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-md leading-5 bg-zinc-900/50 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:bg-zinc-900 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 sm:text-sm transition-all duration-200" 
          placeholder="Search HDRIs..." 
        />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span class="text-zinc-600 text-xs border border-zinc-700 rounded px-1.5 py-0.5">⌘K</span>
        </div>
      </div>

      <!-- Auth Links -->
      <div class="flex items-center space-x-6 text-sm font-medium ml-6">
        <a href="#" class="text-zinc-400 hover:text-zinc-100 transition-colors">Log in</a>
        <a href="#" class="bg-zinc-100 text-zinc-900 hover:bg-white px-4 py-2 rounded-md transition-colors">
          Register
        </a>
      </div>
    </div>

    <!-- Breadcrumbs Sub-nav -->
    <div v-if="breadcrumbs?.length" class="w-full border-t border-zinc-800 bg-zinc-950/50 px-8 py-2">
      <nav class="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
          <NuxtLink 
            v-if="crumb.to" 
            :to="crumb.to" 
            class="hover:text-white transition-colors flex items-center gap-1.5"
          >
            {{ crumb.label }}
          </NuxtLink>
          <span v-else class="text-zinc-300">{{ crumb.label }}</span>
          
          <span v-if="index < breadcrumbs.length - 1" class="text-zinc-700">/</span>
        </template>
      </nav>
    </div>
  </header>
</template>
