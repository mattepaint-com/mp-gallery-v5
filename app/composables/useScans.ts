import type { Scan } from '~/types/scan'

export const useScans = () => {
  const scans = ref<Scan[]>([])
  const loading = ref(false)

  const fetchList = async () => {
    loading.value = true
    
    // Simulate network request
    // await new Promise(resolve => setTimeout(resolve, 150))

    scans.value = [
      {
        id: 1,
        slug: 'gsplat-turntable',
        title: 'Gsplat Turntable',
        description: 'High-fidelity gaussian splat capture.',
        longDescription: 'This gaussian splat capture demonstrates the cutting-edge of real-time 3D reconstruction. Captured using multi-view stereo techniques and processed through our proprietary splat optimization pipeline, this asset delivers photorealistic quality at interactive framerates. Perfect for virtual production, game development, and architectural visualization where traditional mesh-based approaches fall short.',
        videoUrl: 'https://storage.googleapis.com/assets.mattepaint.com/v5-gallery/scans/19966012M_gsplat_turntable.mov',
        posterUrl: '/images/scans/gsplat-turntable-poster.jpg',
        polyCount: 'N/A (Splat)',
        textureResolution: '8K equivalent',
        fileFormats: ['PLY', 'SPLAT'],
        scanType: 'gaussian-splat',
        tags: ['gaussian-splat', 'turntable', 'high-detail'],
      },
      {
        id: 2,
        slug: 'ancient-rock-formation',
        title: 'Ancient Rock Formation',
        description: 'Weathered sandstone formation with intricate erosion patterns.',
        longDescription: 'Captured in the heart of the desert, this ancient rock formation showcases millions of years of geological history. The scan preserves every crack, crevice, and color variation in stunning detail. Ideal for environment art, geological studies, or adding authentic natural elements to your digital landscapes.',
        videoUrl: 'https://storage.googleapis.com/assets.mattepaint.com/v5-gallery/scans/19966012M_gsplat_turntable2.mov',
        posterUrl: '/images/scans/rock-formation-poster.jpg',
        polyCount: '2.4M triangles',
        textureResolution: '8K',
        fileFormats: ['FBX', 'OBJ', 'USD'],
        scanType: 'photogrammetry',
        location: 'Utah, USA',
        tags: ['rock', 'natural', 'desert', 'photogrammetry'],
      },
      {
        id: 3,
        slug: 'urban-debris-scan',
        title: 'Urban Debris Scan',
        description: 'Collection of urban debris and rubble.',
        longDescription: 'A meticulously captured collection of urban debris perfect for post-apocalyptic scenes, construction sites, or adding gritty realism to any urban environment. Each piece has been individually scanned and optimized for seamless integration into your pipeline.',
        videoUrl: 'https://storage.googleapis.com/assets.mattepaint.com/v5-gallery/scans/19966012M_gsplat_turntable.mov',
        posterUrl: '/images/scans/urban-debris-poster.jpg',
        polyCount: '1.8M triangles',
        textureResolution: '4K',
        fileFormats: ['FBX', 'OBJ', 'USD'],
        scanType: 'photogrammetry',
        tags: ['urban', 'debris', 'rubble', 'photogrammetry'],
      },
      {
        id: 4,
        slug: 'coastal-cliff-face',
        title: 'Coastal Cliff Face',
        description: 'Dramatic coastal cliff with layered sedimentary rock.',
        longDescription: 'This dramatic coastal cliff face captures the raw power of nature where land meets sea. The layered sedimentary rock tells a story spanning eons, with each stratum representing a different geological era. Perfect for cinematic establishing shots, game environments, or any project requiring dramatic natural backdrops.',
        videoUrl: 'https://storage.googleapis.com/assets.mattepaint.com/v5-gallery/scans/19966012M_gsplat_turntable2.mov',
        posterUrl: '/images/scans/coastal-cliff-poster.jpg',
        polyCount: '3.2M triangles',
        textureResolution: '8K',
        fileFormats: ['FBX', 'OBJ', 'USD', 'PLY'],
        scanType: 'photogrammetry',
        location: 'Cornwall, UK',
        tags: ['coastal', 'cliff', 'natural', 'photogrammetry'],
      },
      {
        id: 5,
        slug: 'industrial-pipe-cluster',
        title: 'Industrial Pipe Cluster',
        description: 'Complex industrial piping with authentic weathering.',
        longDescription: 'Captured from an active industrial facility, this pipe cluster features authentic rust, grime, and weathering that would take hours to recreate by hand. The complex geometry and realistic materials make it perfect for industrial scenes, sci-fi environments, or anywhere you need believable mechanical infrastructure.',
        videoUrl: 'https://storage.googleapis.com/assets.mattepaint.com/v5-gallery/scans/19966012M_gsplat_turntable.mov',
        posterUrl: '/images/scans/industrial-pipes-poster.jpg',
        polyCount: '1.2M triangles',
        textureResolution: '4K',
        fileFormats: ['FBX', 'OBJ', 'USD'],
        scanType: 'photogrammetry',
        tags: ['industrial', 'pipes', 'metal', 'photogrammetry'],
      },
      {
        id: 6,
        slug: 'forest-floor-debris',
        title: 'Forest Floor Debris',
        description: 'Organic forest floor with fallen branches and leaves.',
        longDescription: 'Bring the forest floor to life with this comprehensive scan of organic debris. Featuring fallen branches, decomposing leaves, moss-covered rocks, and rich soil textures, this asset provides everything you need to create believable woodland environments. The natural color palette and intricate details add depth and authenticity to any forest scene.',
        videoUrl: 'https://storage.googleapis.com/assets.mattepaint.com/v5-gallery/scans/19966012M_gsplat_turntable2.mov',
        posterUrl: '/images/scans/forest-floor-poster.jpg',
        polyCount: '2.1M triangles',
        textureResolution: '8K',
        fileFormats: ['FBX', 'OBJ', 'USD'],
        scanType: 'photogrammetry',
        location: 'Pacific Northwest, USA',
        tags: ['forest', 'organic', 'natural', 'photogrammetry'],
      },
    ]
    
    loading.value = false
  }

  const fetchById = async (id: number) => {
    loading.value = true
    // Simulate network
    await new Promise(resolve => setTimeout(resolve, 120))
    
    if (scans.value.length === 0) {
      await fetchList()
    }
    
    loading.value = false
    return scans.value.find(s => s.id === id)
  }

  return {
    scans,
    loading,
    fetchList,
    fetchById,
  }
}
