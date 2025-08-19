'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Link from 'next/link';
import RubyText from '@/components/RubyText';
import CloseButton from '@/components/CloseButton';

export default function UploadPage() {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      <CloseButton href="/" className="z-10" />

      {/* ===== 写真アップロードセクション ===== */}
    <div className="flex flex-col items-center justify-between min-h-screen bg-white p-4 sm:p-6">
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={previews.length === 0 ? handleSelectClick : undefined}
        className={`w-full max-w-6xl flex-grow bg-gray-200 rounded-lg border-2 border-dashed border-gray-400 overflow-y-auto ${previews.length === 0 ? 'cursor-pointer flex items-center justify-center' : ''}`}
      >
        {previews.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {previews.map((src, index) => (
              <div key={index} className="relative aspect-square">
                <img src={src} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          <span className="text-gray-500 text-xl">クリックして写真を選択</span>
        )}
      </div>

      {/* ===== ボタンセクション ===== */}
      <div className="mt-6 w-full max-w-lg flex flex-col sm:flex-row gap-4">
        {/* 「写真を選ぶ/追加」ボタン */}
        <button
          onClick={handleSelectClick}
          className="w-full bg-[#4A90E2] text-white font-semibold text-2xl py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          {/* 写真が選択されているかでテキストを変更 */}
          {previews.length > 0 ? (
            <RubyText segments={[{ text: '写真', ruby: 'しゃしん' },{text:'を'}, {text:'追加', ruby:'ついか'}]} />
          ) : (
            <RubyText segments={[{ text: '写真', ruby: 'しゃしん' },{text:'を'}, {text:'選ぶ', ruby:'えらぶ'}]} />
          )}
        </button>

        {/* 「次へ進む」ボタン (写真が1枚以上ある時だけ表示) */}
        {previews.length > 0 && (
          <Link
            href="/editor" // 文章打ち込みページに移動
            className="w-full bg-[#4A90E2] text-white font-semibold text-2xl py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-center"
          >
            <RubyText segments={[{ text: '次', ruby: 'つぎ' }, { text: 'へ',}, { text: '進', ruby: 'すす' }, { text: 'む'}]} />
          </Link>
        )}
      </div>
    </div>
    {/* Close the relative div */}
    </div>
  );
}