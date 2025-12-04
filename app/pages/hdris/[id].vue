<script setup lang="ts">
    import type { Hdri, HdriFrame } from "~/types/hdri";

    const route = useRoute();
    const { fetchById } = useHdri();
    const breadcrumbs = useBreadcrumbs();

    const hdri = ref<Hdri | undefined>(undefined);
    const loading = ref(true);
    const selectedFrame = ref<HdriFrame | undefined>(undefined);
    const hoverFrame = ref<HdriFrame | undefined>(undefined);
    const showHeroTitle = ref(true);

    const resolutions = [
        { label: "2,000px", value: "2000px" },
        { label: "4,000px", value: "4000px" },
        { label: "8,000px", value: "8000px" },
    ];

    const formats = [
        { label: "JPG", value: "jpg" },
        { label: "EXR", value: "exr" },
    ];

    const selectedResolution = ref(resolutions[1] ?? resolutions[0]);
    const selectedFormat = ref(formats[1] ?? formats[0]);

    const resolutionSelect = ref<HTMLSelectElement | null>(null);
    const formatSelect = ref<HTMLSelectElement | null>(null);

    const openSelect = (el: HTMLSelectElement | null) => {
        if (!el) return;
        const anyEl = el as any;
        if (typeof anyEl.showPicker === "function") {
            anyEl.showPicker();
        } else {
            el.focus();
            el.click();
        }
    };

    const currentFrame = computed(() => {
        return hoverFrame.value ?? selectedFrame.value ?? undefined;
    });

    const downloadMeta = computed(() => {
        if (
            !selectedFrame.value ||
            !selectedResolution.value ||
            !selectedFormat.value
        )
            return "";
        return `Frame x${selectedFrame.value.frame} ${selectedResolution.value.label} ${selectedFormat.value.label}`;
    });

    onMounted(async () => {
        const id = parseInt(route.params.id as string);
        if (!isNaN(id)) {
            hdri.value = await fetchById(id);
            if (hdri.value?.frames?.length) {
                selectedFrame.value = hdri.value.frames[0];
            }
        }
        loading.value = false;
        setTimeout(() => {
            showHeroTitle.value = false;
        }, 1500);
    });

    const back = () => {
        navigateTo("/hdris");
    };

    const selectFrame = (frame: HdriFrame) => {
        selectedFrame.value = frame;
        hoverFrame.value = frame;
    };

    watchEffect(() => {
        if (!hdri.value) {
            breadcrumbs.value = [];
            return;
        }

        breadcrumbs.value = [
            { label: "HDRIs", to: "/hdris" },
            { label: hdri.value.title },
        ];
    });
</script>

