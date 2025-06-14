import React, { createContext, useContext, useState } from 'react';
import { AppContextType, CropArea, ImageInfo } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projectName, setProjectName] = useState('');
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [cropArea, setCropArea] = useState<CropArea | null>(null);
  const [croppedImages, setCroppedImages] = useState<string[]>([]);

  return (
    <AppContext.Provider
      value={{
        projectName,
        setProjectName,
        imageInfo,
        setImageInfo,
        cropArea,
        setCropArea,
        croppedImages,
        setCroppedImages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext 必須在 AppContextProvider 內使用');
  return ctx;
}; 