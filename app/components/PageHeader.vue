<script setup lang="ts">
defineProps<{
  title: string
  description: string
  backgroundImage: string
}>()
</script>

<template>
  <div class="relative h-64 w-full rounded-md overflow-hidden mb-2 group">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img 
        :src="backgroundImage" 
        alt="Header Background" 
        class="w-full h-full object-cover"
      />
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 max-w-4xl">
      <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
        {{ title }}
      </h1>
      <p class="text-lg md:text-xl text-zinc-200 max-w-2xl font-light leading-relaxed">
        {{ description }}
      </p>
    </div>
  </div>
</template>
