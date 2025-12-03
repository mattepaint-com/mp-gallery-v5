<script setup lang="ts">
const isOpen = ref(false)
let openTimeout: number | null = null
let closeTimeout: number | null = null
let logoTimeout: number | null = null
const showExpandedLogo = ref(isOpen.value)

const emit = defineEmits<{
  (e: 'toggle', value: boolean): void
}>()

const handleMouseEnter = () => {
  if (closeTimeout !== null) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }

  if (openTimeout !== null) {
    clearTimeout(openTimeout)
  }

  // Delay opening so quick, accidental passes over the sidebar
  // don't immediately expand it.
  openTimeout = window.setTimeout(() => {
    isOpen.value = true
  }, 300)
}

const handleMouseLeave = () => {
  if (openTimeout !== null) {
    clearTimeout(openTimeout)
    openTimeout = null
  }

  if (closeTimeout !== null) {
    clearTimeout(closeTimeout)
  }
  closeTimeout = window.setTimeout(() => {
    isOpen.value = false
  }, 150)
}

watch(isOpen, (val) => {
  emit('toggle', val)

  if (logoTimeout !== null) {
    clearTimeout(logoTimeout)
    logoTimeout = null
  }

  // Use a short, symmetric delay for both opening and closing so the
  // logo doesn't flicker during the width transition.
  logoTimeout = window.setTimeout(() => {
    showExpandedLogo.value = val
  }, 120)
})
</script>

