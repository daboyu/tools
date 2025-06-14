export interface ImageInfo {
  file: File | null;
  url: string;
  width: number;
  height: number;
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AppContextType {
  projectName: string;
  setProjectName: (name: string) => void;
  imageInfo: ImageInfo | null;
  setImageInfo: (info: ImageInfo | null) => void;
  cropArea: CropArea | null;
  setCropArea: (area: CropArea | null) => void;
  croppedImages: string[];
  setCroppedImages: (imgs: string[]) => void;
} 