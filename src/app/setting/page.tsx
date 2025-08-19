'use client'; // このページがインタラクティブなコンポーネントであることを示すおまじない

import { useState } from 'react';
// import Link from 'next/link';
// import { X } from 'lucide-react';
import CloseButton from '../../components/CloseButton';

export default function SettingsPage() {
  // どのオプションが選択されているかを保存するための状態
  const [selectedOption, setSelectedOption] = useState('hiragana');

const options = [
    { id: 'hiragana', label: <span style={{ fontSize: '64px' }}>すべてひらがな</span> },
    // cspell:disable-next-line
    { id: 'furigana', label: <span style={{ fontSize: '64px' }}>よみがなをつける</span> },
    { id: 'none', label: <span style={{ fontSize: '64px' }}>よみがなをつけない</span> },
];

// 53px の縦間隔を設定
//const optionSpacing = '53px';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-white">
      {/* 閉じるボタン */}
      <CloseButton href="/" className="absolute top-4 right-4"/>
      
      {/* タイトル */}
    <h1
      className="text-center font-bold text-[#2C2C2C] absolute top-8 left-1/2 -translate-x-1/2"
      style={{ fontSize: "6rem", lineHeight: "1.1", height: "149px" }}
    >
      せってい
    </h1>

      {/* 設定オプション */}
    <div className="p-8 bg-gray-100 rounded-md">
      <div className="space-y-8 text-3xl">
        {options.map((option) => (
          <label key={option.id} className="flex items-center cursor-pointer text-lg text-gray-700">
            <input
            type="radio"
            name="setting"
            value={option.id}
            checked={selectedOption === option.id}
            onChange={() => setSelectedOption(option.id)}
            className="hidden"
            />
            {/* カスタムラジオボタン */}
            <span className={`w-20 h-20 inline-block mr-3 border-2 rounded-full transition-all duration-200 ${
            selectedOption === option.id ? 'border-[#F5A623] bg-[#F5A623]' : 'border-gray-400'
            }`}></span>
            {option.label}
          </label>
        ))}
        </div>
      </div>
    </div>
    </div>
  );
}