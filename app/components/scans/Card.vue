<script setup lang="ts">
const props = defineProps<{
  title: string
  videoUrl: string
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const isHovering = ref(false)
const currentTimeDisplay = ref("00:00")

let lastUpdate = 0

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

const onMouseMove = (e: MouseEvent) => {
  const video = videoRef.value
  if (!video || !Number.isFinite(video.duration)) return

  const now = performance.now()
  // Throttle to ~60fps to reduce jumpiness and CPU load
  if (now - lastUpdate < 16) return
  lastUpdate = now

  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = e.clientX - rect.left
  const percent = Math.max(0, Math.min(1, x / rect.width))

  const targetTime = video.duration * percent
  // Ease toward target instead of snapping directly
  const current = video.currentTime
  const eased = current + (targetTime - current) * 0.35
  video.currentTime = eased

  currentTimeDisplay.value = formatTime(video.currentTime)
}

const onMouseEnter = () => {
  isHovering.value = true
}

const onMouseLeave = () => {
  isHovering.value = false
}
</script>

<template>
  <div 
    class="relative group w-full aspect-[16/9] bg-gray-900 overflow-hidden rounded-md block cursor-crosshair border border-zinc-800 hover:border-zinc-600 transition-colors"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- Video -->
    <video 
      ref="videoRef"
      :src="videoUrl" 
      class="absolute inset-0 w-full h-full object-cover"
      muted
      loop
      playsinline
      preload="auto"
    />

    <!-- Overlay Title -->
    <div class="absolute top-4 left-4 z-20 pointer-events-none">
      <h3 class="text-sm font-mono font-bold text-lg drop-shadow-md text-white">
        {{ title }}
      </h3>
    </div>

    <!-- Scrubbing Hint / Footer -->
    <div 
      class="absolute bottom-0 left-0 right-0 bg-black/80 text-xs text-gray-300 p-2 flex justify-between items-center z-20 pointer-events-none transition-all duration-200"
      :class="isHovering ? 'translate-y-0' : 'translate-y-full'"
    >
       <span class="uppercase text-[10px] tracking-widest text-gray-500">Scrub to preview</span>
       <span class="font-mono text-white">{{ currentTimeDisplay }}</span>
    </div>
  </div>
</template>
