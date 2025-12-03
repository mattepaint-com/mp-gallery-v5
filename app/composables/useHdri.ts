import type { Hdri, HdriFrame } from '~/types/hdri'

export const useHdri = () => {
  const hdris = ref<Hdri[]>([])
  const loading = ref(false)

  // Helper to generate mock frames
  const generateMockFrames = (count: number): HdriFrame[] => {
    const frameImages = [
      'mattePaint_hdri_seq075_4000px_x1786.jpg',
      'mattePaint_hdri_seq075_4000px_x1787.jpg',
      'mattePaint_hdri_seq075_4000px_x1788.jpg',
      'mattePaint_hdri_seq075_4000px_x1789.jpg',
      'mattePaint_hdri_seq075_4000px_x1790.jpg',
      'mattePaint_hdri_seq075_4000px_x1791.jpg',
      'mattePaint_hdri_seq075_4000px_x1792.jpg',
      'mattePaint_hdri_seq075_4000px_x1793.jpg',
      'mattePaint_hdri_seq075_4000px_x1794.jpg',
      'mattePaint_hdri_seq075_4000px_x1795.jpg',
      'mattePaint_hdri_seq075_4000px_x2521.jpg',
      'mattePaint_hdri_seq075_4000px_x2522.jpg',
      'mattePaint_hdri_seq075_4000px_x2523.jpg',
      'mattePaint_hdri_seq075_4000px_x2524.jpg',
      'mattePaint_hdri_seq075_4000px_x2525.jpg'
    ]

    return Array.from({ length: count }, (_, i) => ({
      frame: 1000 + i,
      elevation: -10 + (i * 2),
      luma: Math.max(0, 100 - (i * 5)),
      time: `16:${i < 10 ? '0' + i : i}`,
      preview: {
        // Cycle through the available images
        url: `/images/testing/${frameImages[i % frameImages.length]}`
      }
    }))
  }

  const fetchList = async () => {
    loading.value = true
    
    // SIMULATE NETWORK REQUEST
    await new Promise(resolve => setTimeout(resolve, 800))

    // MOCK DATA
    hdris.value = [
      {
        id: 1,
        slug: 'hdri-001',
        title: 'Sequence 001',
        description: 'A beautiful clear sunset.',
        longDescription: "Immerse your scene in the golden warmth of a flawless sunset. This sequence captures the fleeting magic of the golden hour, providing rich, warm fill light and dramatic long shadows perfect for emotive storytelling. Ideal for architectural visualization, fantasy landscapes, or any shot requiring a touch of cinematic romance. The 32-bit float precision ensures that every nuance of light intensity is preserved, allowing for realistic exposure adjustments in post.",
        elevationRange: '-10 to 40',
        timeRange: '16:00 - 18:00',
        lumaRange: '100-0',
        frames: generateMockFrames(20)
      },
      {
        id: 2,
        slug: 'hdri-002',
        title: 'Sequence 002',
        description: 'High contrast midday sun.',
        longDescription: "Harness the raw power of a clear midday sun. This high-contrast sequence offers sharp, defined shadows and intense key lighting, essential for achieving photorealistic integration in daylight scenes. Whether you're rendering automotive commercials, sci-fi environments, or bright outdoor sets, this HDRI provides the clean, neutral lighting base needed to make your assets pop with clarity and realism.",
        elevationRange: '40 to 90',
        timeRange: '12:00 - 14:00',
        lumaRange: '100',
        frames: generateMockFrames(15)
      },
      {
        id: 3,
        slug: 'hdri-003',
        title: 'Sequence 003',
        description: 'High contrast midday sun.',
        longDescription: "Capture the stark beauty of high-noon lighting. This sequence delivers uncompromising clarity with deep, crisp shadows and brilliant highlights. Perfect for technical visualizations and hard-surface modeling showcases where detail is paramount. The broad dynamic range allows for seamless compositing of CG elements into harsh real-world environments.",
        elevationRange: '40 to 90',
        timeRange: '12:00 - 14:00',
        lumaRange: '100',
        frames: generateMockFrames(15)
      },
      {
        id: 4,
        slug: 'hdri-001',
        title: 'Sequence 004',
        description: 'A beautiful clear sunset.',
        longDescription: "Drift into the serene atmosphere of a late afternoon. This sequence offers a softer, more diffused light that wraps around objects with a gentle grace. Excellent for character lighting and mood pieces where you want to evoke a sense of calm and nostalgia without the harshness of direct sunlight.",
        elevationRange: '-10 to 40',
        timeRange: '16:00 - 18:00',
        lumaRange: '100-0',
        frames: generateMockFrames(20)
      },
      {
        id: 5,
        slug: 'hdri-002',
        title: 'Sequence 005',
        description: 'High contrast midday sun.',
        longDescription: "Experience the vibrant energy of a sun-drenched landscape. This HDRI sequence is a workhorse for outdoor rendering, providing reliable, color-accurate lighting that mimics the complexity of natural daylight. It serves as an excellent foundation for establishing shots and large-scale environment work.",
        elevationRange: '40 to 90',
        timeRange: '12:00 - 14:00',
        lumaRange: '100',
        frames: generateMockFrames(15)
      },
      {
        id: 6,
        slug: 'hdri-003',
        title: 'Sequence 006',
        description: 'High contrast midday sun.',
        longDescription: "Unlock the potential of pure, unadulterated daylight. This sequence is tailored for artists who demand precision in their lighting setups. With a neutral color balance and extensive dynamic range, it offers the flexibility to craft anything from hyper-realistic architectural exteriors to stylized motion graphics backgrounds.",
        elevationRange: '40 to 90',
        timeRange: '12:00 - 14:00',
        lumaRange: '100',
        frames: generateMockFrames(15)
      }
    ]
    
    loading.value = false
  }

  const fetchById = async (id: number) => {
    loading.value = true
    // Simulate network
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // In a real app, this would be an API call
    // For now, we'll just ensure the list is populated or check a local cache
    if (hdris.value.length === 0) {
      await fetchList()
    }
    
    loading.value = false
    return hdris.value.find(h => h.id === id)
  }

  return {
    hdris,
    loading,
    fetchList,
    fetchById
  }
}