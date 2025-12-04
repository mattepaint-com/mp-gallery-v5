<template>
  <div class="px-8 pb-8 pt-6">
    <PageHeader 
      title="3D SCANS"
      description="High fidelity 3D scans and gaussian splats."
      background-image="/images/scans-background.jpg"
    />

    <HdrisFilterBar />

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
      <NuxtLink 
        v-for="scan in scans" 
        :key="scan.id"
        :to="`/scans/${scan.id}`"
      >
        <ScansCard 
          :title="scan.title"
          :video-url="scan.videoUrl"
          :preview-video-url="scan.previewVideoUrl"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { scans, fetchList } = useScans()
const breadcrumbs = useBreadcrumbs()

onMounted(() => {
  breadcrumbs.value = []
  fetchList()
})
</script>