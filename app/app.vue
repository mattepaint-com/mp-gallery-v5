<script setup lang="ts">
const isSidebarOpen = ref(false)
const isCommandPaletteOpen = ref(false)

// Global keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      isCommandPaletteOpen.value = !isCommandPaletteOpen.value
    }
  })
})
</script>

<template>
  <!-- Command pallete -->
  <div class="bg-zinc-900 min-h-screen flex">
    <NuxtRouteAnnouncer />
    <CommandPalette v-model="isCommandPaletteOpen" />
    <AppSidebar @toggle="isSidebarOpen = $event" />
    <main 
      class="flex-1 transition-all duration-300"
      :class="isSidebarOpen ? 'ml-64' : 'ml-16'"
    >
      <div class="min-h-screen bg-black text-white">
        <AppHeader />
        <NuxtPage />
      </div>
    </main>
  </div>
</template>
