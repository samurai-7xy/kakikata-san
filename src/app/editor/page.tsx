"use client";
import React, { useState, useMemo } from "react";
import CloseButton from '@/components/CloseButton';
import RubyText from "@/components/RubyText";
import GenkoSheet from "@/components/GenkoSheet";
import LoadingSpinner from "@/components/LoadingSpinner";

const GenkoYoshiEditor: React.FC = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const charsPerPage = 400;

  // 入力された文字数に応じて、必要な原稿用紙の枚数を計算
  const pageCount = useMemo(() => {
    return Math.max(1, Math.ceil(text.length / charsPerPage));
  }, [text]);

  // 「採点する」ボタンが押されたときの処理（今はコンソールに表示するだけ）
  const handleScoring = async() => {
    setIsLoading(true); //ローディング開始
    console.log("採点するボタンが押されました。");
    console.log("現在の文章:", text);
    // ここに将来的にAPIを呼び出すなどの処理を追加します

     // (今は処理の重さをシミュレートするために3秒待つ)
    await new Promise(resolve => setTimeout(resolve, 3000)); 
    
    console.log("採点処理が完了しました。");
    setIsLoading(false); // ✨ ローディング終了

    // ここで採点結果ページに移動するなどの処理を追加
    alert("採点が完了しました！");
  };

  return (
    <>
      {/* ✨ ローディング画面をページに設置 */}
      <LoadingSpinner isVisible={isLoading} />

      <div className="flex flex-col items-center min-h-screen bg-[#FAFAFA] p-4 sm:p-8">
        <div className="absolute top-4 right-4 z-30">
          <CloseButton href="/" />
        </div>

        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-6">
          <RubyText segments={[{ text: '文章', ruby: 'ぶんしょう' }, { text: 'を' }, { text: '入力', ruby: 'にゅうりょく' }]} />
        </h1>

        <div className="relative w-max">
          <div className="flex flex-col gap-8">
            <div className="relative w-full overflow-x-auto flex flex-row gap-8">
              {Array.from({ length: pageCount }).map((_, pageIndex) => (
                <GenkoSheet
                  key={pageIndex}
                  text={text.slice(pageIndex * charsPerPage, (pageIndex + 1) * charsPerPage)}
                />
              ))}
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="absolute top-0 left-0 h-full bg-transparent text-transparent caret-[#2C2C2C] resize-none focus:outline-none z-20
               text-lg sm:text-2xl md:text-3xl
               leading-[2rem] sm:leading-[2.5rem] md:leading-[3rem]
               tracking-[0.5rem] sm:tracking-[0.75rem] md:tracking-[1rem]
               font-sans p-2 sm:p-4"
            style={{
              /*height: `${pageCount * (2.5 * 20)}rem`,
              writingMode: "vertical-rl",
              fontSize: '2rem',
              lineHeight: '2.5rem',
              letterSpacing: '1rem',
              fontFamily: '"M PLUS Rounded 1c", sans-serif',
              padding: '0.5rem 1rem'*/
              width: `${pageCount * 25}rem`, // 横にページ数分広げる
              writingMode: "vertical-rl",
            }}
            placeholder="ここをクリックして入力を開始"
          />
        </div>
        
        <div className="mt-4 text-gray-600">
          {text.length} 文字
        </div>

        {text.length > 0 && (
          <button
            onClick={handleScoring}
            // ✨ ローディング中はボタンを押せないようにする
            disabled={isLoading}
            className="fixed bottom-8 right-8 bg-green-500 text-white font-semibold text-xl py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <RubyText segments={[{ text: '採点', ruby: 'さいてん' }, { text: 'する' }]} />
          </button>
        )}
      </div>
    </>
  );
};

export default GenkoYoshiEditor;