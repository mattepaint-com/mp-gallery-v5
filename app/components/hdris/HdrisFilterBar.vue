<script setup lang="ts">
// Filter state
const sortBy = ref('newest')
const resolution = ref('all')

// Continuous values
const elevation = ref(45) // Default mid
const time = ref(12) // Default noon

// Formatters
const formatTime = (val: number) => {
  const h = Math.floor(val)
  const m = Math.floor((val - h) * 60)
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-8 mb-8 py-6 border-b border-zinc-800">
    <!-- Label -->
    <div class="flex items-center text-zinc-400 mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/></svg>
      <span class="text-sm font-medium">Filter by</span>
    </div>

    <!-- Elevation Slider -->
    <div class="flex flex-col w-64 space-y-1">
      <div class="flex justify-between text-sm text-zinc-400">
        <span>Elevation</span>
        <span class="text-zinc-200">{{ elevation }}º</span>
      </div>
      <input 
        v-model.number="elevation"
        type="range" 
        min="-10" 
        max="90" 
        step="1"
        class="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-200"
      />
      <div class="flex justify-between text-xs text-zinc-600">
        <span>-10º</span>
        <span>90º</span>
      </div>
    </div>

    <!-- Time Slider -->
    <div class="flex flex-col w-64 space-y-1">
      <div class="flex justify-between text-sm text-zinc-400">
        <span>Time</span>
        <span class="text-zinc-200">{{ formatTime(time) }}</span>
      </div>
      <input 
        v-model.number="time"
        type="range" 
        min="0" 
        max="24" 
        step="0.5"
        class="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-200"
      />
      <div class="flex justify-between text-xs text-zinc-600">
        <span>00:00</span>
        <span>24:00</span>
      </div>
    </div>

    <div class="relative group">
      <select 
        v-model="resolution"
        class="appearance-none bg-zinc-900 border border-zinc-700 text-zinc-200 py-2 pl-4 pr-10 rounded-md text-sm focus:outline-none focus:border-zinc-500 hover:bg-zinc-800 transition-colors cursor-pointer"
      >
        <option value="all">Resolution: Any</option>
        <option value="14k">14k</option>
        <option value="20k">20k</option>
        <option value="50k">50k</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
      </div>
    </div>

    <!-- Spacer -->
    <div class="flex-1"></div>

    <!-- Sort -->
    <div class="flex items-center space-x-2">
      <span class="text-sm text-zinc-500">Sort:</span>
      <div class="relative group">
        <select 
          v-model="sortBy"
          class="appearance-none bg-transparent border-none text-zinc-300 py-2 pr-8 rounded-md text-sm focus:outline-none hover:text-white cursor-pointer font-medium"
        >
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>
    </div>
  </div>
</template>
