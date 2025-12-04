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
      videoUrl: '/videos/scans/19966012M_gsplat_turntable.mov',
    },
    {
      id: 2,
      title: 'Ancient Rock Formation',
      videoUrl: '/videos/scans/19966012M_gsplat_turntable.mov',
    },
    {
      id: 3,
      title: 'Urban Debris Scan',
      videoUrl: '/videos/scans/19966012M_gsplat_turntable.mov',
    },
    {
      id: 4,
      title: 'Coastal Cliff Face',
      videoUrl: '/videos/scans/19966012M_gsplat_turntable.mov',
    },
    {
      id: 5,
      title: 'Industrial Pipe Cluster',
      videoUrl: '/videos/scans/19966012M_gsplat_turntable.mov',
    },
    {
      id: 6,
      title: 'Forest Floor Debris',
      videoUrl: '/videos/scans/19966012M_gsplat_turntable.mov',
    },
  ])

  return {
    scans,
  }
}
