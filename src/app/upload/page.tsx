'use client';

import { useRef, ChangeEvent, useContext } from 'react';
import Link from 'next/link';
import RubyText from '@/components/RubyText';
import { ImageContext } from '@/contexts/ImageContext';
import CloseButton from '@/components/CloseButton';

export default function UploadPage() {
  const context = useContext(ImageContext);
  if (!context) throw new Error('ImageContext is not provided');
  const { images, setImages } = context;

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ファイルが選択されたときの処理を、一番シンプルな形に戻す
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Base64に変換せず、一時的なURLを生成するだけ
      const newImageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prevImages => [...prevImages, ...newImageUrls]);
    }
  };

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white p-4 sm-p-6">
      <CloseButton />
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={images.length === 0 ? handleSelectClick : undefined}
        className={`w-full max-w-6xl flex-grow bg-gray-200 rounded-lg border-2 border-dashed border-gray-400 overflow-y-auto ${images.length === 0 ? 'cursor-pointer flex items-center justify-center' : ''}`}
      >
        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {images.map((src, index) => (
              <div key={index} className="relative aspect-square">
                <img src={src} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          <span className="text-gray-500 text-xl"><RubyText segments={[{ text: 'クリック', ruby: 'くりっく' },{text:'して'},{text:'写真', ruby:'しゃしん'},{text:'を'},{text:'選択', ruby:'せんたく'},]} /></span>
        )}
      </div>

      <div className="mt-6 w-full max-w-lg flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleSelectClick}
          className="w-full bg-[#4A90E2] text-white font-semibold text-2xl py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          {images.length > 0 ? (
            <RubyText segments={[{ text: '写真', ruby: 'しゃしん' },{ text: 'を'},{ text: '追加', ruby: 'ついか' }]} />
          ) : (
            <RubyText segments={[{ text: '写真', ruby: 'しゃしん' },{ text: 'を'},{ text: '選択', ruby: 'せんたく' }]} />
          )}
        </button>

        {images.length > 0 && (
          <Link
            href="/review"
            className="w-full bg-green-500 text-white font-semibold text-2xl py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 flex items-center justify-center text-center"
          >
            <RubyText segments={[{ text: '次', ruby: 'つぎ' },{ text: 'へ' },{ text: '進む', ruby: 'すすむ' }]} />
          </Link>
        )}
      </div>
    </div>
  );
}
