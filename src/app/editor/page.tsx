"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CloseButton from '@/components/CloseButton';
import RubyText from "@/components/RubyText";
import GenkoSheet from "@/components/GenkoSheet";
import LoadingSpinner from "@/components/LoadingSpinner";

const GenkoYoshiEditor: React.FC = () => {
  const searchParams = useSearchParams();
  const initialText = searchParams.get("text") || ""; // 👈 URL から取得
  const [text, setText] = useState(initialText);
  const [isLoading, setIsLoading] = useState(false);
  const charsPerPage = 400;

  // URLのtextが変わったらstateに反映（リロード対応）
  useEffect(() => {
    if (initialText) setText(initialText);
  }, [initialText]);

  const pageCount = useMemo(() => {
    return Math.max(1, Math.ceil(text.length / charsPerPage));
  }, [text]);

  const handleScoring = async () => {
    setIsLoading(true);
    console.log("採点処理を開始します...");

    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log("採点処理が完了しました。");
    setIsLoading(false);

    alert("採点が完了しました！");
  };

  return (
    <>
      <LoadingSpinner isVisible={isLoading} />

      <div className="flex flex-col items-center min-h-screen bg-[#f9f5e9] p-4 sm:p-8">
        <div className="absolute top-4 right-4 z-30">
          <CloseButton href="/" />
        </div>

        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          <RubyText segments={[{ text: '文章', ruby: 'ぶんしょう' }, { text: 'を' }, { text: '入力', ruby: 'にゅうりょく' }]} />
        </h1>

        <div className="relative w-max">
          <div className="flex flex-col gap-8">
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <GenkoSheet
                key={pageIndex}
                text={text.slice(pageIndex * charsPerPage, (pageIndex + 1) * charsPerPage)}
              />
            ))}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="absolute inset-0 w-full bg-transparent text-transparent caret-black resize-none focus:outline-none z-20"
            style={{
              height: `${pageCount * (2.5 * 20)}rem`,
              writingMode: "vertical-rl",
              fontSize: '2rem',
              lineHeight: '2.5rem',
              letterSpacing: '1rem',
              fontFamily: '"M PLUS Rounded 1c", sans-serif',
              padding: '0.5rem 1rem'
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
