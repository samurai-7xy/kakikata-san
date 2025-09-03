"use client";
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SettingsContext } from "@/contexts/SettingsContext";
import CloseButton from '@/components/CloseButton';
import RubyText from "@/components/RubyText";
import LoadingSpinner from "@/components/LoadingSpinner";
import GenkoDisplay from "@/components/GenkoDisplay";

const GenkoYoshiEditor: React.FC = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const charsPerPage = 400;

  const pageCount = useMemo(() => {
    return Math.max(1, Math.ceil(text.length / charsPerPage));
  }, [text.length]);

  const handleReset = () => {
    setText("");
  };

  const handleScoring = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/correction/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text,
          grade: 3,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("APIエラー詳細:", res.status, errorText);
        alert("採点APIでエラーが発生しました");
        return;
      }

      const result = await res.json();
      console.log("採点結果:", result);

      // Contextに保存して result ページで表示する方法を推奨
      sessionStorage.setItem('correctionResult', JSON.stringify(result));
      router.push(
        `/result?data=${encodeURIComponent(JSON.stringify(result))}`
      );
    } catch (err) {
      console.error("採点処理エラー:", err);
      alert("採点に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingSpinner isVisible={isLoading} />
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] p-4 sm:p-8">
        <header className="flex-shrink-0 w-full max-w-5xl mx-auto flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
            <RubyText segments={[{ text: '文章', ruby: 'ぶんしょう' }, { text: 'を' }, { text: '入力', ruby: 'にゅうりょく' }]} />
          </h1>
          <CloseButton href="/" />
        </header>

        <main className="flex-grow flex flex-col items-center w-full max-w-5xl mx-auto">
          {/* ===== 文章入力エリア ===== */}
          <div className="w-full">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-48 sm:h-56 p-4 border-2 border-gray-300 rounded-md resize-y focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              placeholder="ここに文章を入力してください..."
            />
            {/* ✨ 1. 文字数カウンターを追加 */}
            <div className="text-right text-gray-600 mt-1 pr-2">
              {text.length} / 400 文字
            </div>
          </div>

          {/* ===== 操作ボタンエリア ===== */}
          <div className="flex items-center gap-4 my-4">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-[#F5A623] text-white font-semibold rounded-md shadow hover:bg-[#D99A1C] transition"
            >
              リセット
            </button>
          </div>

          {/* ===== 原稿用紙 表示エリア ===== */}
          <div className="mt-4 flex flex-col gap-8">
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <GenkoDisplay
                key={pageIndex}
                text={text.slice(pageIndex * charsPerPage, (pageIndex + 1) * charsPerPage)}
              />
            ))}
          </div>
        </main>

        {/* 採点ボタン */}
        {text.length > 0 && (
          <button
            onClick={handleScoring}
            disabled={isLoading}
            className="fixed bottom-8 right-8 bg-green-500 text-white font-semibold text-xl py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed z-30"
          >
            <RubyText segments={[{ text: '採点', ruby: 'さいてん' }, { text: 'する' }]} />
          </button>
        )}
      </div>
    </>
  );
};

export default GenkoYoshiEditor;