<template>
    <div
        v-if="loading"
        class="flex items-center justify-center h-screen bg-zinc-950"
    >
        <AppLoading label="Loading HDRIs" :rows="3" />
    </div>

    <div
        v-else-if="!hdri"
        class="flex flex-col items-center justify-center h-screen bg-zinc-950"
    >
        <div class="text-zinc-400 text-lg mb-2">HDRI Not Found</div>
        <div class="text-zinc-600">
            The requested HDRI could not be located.
        </div>
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
                    v-if="currentFrame"
                    :src="currentFrame.preview.url"
                    class="w-full h-full object-cover"
                    :alt="hdri.title"
                />

                <!-- Gradient Overlay -->
                <div
                    class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"
                ></div>

                <!-- Transient Hero Title -->
                <div
                    v-if="hdri"
                    class="absolute top-8 left-8 z-20 pointer-events-none"
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
                            Sky HDRI
                        </span>
                        <h1
                            class="text-lg md:text-2xl font-semibold text-white leading-tight"
                        >
                            {{ hdri.title }}
                      
                        </h1>
                    </div>
                </div>
            </div>

            <!-- Hero Content Overlay -->
            <div
                class="absolute bottom-0 left-0 w-full pb-8 pt-32 z-10 bg-gradient-to-t from-black via-black/50 to-transparent"
            >
                <div class="w-full mx-auto">
                    <!-- Full Width Scrubber -->
                    <div class="max-w-7xl mx-auto px-8 py-12 mt-8">
                        <div
                            class="relative h-36 rounded-md overflow-hidden border border-white/20 bg-zinc-900/50 backdrop-blur-sm shadow-2xl ring-1 ring-black/50 group/scrubber transform translate-y-1/2"
                        >
                            <!-- Single Preview Image -->
                            <img
                                v-if="currentFrame"
                                :src="currentFrame.preview.url"
                                class="w-full h-full object-cover"
                                :alt="`Frame ${currentFrame.frame}`"
                            />

                            <!-- Scrub Interaction Layer -->
                            <div
                                class="absolute inset-0 flex w-full h-full z-10 cursor-crosshair"
                                @mouseleave="hoverFrame = undefined"
                            >
                                <div
                                    v-for="frame in hdri.frames"
                                    :key="frame.frame"
                                    class="relative flex-1 h-full transition-colors"
                                    :class="{
                                        // Keep selected visual on the last clicked frame only
                                        'bg-emerald-400/25': selectedFrame && frame.frame === selectedFrame.frame,
                                        'hover:bg-white/10': !selectedFrame || frame.frame !== selectedFrame.frame
                                    }"
                                    @mouseenter="hoverFrame = frame"
                                    @click="selectFrame(frame)"
                                >
                                    <!-- Selected frame indicator -->
                                    <div
                                        v-if="selectedFrame && frame.frame === selectedFrame.frame"
                                        class="absolute inset-x-0 top-0 h-0.5 bg-blue-400/80 shadow-[0_0_8px_rgba(59,130,246,0.7)] pointer-events-none"
                                    ></div>
                                </div>
                            </div>

                            <!-- Info Overlay -->
                            <div
                                class="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-mono text-white/90 pointer-events-none opacity-0 group-hover/scrubber:opacity-100 transition-opacity"
                            >
                                FRAME {{ currentFrame?.frame }}
                            </div>
                        </div>

                        <div
                            class="text-center mt-8 text-xs font-mono text-zinc-500 tracking-widest uppercase opacity-60"
                        >
                            Scrub to preview sequence
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content Grid -->
        <div class="max-w-7xl mx-auto px-8 py-2">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <!-- Left Column: Tech Specs -->
                <div class="lg:col-span-3 space-y-6">
                    <!-- Selected Frame Specs -->
                    <div
                        class="bg-zinc-900/40 rounded-md border border-zinc-800 p-5"
                    >
                        <h3
                            class="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em] mb-4"
                        >
                            Selected Frame
                        </h3>
                        <div v-if="selectedFrame" class="space-y-3 text-base">
                            <div class="flex justify-between items-center">
                                <span class="text-zinc-400">Frame</span>
                                <span class="font-mono text-gray-300">{{
                                    selectedFrame.frame
                                }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-zinc-400">Elevation</span>
                                <span class="font-mono text-gray-300"
                                    >{{ selectedFrame.elevation }}º</span
                                >
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-zinc-400">Time</span>
                                <span class="font-mono text-gray-300">{{
                                    selectedFrame.time
                                }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-zinc-400">Luma</span>
                                <span class="font-mono text-gray-300">{{
                                    selectedFrame.luma
                                }}</span>
                            </div>
                        </div>
                        <div v-else class="text-xs text-zinc-500">
                            Hover or scrub the timeline to inspect a frame.
                        </div>
                    </div>

                    <!-- Sequence Specs -->
                    <div
                        class="bg-zinc-900/30 rounded-md border border-zinc-800 p-5"
                    >
                        <h3
                            class="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em] mb-4"
                        >
                            Sequence Specs
                        </h3>

                        <div class="space-y-3 text-base">
                            <div
                                class="flex justify-between items-center border-b border-zinc-800/50 pb-2"
                            >
                                <span class="text-zinc-400"
                                    >Elevation Range</span
                                >
                                <span class="font-mono text-gray-300"
                                    >{{ hdri.elevationRange }}º</span
                                >
                            </div>
                            <div
                                class="flex justify-between items-center border-b border-zinc-800/50 pb-2"
                            >
                                <span class="text-zinc-400">Time Range</span>
                                <span class="font-mono text-gray-300">{{
                                    hdri.timeRange
                                }}</span>
                            </div>
                            <div
                                class="flex justify-between items-center border-b border-zinc-800/50 pb-2"
                            >
                                <span class="text-zinc-400">Luma Range</span>
                                <span class="font-mono text-gray-300">{{
                                    hdri.lumaRange
                                }}</span>
                            </div>
                            <div
                                class="flex justify-between items-center border-b border-zinc-800/50 pb-2"
                            >
                                <span class="text-zinc-400">Total Frames</span>
                                <span class="font-mono text-gray-300">{{
                                    hdri.frames.length
                                }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-zinc-400">Resolution</span>
                                <span class="font-mono text-gray-300">8K</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Middle Column: Info & Description -->
                <div class="lg:col-span-6 space-y-8">
                    <div>
                        <div class="flex items-center gap-3 mb-4">
                            <span
                                class="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono rounded-md uppercase tracking-wider"
                            >
                                Sky HDRI
                            </span>
                        </div>

                        <h1
                            class="text-4xl font-bold text-white mb-4 tracking-tight"
                        >
                            {{ hdri.title }}
                            <span
                                v-if="selectedFrame"
                                class="text-zinc-400 font-sans font-medium text-lg ml-1"
                            >
                                x{{ selectedFrame.frame }}
                            </span>
                        </h1>

                        <!-- Global Specs Strip -->
                        <div class="flex flex-wrap gap-2 mb-6">
                            <span
                                class="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[10px] text-zinc-400 uppercase tracking-wider font-medium"
                                >Unclipped Sunlight</span
                            >
                            <span
                                class="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[10px] text-zinc-400 uppercase tracking-wider font-medium"
                                >Unclipped EVs</span
                            >
                            <span
                                class="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[10px] text-zinc-400 uppercase tracking-wider font-medium"
                                >5600K White Balance</span
                            >
                        </div>

                        <p class="text-base text-zinc-400 leading-relaxed">
                            {{ hdri.longDescription }}
                        </p>
                    </div>

                    <div
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
                            Metadata
                        </h4>
                        <p class="text-sm text-blue-200/70 leading-relaxed">
                            Our HDRIs ship with EXR metadata for sun elevation,
                            sun intensity, frame, sequence and time of day. Time
                            of day is mapped from 12pm (90°) to 6pm (0°). Each
                            EXR also includes an
                            <span
                                class="font-mono text-xs bg-blue-500/10 border border-blue-500/30 rounded-md px-1 py-0.5"
                                >mp_sunmask</span
                            >
                            channel for quickly fine-tuning sun intensity.
                        </p>
                    </div>
                </div>

                <!-- Right Column: Download -->
                <div class="lg:col-span-3">
                    <div class="sticky top-32 space-y-4">
                        <!-- Resolution / Format Selector Button -->
                        <div
                            class="w-full bg-zinc-900 text-zinc-100 hover:bg-zinc-800 border border-zinc-700 font-medium text-sm rounded-md transition-colors flex items-stretch justify-between shadow-md shadow-black/40 overflow-hidden"
                        >
                            <!-- Resolution (left) -->
                            <div
                                class="flex-1 border-r border-zinc-700/80 cursor-pointer"
                                @click="openSelect(resolutionSelect)"
                            >
                                <label
                                    for="resolution-select"
                                    class="block px-3 pt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400 cursor-pointer"
                                >
                                    Resolution
                                </label>
                                <div class="relative px-3 pb-2">
                                    <select
                                        ref="resolutionSelect"
                                        id="resolution-select"
                                        v-model="selectedResolution"
                                        class="w-full bg-transparent text-sm font-semibold text-zinc-100 appearance-none pr-6 focus:outline-none cursor-pointer"
                                    >
                                        <option
                                            v-for="option in resolutions"
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

                            <!-- Format (right) -->
                            <div
                                class="flex-1 cursor-pointer"
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
                                            v-for="option in formats"
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
                        </div>

                        <!-- Download Preview -->
                        <div
                            v-if="selectedFrame"
                            class="mt-3 rounded-md overflow-hidden border border-zinc-800 bg-zinc-900/70 relative"
                        >
                            <img
                                :src="selectedFrame.preview.url"
                                class="w-full h-28 object-cover"
                                :alt="`Download preview frame ${selectedFrame.frame}`"
                            />
                            <div
                                v-if="downloadMeta"
                                class="absolute inset-x-0 bottom-0 bg-black/80 px-3 py-1 text-[11px] text-zinc-200 font-mono flex items-center justify-between"
                            >
                                <span class="uppercase tracking-[0.18em] text-[9px] text-zinc-400">
                                    Selected
                                </span>
                                <span class="truncate">
                                    {{ downloadMeta }}
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
                            <span>Download frame</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
