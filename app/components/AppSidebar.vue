<script setup lang="ts">
import { PhSquaresFour, PhCube, PhCloudSun, PhCamera, PhDownloadSimple, PhFolders, PhHeart, PhCaretDown } from '@phosphor-icons/vue'

const isOpen = ref(false)
const isHdrisOpen = ref(false)
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
  }, 250)
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

  // When the sidebar collapses, also collapse HDRI submenus
  if (!val) {
    isHdrisOpen.value = false
  }

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
        <NuxtLink
          to="/hdris"
          class="relative group flex items-center px-2 py-2 text-gray-400 hover:bg-zinc-900 hover:text-gray-200 rounded-md cursor-pointer"
          @click.prevent="isHdrisOpen = !isHdrisOpen"
        >
          <PhSquaresFour :size="20" weight="regular" class="flex-shrink-0" />
          <span class="ml-3 overflow-hidden whitespace-nowrap transition-opacity duration-300" :class="isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'">HDRIs</span>
          <!-- Caret indicator -->
          <PhCaretDown
            :size="16"
            weight="regular"
            class="ml-auto transition-transform duration-200"
            :class="isHdrisOpen ? '' : '-rotate-90'"
          />
          <span
            v-if="!isOpen"
            class="pointer-events-none absolute left-full ml-2 px-2 py-1 rounded bg-zinc-900 text-gray-200 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg border border-zinc-800"
          >
            HDRIs
          </span>
        </NuxtLink>
        <!-- HDRIs Sub-menu -->
        <a
          v-if="isHdrisOpen"
          href="#"
          class="ml-10 flex items-center gap-2 px-2 py-1 text-xs text-zinc-500 hover:text-gray-200 hover:bg-zinc-900/60 rounded-md transition-colors"
        >
          <span class="w-px h-3 bg-zinc-700 rounded-full"></span>
          <span class="truncate">Location HDRIs</span>
        </a>
        <NuxtLink
          to="/scans"
          class="relative group flex items-center px-2 py-2 text-gray-400 hover:bg-zinc-900 hover:text-gray-200 rounded-md"
        >
          <PhCube :size="20" weight="regular" class="flex-shrink-0" />
          <span class="ml-3 overflow-hidden whitespace-nowrap transition-opacity duration-300" :class="isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'">Scans</span>
          <span
            v-if="!isOpen"
            class="pointer-events-none absolute left-full ml-2 px-2 py-1 rounded bg-zinc-900 text-gray-200 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg border border-zinc-800"
          >
            Scans
          </span>
        </NuxtLink>
        <a
          href="#"
          class="relative group flex items-center px-2 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-gray-200 rounded-md"
        >
          <PhCloudSun :size="20" weight="regular" class="flex-shrink-0" />
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
          <PhCamera :size="20" weight="regular" class="flex-shrink-0" />
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
          <PhDownloadSimple :size="20" weight="regular" class="flex-shrink-0" />
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
          <PhFolders :size="20" weight="regular" class="flex-shrink-0" />
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
          <PhHeart :size="20" weight="regular" class="flex-shrink-0" />
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
