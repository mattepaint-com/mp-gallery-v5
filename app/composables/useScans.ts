export interface Scan {
  id: number
  title: string
  videoUrl: string
}

export const useScans = () => {
  const scans = ref<Scan[]>([
    {
      id: 1,
      title: 'Gsplat Turntable',
      videoUrl: 'https://storage.googleapis.com/assets.mattepaint.com/v5-gallery/scans/19966012M_gsplat_turntable.mov',
    },
    {
      id: 2,
      title: 'Ancient Rock Formation',
      videoUrl: 'https://storage.googleapis.com/assets.mattepaint.com/v5-gallery/scans/19966012M_gsplat_turntable2.mov',
    },
    {
      id: 3,
      title: 'Urban Debris Scan',
      videoUrl: 'https://storage.googleapis.com/assets.mattepaint.com/v5-gallery/scans/19966012M_gsplat_turntable.mov',
    },
    {
      id: 4,
      title: 'Coastal Cliff Face',
      videoUrl: 'https://storage.googleapis.com/assets.mattepaint.com/v5-gallery/scans/19966012M_gsplat_turntable2.mov',
    },
    {
      id: 5,
      title: 'Industrial Pipe Cluster',
      videoUrl: 'https://storage.googleapis.com/assets.mattepaint.com/v5-gallery/scans/19966012M_gsplat_turntable.mov',
    },
    {
      id: 6,
      title: 'Forest Floor Debris',
      videoUrl: 'https://storage.googleapis.com/assets.mattepaint.com/v5-gallery/scans/19966012M_gsplat_turntable2.mov',
    },
  ])

  return {
    scans,
  }
}
