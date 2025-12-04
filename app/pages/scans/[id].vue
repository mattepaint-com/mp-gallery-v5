<script setup lang="ts">
import type { Scan } from '~/types/scan'

const route = useRoute()
const { fetchById } = useScans()
const breadcrumbs = useBreadcrumbs()

const scan = ref<Scan | undefined>(undefined)
const loading = ref(true)
const showHeroTitle = ref(true)
const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const isScrubbing = ref(false)
const scrubProgress = ref(0)
const currentTimeDisplay = ref('00:00')
const durationDisplay = ref('00:00')
let lastScrubUpdate = 0

const formats = [
  { label: 'FBX', value: 'fbx' },
  { label: 'OBJ', value: 'obj' },
  { label: 'USD', value: 'usd' },
  { label: 'PLY', value: 'ply' },
]

const selectedFormat = ref(formats[0])
const formatSelect = ref<HTMLSelectElement | null>(null)

const openSelect = (el: HTMLSelectElement | null) => {
  if (!el) return
  const anyEl = el as any
  if (typeof anyEl.showPicker === 'function') {
    anyEl.showPicker()
  } else {
    el.focus()
    el.click()
  }
}

const scanTypeLabel = computed(() => {
  if (!scan.value) return ''
  switch (scan.value.scanType) {
    case 'gaussian-splat': return 'Gaussian Splat'
    case 'photogrammetry': return 'Photogrammetry'
    case 'lidar': return 'LiDAR'
    default: return 'Scan'
  }
})

onMounted(async () => {
  const id = parseInt(route.params.id as string)
  if (!isNaN(id)) {
    scan.value = await fetchById(id)
  }
  loading.value = false
  setTimeout(() => {
    showHeroTitle.value = false
  }, 2500)
})

