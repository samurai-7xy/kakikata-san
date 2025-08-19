'use client';

import { useState } from 'react';
import CloseButton from '@/components/CloseButton';

export default function SettingsPage() {
  const [selectedOption, setSelectedOption] = useState('hiragana');

  const options = [
    { id: 'hiragana', label: 'すべてひらがな' },
    { id: 'furigana', label: 'よみがなをつける' },
    { id: 'none', label: 'よみがなをつけない' },
  ];

  return (
    // ↓ ✨ 背景を半透明の黒に変更
    <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-75">
      <div className="relative w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
        
        <CloseButton />
        
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
          せってい
        </h1>

        <div className="p-6 bg-gray-100 rounded-md">
          <div className="space-y-5">
            {options.map((option) => (
              <label key={option.id} className="flex items-center cursor-pointer text-xl text-gray-700">
                <input
                  type="radio"
                  name="setting"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => setSelectedOption(option.id)}
                  className="hidden"
                />
                <span className={`w-6 h-6 inline-block mr-4 border-2 rounded-full transition-all duration-200 ${
                  selectedOption === option.id ? 'border-orange-400 bg-orange-400' : 'border-gray-400'
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