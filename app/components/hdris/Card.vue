<script setup lang="ts">
import type { Hdri } from '~/types/hdri'

const props = defineProps<{
  hdri: Hdri
}>()

// State
const currentFrameIndex = ref(0)
const isHovering = ref(false)

// Computed
const currentFrame = computed(() => props.hdri.frames[currentFrameIndex.value])
const imageUrl = computed(() => currentFrame.value?.preview.url)

// Actions
const onHover = (index: number) => {
  currentFrameIndex.value = index
  isHovering.value = true
}

const onLeave = () => {
  isHovering.value = false
  // Optional: Reset to first frame on leave?
  // currentFrameIndex.value = 0
}
</script>

<template>
  <NuxtLink 
    :to="`/hdris/${hdri.id}`"
    class="relative group w-full aspect-[16/6] bg-gray-900 overflow-hidden rounded-md block"
    @mouseleave="onLeave"
  >
    <!-- Background Image -->
    <img 
      :src="imageUrl" 
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-75"
      alt="HDRI Preview"
    />

    <!-- Overlay Title -->
    <div class="absolute top-4 left-4 z-20">
      <h3 class="text-white font-bold text-lg drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
        {{ hdri.title }}
      </h3>
    </div>

    <!-- Scrubbing Interaction Layer -->
    <!-- We create invisible columns, one for each frame -->
    <div class="absolute inset-0 z-10 flex w-full h-full">
      <div 
        v-for="(frame, index) in hdri.frames" 
        :key="frame.frame"
        class="h-full flex-1 hover:bg-white/10 border-l border-transparent hover:border-white/20 transition-colors"
        @mousemove="onHover(index)"
      ></div>
    </div>

    <!-- Footer Info -->
    <div class="absolute bottom-0 left-0 right-0 bg-black/80 text-xs text-gray-300 p-2 flex justify-between items-center z-20">
      <div>
        <span class="block text-gray-500 uppercase text-[10px]">Elevation</span>
        <span class="text-gray-100">{{ currentFrame?.elevation }}º</span>
      </div>
      <div>
        <span class="block text-gray-500 uppercase text-[10px]">Time</span>
        <span class="text-gray-100">{{ currentFrame?.time }}</span>
      </div>
      <div>
        <span class="block text-gray-500 uppercase text-[10px]">Luma</span>
        <span class="text-gray-100">{{ currentFrame?.luma }}</span>
      </div>
      <div>
        <span class="block text-gray-500 uppercase text-[10px]">Frame</span>
        <span class="text-gray-100">{{ currentFrame?.frame }}</span>
      </div>
    </div>
  </NuxtLink>
</template>