const back = () => {
  navigateTo('/scans')
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

const togglePlay = () => {
  const video = videoRef.value
  if (!video) return
  
  if (video.paused) {
    video.play()
    isPlaying.value = true
  } else {
    video.pause()
    isPlaying.value = false
  }
}

const onScrubMove = (e: MouseEvent) => {
  const video = videoRef.value
  if (!video || !Number.isFinite(video.duration)) return

  const now = performance.now()
  if (now - lastScrubUpdate < 16) return
  lastScrubUpdate = now

  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = e.clientX - rect.left
  const percent = Math.max(0, Math.min(1, x / rect.width))

  const targetTime = video.duration * percent
  const current = video.currentTime
  const eased = current + (targetTime - current) * 0.35
  video.currentTime = eased

  scrubProgress.value = percent * 100
  currentTimeDisplay.value = formatTime(video.currentTime)
}

const onScrubEnter = () => {
  isScrubbing.value = true
  const video = videoRef.value
  if (video && !video.paused) {
    video.pause()
  }
}

const onScrubLeave = () => {
  isScrubbing.value = false
}

const onVideoTimeUpdate = () => {
  const video = videoRef.value
  if (!video || isScrubbing.value) return
  
  if (Number.isFinite(video.duration)) {
    scrubProgress.value = (video.currentTime / video.duration) * 100
    currentTimeDisplay.value = formatTime(video.currentTime)
  }
}

const onVideoLoaded = () => {
  const video = videoRef.value
  if (video && Number.isFinite(video.duration)) {
    durationDisplay.value = formatTime(video.duration)
  }
}

watchEffect(() => {
  if (!scan.value) {
    breadcrumbs.value = []
    return
  }

  breadcrumbs.value = [
    { label: 'Scans', to: '/scans' },
    { label: scan.value.title },
  ]
})
</script>

<template>
  <div
    v-if="loading"
    class="flex items-center justify-center h-screen bg-zinc-950"
  >
    <AppLoading label="Loading Scan" :rows="3" />
  </div>

  <div
    v-else-if="!scan"
    class="flex flex-col items-center justify-center h-screen bg-zinc-950"
  >
    <div class="text-zinc-400 text-lg mb-2">Scan Not Found</div>
    <div class="text-zinc-600">
      The requested scan could not be located.
    </div>
    <button
      @click="back"
      class="mt-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded transition-colors"
    >
      Return to Gallery
    </button>
  </div>

  <div v-else class="bg-zinc-950 min-h-screen">
    <!-- Hero Section with Video -->
    <div class="relative w-full h-[75vh] bg-black group">
      <!-- Main Hero Video -->
      <div class="w-full h-full relative overflow-hidden">
        <video
          ref="videoRef"
          :src="scan.videoUrl"
          class="w-full h-full object-cover"
          muted
          loop
          playsinline
          autoplay
          @play="isPlaying = true"
          @pause="isPlaying = false"
          @timeupdate="onVideoTimeUpdate"
          @loadedmetadata="onVideoLoaded"
        />

        <!-- Gradient Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"
        ></div>

        <!-- Play/Pause Button -->
        <button
          @click="togglePlay"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <svg
            v-if="!isPlaying"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="white"
            stroke="none"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="white"
            stroke="none"
          >
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        </button>

        <!-- Transient Hero Title -->
        <div
          v-if="scan"
          class="absolute bottom-10 right-10 z-20 pointer-events-none"
        >
          <div
            class="inline-flex flex-col px-4 py-3 rounded-md bg-black/60 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-700"
            :class="
              showHeroTitle
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-2'
            "
          >
            <span
              class="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 mb-1"
            >
              3D Scan
            </span>
            <h1
              class="text-lg md:text-2xl font-semibold text-white leading-tight"
            >
              {{ scan.title }}
            </h1>
          </div>
        </div>
      </div>

    </div>

    <!-- Scrub Bar Section (below hero) -->
    <div class="bg-zinc-950 px-8 py-6">
      <div class="max-w-7xl mx-auto">
        <!-- Invisible hit area wrapper -->
        <div
          class="relative py-8 -my-8 cursor-crosshair group/scrub"
          @mousemove="onScrubMove"
          @mouseenter="onScrubEnter"
          @mouseleave="onScrubLeave"
        >
          <!-- Visible scrub line -->
          <div class="relative h-2 rounded-full bg-zinc-800">
            <!-- Progress fill -->
            <div 
              class="absolute inset-y-0 left-0 bg-zinc-500 rounded-full pointer-events-none"
              :style="{ width: `${scrubProgress}%` }"
            ></div>
            
            <!-- Scrub handle -->
            <div 
              class="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg pointer-events-none opacity-0 group-hover/scrub:opacity-100 transition-opacity"
              :style="{ left: `${scrubProgress}%`, marginLeft: '-8px' }"
            ></div>
          </div>
        </div>

        <!-- Time display -->
        <div class="flex justify-between mt-3 text-xs font-mono text-zinc-500">
          <span>{{ currentTimeDisplay }}</span>
          <span class="uppercase tracking-wider text-zinc-600">Scrub to preview</span>
          <span>{{ durationDisplay }}</span>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="max-w-7xl mx-auto px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Left Column: Tech Specs -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Scan Specs -->
          <div
            class="bg-zinc-900/40 rounded-md border border-zinc-800 p-5"
          >
            <h3
              class="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em] mb-4"
            >
              Technical Specs
            </h3>
            <div class="space-y-3 text-base">
              <div class="flex justify-between items-center">
                <span class="text-zinc-400">Type</span>
                <span class="font-mono text-gray-300">{{ scanTypeLabel }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-zinc-400">Poly Count</span>
                <span class="font-mono text-gray-300">{{ scan.polyCount }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-zinc-400">Textures</span>
                <span class="font-mono text-gray-300">{{ scan.textureResolution }}</span>
              </div>
              <div v-if="scan.location" class="flex justify-between items-center">
                <span class="text-zinc-400">Location</span>
                <span class="font-mono text-gray-300">{{ scan.location }}</span>
              </div>
            </div>
          </div>

          <!-- File Formats -->
          <div
            class="bg-zinc-900/30 rounded-md border border-zinc-800 p-5"
          >
            <h3
              class="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em] mb-4"
            >
              Available Formats
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="format in scan.fileFormats"
                :key="format"
                class="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-zinc-300"
              >
                {{ format }}
              </span>
            </div>
          </div>

          <!-- Tags -->
          <div
            class="bg-zinc-900/30 rounded-md border border-zinc-800 p-5"
          >
            <h3
              class="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em] mb-4"
            >
              Tags
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in scan.tags"
                :key="tag"
                class="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] text-zinc-400 uppercase tracking-wider"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Middle Column: Info & Description -->
        <div class="lg:col-span-6 space-y-8">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <span
                class="px-2 py-0.5 border text-[10px] font-mono rounded-md uppercase tracking-wider bg-blue-500/10 text-blue-400 border-blue-500/20"
              >
                {{ scanTypeLabel }}
              </span>
            </div>

            <h1
              class="text-4xl font-bold text-white mb-4 tracking-tight"
            >
              {{ scan.title }}
            </h1>

            <!-- Global Specs Strip -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                class="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[10px] text-zinc-400 uppercase tracking-wider font-medium"
              >{{ scan.polyCount }}</span>
              <span
                class="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[10px] text-zinc-400 uppercase tracking-wider font-medium"
              >{{ scan.textureResolution }} Textures</span>
              <span
                class="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[10px] text-zinc-400 uppercase tracking-wider font-medium"
              >{{ scan.fileFormats.length }} Formats</span>
            </div>

            <p class="text-base text-zinc-400 leading-relaxed">
              {{ scan.longDescription }}
            </p>
          </div>

          <div
            v-if="scan.scanType === 'gaussian-splat'"
            class="p-6 bg-purple-600/10 rounded-md border border-purple-500/20"
          >
            <h4
              class="text-purple-200 font-medium mb-2 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Gaussian Splat Format
            </h4>
            <p class="text-sm text-purple-200/70 leading-relaxed">
              This asset uses 3D Gaussian Splatting, a cutting-edge representation
              that enables real-time photorealistic rendering. Compatible with
              popular viewers and can be integrated into Unreal Engine, Unity,
              and web-based 3D viewers.
            </p>
          </div>

          <div
            v-else
            class="p-6 bg-blue-600/10 rounded-md border border-blue-500/20"
          >
            <h4
              class="text-blue-200 font-medium mb-2 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Mesh-Based Scan
            </h4>
            <p class="text-sm text-blue-200/70 leading-relaxed">
              This photogrammetry scan includes optimized geometry with
              PBR-ready texture maps (Diffuse, Normal, Roughness, AO).
              LODs are included for real-time applications. All meshes
              are watertight and ready for production use.
            </p>
          </div>
        </div>

        <!-- Right Column: Download -->
        <div class="lg:col-span-3">
          <div class="sticky top-32 space-y-4">
            <!-- Format Selector -->
            <div
              class="w-full bg-zinc-900 text-zinc-100 hover:bg-zinc-800 border border-zinc-700 font-medium text-sm rounded-md transition-colors shadow-md shadow-black/40 overflow-hidden cursor-pointer"
              @click="openSelect(formatSelect)"
            >
              <label
                for="format-select"
                class="block px-3 pt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400 cursor-pointer"
              >
                Format
              </label>
              <div class="relative px-3 pb-2">
                <select
                  ref="formatSelect"
                  id="format-select"
                  v-model="selectedFormat"
                  class="w-full bg-transparent text-sm font-semibold text-zinc-100 appearance-none pr-6 focus:outline-none cursor-pointer"
                >
                  <option
                    v-for="option in formats.filter(f => scan?.fileFormats.map(ff => ff.toLowerCase()).includes(f.value))"
                    :key="option.value"
                    :value="option"
                  >
                    {{ option.label }}
                  </option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center text-zinc-500 text-xs pr-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Download Preview -->
            <div
              class="mt-3 rounded-md overflow-hidden border border-zinc-800 bg-zinc-900/70 relative"
            >
              <video
                :src="scan.videoUrl"
                class="w-full h-28 object-cover"
                muted
                loop
                playsinline
                autoplay
              />
              <div
                class="absolute inset-x-0 bottom-0 bg-black/80 px-3 py-1 text-[11px] text-zinc-200 font-mono flex items-center justify-between"
              >
                <span class="uppercase tracking-[0.18em] text-[9px] text-zinc-400">
                  Selected
                </span>
                <span class="truncate">
                  {{ scan.title }} {{ selectedFormat?.label ?? '' }}
                </span>
              </div>
            </div>

            <!-- Download Button -->
            <button
              class="w-full bg-emerald-700 text-white hover:bg-emerald-800 font-bold py-4 px-8 rounded-md transition-colors flex items-center justify-center gap-2 shadow-lg shadow-white/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Scan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
