'use client';

import {  useContext } from 'react';
import CloseButton from '@/components/CloseButton';
import { SettingsContext } from '@/contexts/SettingsContext';

export default function SettingsPage() {
  // ✨ Contextから設定値と更新関数を取得
  const context = useContext(SettingsContext);
  if (!context) {
    // このエラーは通常表示されませんが、念のため
    throw new Error('SettingsContext must be used within a SettingsProvider');
  }
  const { rubyMode, setRubyMode } = context;

  const options = [
    { id: 'hiragana', label: 'すべてひらがな' },
    { id: 'furigana', label: 'よみがなをつける' },
    { id: 'none', label: 'よみがなをつけない' },
  ];

return (
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
                  // ✨ 状態の読み書きをContextから行うように変更
                  checked={rubyMode === option.id}
                  onChange={() => setRubyMode(option.id)}
                  className="hidden"
                />
                <span className={`w-6 h-6 inline-block mr-4 border-2 rounded-full transition-all duration-200 ${
                  rubyMode === option.id ? 'border-[#F5A623] bg-[#F5A623]' : 'border-gray-400'
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
