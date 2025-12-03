export interface HdriFile {
  fileId: number;
  res: number;
  ext: string;
  url?: string;
}

export interface HdriFrame {
  frame: number;       // e.g. 1001
  elevation: number;   // e.g. 10.5
  luma: number;        // Light intensity
  time: string;        // "16:40"
  preview: {
    url: string;       // Image URL for the scrubber
  };
}

export interface Hdri {
  id: number;
  slug: string;
  title: string;
  description: string; // HTML
  longDescription: string; // Detailed emotive description
  frames: HdriFrame[]; // The sequence of images
  
  // Display metadata
  elevationRange: string;
  timeRange: string;
  lumaRange: string;
}