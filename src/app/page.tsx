'use client';
import SettingsIcon from "../components/SettingsIcon";
import Link from "next/link";
import "./globals.css";
import RubyText from '@/components/RubyText';
import React from 'react';

export default function HomePage() {
  return (
    // 全体の背景を明るいグレーに変更 (bg-gray-100)
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <header className="relative p-6 md:p-8">
        {/* 設定アイコン */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
          <Link href="/setting" aria-label="設定">
            <SettingsIcon className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 text-gray-400 hover:text-gray-600" />
          </Link>
        </div>

        {/* タイトル */}
      <h1 className="text-center font-bold text-[#2C2C2C] mt-8 md:mt-12 text-5xl lg:text-[6rem] leading-tight">
          かきかたさん
        </h1>

        {/* 説明文 */}
        <p className="mt-8 md:mt-12 text-[#2C2C2C] max-w-4xl mx-auto leading-relaxed text-center text-lg md:text-2xl lg:text-[35px] px-4">
         <RubyText segments={[{ text: '本', ruby: 'ほん'}, {text: 'アプリ', ruby: 'あぷり'},{text:'はあああああああああああああああああああああああああああああああああああああああああああああああああああああああああ'}]} />
        </p>
      </header>

      {/* 中心のボタンセクション (grid-backgroundクラスを削除) */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
            <Link
              href="/upload"
              className="w-full h-48 sm:h-60 md:h-72 bg-[#4A90E2] text-white font-semibold text-4xl md:text-5xl lg:text-[64px] py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-center"
            >
              <div>
                <RubyText segments={[{ text: '写真', ruby: 'しゃしん' }, { text: 'を' }]} />
                <br />
                <RubyText segments={[{ text: 'アップロード', ruby: 'あっぷろーど' }]} />
              </div>
            </Link>
          <Link
           href="/editor"
           className="w-full h-48 sm:h-60 md:h-72 bg-[#4A90E2] text-white font-semibold text-4xl md:text-5xl lg:text-[64px] py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-center">
            <div>
              <RubyText segments={[{ text: '文章', ruby: 'ぶんしょう' }, { text: 'を' }]} />
              <br />
              <RubyText segments={[{ text: '打', ruby: 'う' }, { text: 'ち' }, { text: '込', ruby: 'こ' }, { text: 'む' }]} />
            </div>
          </Link>
          <Link
            href="/user/register"
            className="w-full h-[298px] bg-[#4A90E2] text-white font-semibold text-[64px] py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-center">
            <div>
              <RubyText segments={[{ text: 'ユーザー登録', ruby: 'ゆーざーとうろく' }]} />
            </div>
          </Link>
          <Link
            href="/user/login"
            className="w-full h-[298px] bg-[#4A90E2] text-white font-semibold text-[64px] py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-center">
            <div>
              <RubyText segments={[{ text: 'ログイン', ruby: 'ろぐいん' }]} />
            </div>
          </Link>
        </div>
        <div className="mt-4 w-full max-w-lg">

         <Link
            href="/device-select" 
            className="w-full h-48 sm:h-60 md:h-72 bg-[#4A90E2] text-white font-semibold text-4xl md:text-5xl lg:text-[64px] py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-center"> 
        <div>
          <RubyText segments={[{ text: '使', ruby: 'つか' }, { text: 'い' }, { text: '方', ruby: 'かた' }, { text: 'の' }, { text: '説明', ruby: 'せつめい' }]} />
        </div>
        </Link>
        </div>
      </main>

      {/* フッターの青いバー */}
      <footer className="bg-[#4A90E2] h-12"></footer>
    </div>
  );
}
