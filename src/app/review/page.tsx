'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ImageContext } from '@/contexts/ImageContext';
import RubyText from '@/components/RubyText';

export default function ReviewPage() {
  const context = useContext(ImageContext);
  if (!context) throw new Error('ImageContext is not provided');
  const { images, setImages } = context;

  const router = useRouter();

  const handleRetake = () => {
    setImages([]);
    router.push('/upload');
  };

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-2xl mb-4">画像が選択されていません。</p>
        <Link href="/upload" className="text-blue-500 hover:underline">
          選択ページに戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA]">
      {images.map((src, index) => (
        <div key={index} className="h-screen w-screen flex flex-col items-center justify-center snap-start p-4">
          <div className="flex-grow flex items-center justify-center w-full max-w-5xl">
            <img src={src} alt={`Review ${index + 1}`} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
          </div>
          
          <div className="flex-shrink-0 mt-6 w-full max-w-md flex gap-4">
            <button
              onClick={handleRetake}
              className="w-full bg-gray-500 text-white font-semibold text-xl py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 transition-colors"
            >
              <RubyText segments={[{ text: '選び直す', ruby: 'えらびなおす' }]} />
            </button>
            <Link
              href="/editor"
              className="w-full bg-green-500 text-white font-semibold text-xl py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition-colors flex items-center justify-center text-center"
            >
              <RubyText segments={[{ text: '次へ進む', ruby: 'つぎへすすむ' }]} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
