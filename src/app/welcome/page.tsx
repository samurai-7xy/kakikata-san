// app/welcome/page.tsx
import LaptopFrame from '../components/LaptopFrame';
import { Settings } from 'lucide-react';
import './globals.css';

export default function WelcomePage() {
  return (
    <LaptopFrame>
      <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
        {/* 設定アイコン */}
        <div className="absolute top-6 right-6">
          <Settings size={32} className="text-gray-300 cursor-pointer" />
        </div>

        {/* メインコンテンツ */}
        <h1 className="text-6xl font-bold mb-12">
          かきかたさん
        </h1>
        <p className="text-base text-gray-700 w-full max-w-2xl leading-relaxed text-left">
          本アプリはあなたの「書き方」をサポートします。
        </p>
      </div>
    </LaptopFrame>
  );
}