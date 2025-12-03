<template>
  <div class="w-full flex flex-col items-center justify-center py-16">
    <!-- Spinner -->
    <div class="flex items-center gap-3">
      <div class="h-4 w-4 border border-zinc-700 border-t-zinc-300 rounded-full animate-spin"></div>
      <span class="text-xs font-mono tracking-widest uppercase text-zinc-500">
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Loading',
  rows: 4,
})

const { label, rows } = toRefs(props)
</script>

<style scoped>
</style>
