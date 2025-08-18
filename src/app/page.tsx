import React from 'react';
import './globals.css';

// 設定アイコンのSVGコンポーネント
import SettingsIcon from './components/SettingsIcon';

// メインのページコンポーネント
export default function HomePage() {
  const placeholderText = "本アプリはああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ";

  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-center p-4"
      style={{
        backgroundColor: '#FAFAFA',
      }}
    >
      <div className="w-full max-w-sm">
        {/* メインカード */}
        <div className="overflow-hidden rounded-lg bg-white shadow-xl">
          {/* ヘッダー */}
          <div className="flex items-center justify-between bg-gray-100 p-3">
            <h1 className="text-xl font-bold text-gray-800">かきかたさん</h1>
            <SettingsIcon />
          </div>

          {/* 本文 */}
          <div className="p-4">
            <p className="text-sm leading-relaxed text-gray-700">
              {placeholderText}
            </p>
          </div>
        </div>

        {/* ボタンセクション */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex w-full gap-4">
            <button className="w-1/2 rounded-md bg-blue-500 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              写真をアップロード
            </button>
            <button className="w-1/2 rounded-md bg-blue-500 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              文章を打ち込む
            </button>
          </div>
          <button className="w-full rounded-md bg-blue-500 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            使い方のススメ
          </button>
        </div>
      </div>

      {/* フッターバー */}
      <footer className="absolute bottom-10 left-1/2 w-11/12 max-w-sm -translate-x-1/2">
        <div className="h-4 rounded-full bg-blue-500"></div>
      </footer>
    </main>
  );
}