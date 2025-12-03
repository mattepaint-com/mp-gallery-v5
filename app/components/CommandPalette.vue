<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const query = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

// Focus input when opening
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

const close = () => {
  emit('update:modelValue', false)
  query.value = ''
}

// Close on Escape
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

// Mock results
const filteredResults = computed(() => {
  if (!query.value) return []
  
  const q = query.value.toLowerCase()
  const allItems = [
    { id: 1, title: 'Sunset Over Hills', type: 'HDRI' },
    { id: 2, title: 'Midday Clear Sky', type: 'HDRI' },
    { id: 3, title: 'Sequence 001', type: 'HDRI' },
    { id: 4, title: 'Sequence 002', type: 'HDRI' },
    { id: 5, title: 'Sequence 003', type: 'HDRI' },
  ]
  
  return allItems.filter(item => item.title.toLowerCase().includes(q))
})
</script>

<template>
  <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close"></div>

    <!-- Modal -->
    <div class="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">
      <!-- Search Input -->
      <div class="flex items-center border-b border-zinc-800 p-4">
        <svg class="w-5 h-5 text-zinc-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          ref="searchInput"
          v-model="query"
          type="text" 
          placeholder="Search..." 
          class="flex-1 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none text-lg"
        />
        <button @click="close" class="text-zinc-500 hover:text-zinc-300 text-sm border border-zinc-700 rounded px-1.5">ESC</button>
      </div>

      <!-- Results -->
      <div v-if="query" class="max-h-[60vh] overflow-y-auto p-2">
        <div v-if="filteredResults.length === 0" class="p-4 text-center text-zinc-500">
          No results found for "{{ query }}"
        </div>
        <div v-else class="space-y-1">
          <button 
            v-for="result in filteredResults" 
            :key="result.id"
            class="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-800 flex items-center justify-between group transition-colors"
          >
            <span class="text-zinc-200 group-hover:text-white">{{ result.title }}</span>
            <span class="text-xs text-zinc-500 uppercase tracking-wider border border-zinc-700 rounded px-1.5 py-0.5">{{ result.type }}</span>
          </button>
        </div>
      </div>
      <div v-else class="p-8 text-center text-zinc-500 text-sm">
        Type to search for HDRIs...
      </div>
    </div>
  </div>
</template>
