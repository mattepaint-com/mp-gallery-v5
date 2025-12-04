<template>
  <div class="px-8 pb-8 pt-6">
    <PageHeader 
      title="3D SCANS"
      description="High fidelity 3D scans and gaussian splats."
      background-image="/images/Levitating Rock Scene.png"
    />

    <HdrisFilterBar />

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
      <ScansCard 
        v-for="scan in scans" 
        :key="scan.id" 
        :title="scan.title"
        :video-url="scan.videoUrl"
      />
    </div>
  </div>
</template>

<script setup>
const { scans } = useScans()
</script>