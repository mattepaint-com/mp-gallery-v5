<script setup>
const { hdris, fetchList, loading } = useHdri()

onMounted(() => {
  fetchList()
})
</script>

<template>
  <div class="px-8 pb-8 pt-6">
    <PageHeader 
      title="360º SKY HDRIS"
      description="Unobstructed HDRI skies await your next project. Shot at 50k resolution."
      background-image="https://images.unsplash.com/photo-1566010503302-2564ae0d47b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />

    <HdrisFilterBar />

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="text-gray-100 animate-pulse">Loading HDRIs...</div>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
      <HdrisCard 
        v-for="item in hdris" 
        :key="item.id" 
        :hdri="item" 
      />
    </div>
  </div>
</template>