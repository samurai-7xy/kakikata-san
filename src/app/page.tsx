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
      {/* 上部の白いセクション */}
      {/* <header className="relative bg-white p-6 shadow-md"> */}
        {/* 設定アイコン */}
        <div className="absolute top-4 right-4">
          <Link href="/setting" aria-label="設定">
            <SettingsIcon className="h-100 w-100 text-gray-400 hover:text-gray-600" />
          </Link>
        </div>

        {/* タイトル */}
        <h1
          className="text-center font-bold text-[#2C2C2C] mt-12"
          style={{ fontSize: "6rem", lineHeight: "1.1", height: "149px" }}
        >
          かきかたさん
        </h1>

        {/* 説明文 */}
        <p className="mt-4 text-[#2C2C2C] mx-auto leading-relaxed"
        style={{ fontSize: "35px", margin: "100px" }}>
         <RubyText segments={[{ text: '本', ruby: 'ほん'}, {text: 'アプリ', ruby: 'あぷり'},{text:'はあああああああああああああああああああああああああああああああああああああああああああああああああああああああああ'}]} />
        </p>
      {/*</header>

      {/* 中心のボタンセクション (grid-backgroundクラスを削除) */}
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="grid grid-cols-2 gap-4 w-full max-w-[902px]">
            <button className="w-full h-[298px] bg-[#4A90E2] text-white font-semibold text-[64px] py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
          <RubyText segments={[{ text: '写真', ruby: 'しゃしん' }, { text: 'を' }]} />
                <br />
                <RubyText segments={[{ text: 'アップロード', ruby: 'あっぷろーど' }]} />
            </button>
          <Link
           href="/editor"
           className="w-full h-[298px] bg-[#4A90E2] text-white font-semibold text-[64px] py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 text-center">
            <div>
           <RubyText segments={[{ text: '文章', ruby: 'ぶんしょう' }, { text: 'を' }]}/>
              <br />
              <RubyText segments={[{ text: '打', ruby: 'う' },{text:'ち'}, {text:'込', ruby:'こ'},{text:'む'}]} />
              </div>
          </Link>
        </div>
        <div className="mt-4 w-full max-w-lg">
         <Link
            href="/device-select" 
            className="w-full h-[175px] bg-[#4A90E2] text-white font-semibold text-[64px] py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-center"> 
        <div>
          <RubyText segments={[{ text: '使', ruby: 'つか' }, {text:'い'}, {text:'方', ruby:'かた'},{text:'の'}, {text:'説明', ruby:'せつめい'}]} />
        </div>
        </Link>
        </div>
      </main>

      {/* フッターの青いバー */}
      <footer className="bg-[#4A90E2] h-12"></footer>
    </div>
  );
}
