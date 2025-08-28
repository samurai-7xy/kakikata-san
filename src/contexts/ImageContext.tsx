'use client';

import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type ImageContextType = {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
};

export const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  // ブラウザの記憶に頼らず、ただの一時的な記憶場所として使う
  const [images, setImages] = useState<string[]>([]);

  return (
    <ImageContext.Provider value={{ images, setImages }}>
      {children}
    </ImageContext.Provider>
  );
}
