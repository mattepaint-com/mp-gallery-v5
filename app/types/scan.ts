export interface ScanFile {
  fileId: number
  format: string // e.g. 'fbx', 'obj', 'usd', 'ply'
  resolution: string // e.g. '4K', '8K'
  url?: string
}

export interface Scan {
  id: number
  slug: string
  title: string
  description: string
  longDescription: string
  
  // Media
  videoUrl: string
  previewVideoUrl?: string
  posterUrl: string
  
  // Technical specs
  polyCount: string
  textureResolution: string
  fileFormats: string[]
  scanType: 'photogrammetry' | 'gaussian-splat' | 'lidar'
  
  // Metadata
  captureDate?: string
  location?: string
  tags: string[]
}
