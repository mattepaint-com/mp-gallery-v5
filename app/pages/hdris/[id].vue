<script setup lang="ts">
import type { Hdri, HdriFrame } from '~/types/hdri'

const route = useRoute()
const { fetchById } = useHdri()

const hdri = ref<Hdri | undefined>(undefined)
const loading = ref(true)
const selectedFrame = ref<HdriFrame | undefined>(undefined)

onMounted(async () => {
  const id = parseInt(route.params.id as string)
  if (!isNaN(id)) {
    hdri.value = await fetchById(id)
    if (hdri.value?.frames?.length) {
      selectedFrame.value = hdri.value.frames[0]
    }
  }
  loading.value = false
})

const back = () => {
  navigateTo('/hdris')
}

const selectFrame = (frame: HdriFrame) => {
  selectedFrame.value = frame
}

const breadcrumbs = computed(() => {
  if (!hdri.value) return []
  return [
    { label: 'HDRIs', to: '/hdris' },
    { label: hdri.value.title }
  ]
})
</script>

<template>
  <AppHeader :breadcrumbs="breadcrumbs" />

  <div v-if="loading" class="flex items-center justify-center h-screen bg-zinc-950">
    <div class="text-zinc-500">Loading HDRI details...</div>
  </div>

  <div v-else-if="!hdri" class="flex flex-col items-center justify-center h-screen bg-zinc-950">
    <div class="text-zinc-400 text-lg mb-2">HDRI Not Found</div>
    <div class="text-zinc-600">The requested HDRI could not be located.</div>
    <button 
      @click="back"
      class="mt-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded transition-colors"
    >
      Return to Gallery
    </button>
  </div>

  <div v-else class="bg-zinc-950 min-h-screen">
    <!-- Hero Section -->
    <div class="relative w-full h-[75vh] bg-black group">
      
      <!-- Main Hero Image -->
      <div class="w-full h-full relative overflow-hidden">
        <img 
          v-if="selectedFrame"
          :src="selectedFrame.preview.url" 
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          :alt="hdri.title"
        />
        
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
      </div>

      <!-- Hero Content Overlay -->
      <div class="absolute bottom-0 left-0 w-full px-8 pb-8 pt-32 z-10 bg-gradient-to-t from-black via-black/50 to-transparent">
        <div class="w-full mx-auto">
          
          <!-- Full Width Scrubber -->
          <div class="w-[85%] mx-auto px-4 sm:px-8">
            <div class="relative h-36 rounded-md overflow-hidden border border-white/20 bg-zinc-900/50 backdrop-blur-sm shadow-2xl ring-1 ring-black/50 group/scrubber transform translate-y-1/2">
              <!-- Single Preview Image -->
              <img 
                v-if="selectedFrame"
                :src="selectedFrame.preview.url" 
                class="w-full h-full object-cover" 
                :alt="`Frame ${selectedFrame.frame}`"
              />

              <!-- Scrub Interaction Layer -->
              <div class="absolute inset-0 flex w-full h-full z-10 cursor-crosshair">
                <div 
                  v-for="frame in hdri.frames"
                  :key="frame.frame"
                  class="flex-1 h-full hover:bg-white/10 transition-colors"
                  @mouseenter="selectFrame(frame)"
                  @click="selectFrame(frame)"
                ></div>
              </div>
              
              <!-- Info Overlay -->
               <div class="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-mono text-white/90 pointer-events-none opacity-0 group-hover/scrubber:opacity-100 transition-opacity">
                 FRAME {{ selectedFrame?.frame }}
               </div>
            </div>
            
            <div class="text-center mt-8 text-xs font-mono text-zinc-500 tracking-widest uppercase opacity-60">
              Scrub to preview sequence
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="max-w-7xl mx-auto px-8 py-12 mt-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- Left Column: Tech Specs -->
        <div class="lg:col-span-3 space-y-8">
          <div class="bg-zinc-900/30 rounded-2xl border border-zinc-800 p-6 sticky top-32">
            <h3 class="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-6">Specs</h3>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center py-3 border-b border-zinc-800/50">
                <span class="text-zinc-400 text-sm">Elevation</span>
                <span class="font-mono text-white text-sm">{{ hdri.elevationRange }}º</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-zinc-800/50">
                <span class="text-zinc-400 text-sm">Time</span>
                <span class="font-mono text-white text-sm">{{ hdri.timeRange }}</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-zinc-800/50">
                <span class="text-zinc-400 text-sm">Luma</span>
                <span class="font-mono text-white text-sm">{{ hdri.lumaRange }}</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-zinc-800/50">
                <span class="text-zinc-400 text-sm">Frames</span>
                <span class="font-mono text-white text-sm">{{ hdri.frames.length }}</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-zinc-800/50">
                <span class="text-zinc-400 text-sm">Res</span>
                <span class="font-mono text-white text-sm">8K</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Middle Column: Info & Description -->
        <div class="lg:col-span-6 space-y-8">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <span class="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono rounded uppercase tracking-wider">
                Sky HDRI Sequence
              </span>
            </div>
            
            <h1 class="text-4xl font-bold text-white mb-6 tracking-tight">{{ hdri.title }}</h1>
            <p class="text-base text-zinc-400 leading-relaxed">{{ hdri.longDescription }}</p>
          </div>

          <div class="p-6 bg-blue-600/10 rounded-2xl border border-blue-500/20">
            <h4 class="text-blue-200 font-medium mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              Pro Tip
            </h4>
            <p class="text-sm text-blue-200/70 leading-relaxed">
              Use the frame sequence to find the perfect lighting angle for your shot. All frames are captured in 32-bit float.
            </p>
          </div>
        </div>
        
        <!-- Right Column: Download -->
        <div class="lg:col-span-3">
           <button class="w-full bg-white text-black hover:bg-zinc-200 font-bold py-4 px-8 rounded-xl transition-colors flex items-center justify-center shadow-lg shadow-white/5 sticky top-32">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Sequence
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