<template>
  <!-- Hover Container with anticipatory buffer -->
  <div
    class="fixed left-0 top-0 h-screen z-50 flex"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <aside 
      class="h-full bg-zinc-950 text-gray-400 border-r border-zinc-800 transition-all duration-300 overflow-hidden relative"
      :class="isOpen ? 'w-64' : 'w-16'"
    >

      <!-- Content -->
      <div class="px-3 py-4 h-full flex flex-col">
      <!-- Logo Area -->
      <div class="h-12 flex items-center mb-8 overflow-hidden">
        <img 
          v-if="showExpandedLogo"
          src="/images/logos/logo-white-icon-text.svg" 
          alt="MattePaint" 
          class="h-8 w-auto transition-opacity duration-300 mx-auto"
        />
        <img 
          v-else
          src="/images/logos/logo-white-icon-only.png" 
          alt="MattePaint" 
          class="h-6 w-auto transition-opacity duration-300 mx-auto"
        />
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-2">
        <a
          href="#"
          class="relative group flex items-center px-2 py-2 text-gray-400 hover:bg-zinc-900 hover:text-gray-200 rounded-md"
        >
          <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
          <span class="ml-3 overflow-hidden whitespace-nowrap transition-opacity duration-300" :class="isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'">HDRIs</span>
          <span
            v-if="!isOpen"
            class="pointer-events-none absolute left-full ml-2 px-2 py-1 rounded bg-zinc-900 text-gray-200 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg border border-zinc-800"
          >
            HDRIs
          </span>
        </a>
        <a
          href="#"
          class="relative group flex items-center px-2 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-gray-200 rounded-md"
        >
          <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.8 14.5c.5.5 1.2 1.2 1.7 1.7 1.1 1.1 1.1 2.8 0 3.9-1.1 1.1-2.8 1.1-3.9 0-1.4-1.4-2.4-2.4-3.1-3.1-.7-.7-1.5-1-2.4-1.1l-2.1-.2c-1.4-.1-2.7-.8-3.6-1.9L3.1 8.5c-.4-.4-.4-1 0-1.4l4.4-4.4c.4-.4 1-.4 1.4 0l5.3 5.3c1.1.9 1.8 2.2 1.9 3.6l.2 2.1c.1.9.4 1.7 1.1 2.4z"/><path d="M14 10h.01"/></svg>
          <span class="ml-3 overflow-hidden whitespace-nowrap transition-opacity duration-300" :class="isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'">Sky Backplates</span>
          <span
            v-if="!isOpen"
            class="pointer-events-none absolute left-full ml-2 px-2 py-1 rounded bg-zinc-900 text-gray-200 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg border border-zinc-800"
          >
            Sky Backplates
          </span>
        </a>
        <a
          href="#"
          class="relative group flex items-center px-2 py-2 text-gray-400 hover:bg-zinc-900 hover:text-gray-200 rounded-md"
        >
          <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span class="ml-3 overflow-hidden whitespace-nowrap transition-opacity duration-300" :class="isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'">Photography</span>
          <span
            v-if="!isOpen"
            class="pointer-events-none absolute left-full ml-2 px-2 py-1 rounded bg-zinc-900 text-gray-200 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg border border-zinc-800"
          >
            Photography
          </span>
        </a>
      </nav>

      <!-- Divider -->
      <div class="h-px bg-zinc-800 my-4"></div>

      <!-- User Links -->
      <nav class="space-y-2 mb-4">
        <a
          href="#"
          class="relative group flex items-center px-2 py-2 text-gray-400 hover:bg-zinc-900 hover:text-gray-200 rounded-md"
        >
          <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span class="ml-3 overflow-hidden whitespace-nowrap transition-opacity duration-300" :class="isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'">My Downloads</span>
          <span
            v-if="!isOpen"
            class="pointer-events-none absolute left-full ml-2 px-2 py-1 rounded bg-zinc-900 text-gray-200 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg border border-zinc-800"
          >
            My Downloads
          </span>
        </a>
        <a
          href="#"
          class="relative group flex items-center px-2 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-gray-200 rounded-md"
        >
          <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span class="ml-3 overflow-hidden whitespace-nowrap transition-opacity duration-300" :class="isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'">My Collections</span>
          <span
            v-if="!isOpen"
            class="pointer-events-none absolute left-full ml-2 px-2 py-1 rounded bg-zinc-900 text-gray-200 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg border border-zinc-800"
          >
            My Collections
          </span>
        </a>
        <a
          href="#"
          class="relative group flex items-center px-2 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-gray-200 rounded-md"
        >
          <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.28 3.6-2.33 3.6-4.7 0-2.22-1.7-4.1-4.2-4.1-1.8 0-3.1 1.34-4.4 3.35C12.7 6.54 11.4 5.2 9.6 5.2c-2.5 0-4.2 1.88-4.2 4.1 0 2.37 2.11 3.42 3.6 4.7"/><path d="M12 21.24c-4-4-5-5-9.6-9.64 0-2.75 2.24-5 5-5 1.5 0 2.88.74 3.76 1.87C12.04 7.34 13.42 6.6 14.92 6.6c2.76 0 5 2.25 5 5 0 4.64-1 5.64-5 9.64l-2.92 2.92Z"/></svg>
          <span class="ml-3 overflow-hidden whitespace-nowrap transition-opacity duration-300" :class="isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'">Favourites</span>
          <span
            v-if="!isOpen"
            class="pointer-events-none absolute left-full ml-2 px-2 py-1 rounded bg-zinc-900 text-gray-200 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg border border-zinc-800"
          >
            Favourites
          </span>
        </a>
      </nav>

      <!-- User Footer -->
      <div class="border-t border-zinc-800 pt-4 flex items-center overflow-hidden whitespace-nowrap">
        <div class="w-8 h-8 bg-zinc-800 rounded-full flex-shrink-0"></div>
        <div class="ml-3 transition-opacity duration-300" :class="isOpen ? 'opacity-100' : 'opacity-0'">
          <p class="text-sm font-medium text-gray-300">User Name</p>
          <p class="text-xs text-gray-400">user@example.com</p>
        </div>
      </div>
      </div>
    </aside>

    <!-- Invisible anticipatory hover buffer -->
    <div
      v-if="!isOpen"
      class="w-8 h-full bg-transparent"
    ></div>
  </div>

</template>
