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

  const settingsContext = useContext(SettingsContext);
  const rubyMode = settingsContext?.rubyMode || 'furigana';

  const [scale, setScale] = useState(1.0);
  const genkoWidth = 960; // 原稿用紙の基本幅 (px)


  // useEffect(() => {
  //   const handleResize = () => {
  //     // 画面幅を取得し、余白を考慮してスケールを計算
  //     const containerWidth = window.innerWidth - 64; // 左右の余白分を引く
  //     if (containerWidth < genkoWidth) {
  //       setScale(containerWidth / genkoWidth);
  //     } else {
  //       setScale(1.0);
  //     }
  //   };

   useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let containerWidth;

      //画面サイズに応じて、余白の計算方法を変更
      if (screenWidth < 768) { // スマートフォンの場合 (mdブレークポイント)
        containerWidth = screenWidth - 32; // 左右の余白を16pxずつにする
      } else { // タブレット以上の場合
        containerWidth = screenWidth - 64; // 左右の余白を32pxずつにする
      }

      if (containerWidth < genkoWidth) {
        setScale(containerWidth / genkoWidth);
      } else {
        setScale(1.0);
      }
    };

    // 初期表示時と画面サイズ変更時に計算を実行
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // コンポーネントが不要になったらイベント監視を解除
    return () => window.removeEventListener('resize', handleResize);
  }, []);


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

    const placeholderText = useMemo(() => {
    if (rubyMode === 'hiragana') {
      return "ここに ぶんしょうを にゅうりょく してください...";
    }
    // 「よみがな」モードはplaceholderにルビを振れないため、漢字のまま表示
    return "ここに文章を入力してください...";
  }, [rubyMode]);

  return (
    <>
      <LoadingSpinner isVisible={isLoading} />
      <div className="relative flex flex-col min-h-screen bg-[#FAFAFA] p-4 sm:p-6 md:p-8">
        <CloseButton href="/" />
        <header className="flex-shrink-0 w-full max-w-5xl mx-auto flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
            <RubyText segments={[{ text: '文章', ruby: 'ぶんしょう' }, { text: 'を' }, { text: '入力', ruby: 'にゅうりょく' }]} />
          </h1>
        </header>

        <main className="flex-grow flex flex-col items-center w-full max-w-5xl mx-auto">
          {/* ===== 文章入力エリア ===== */}
          <div className="w-full">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-48 sm:h-56 p-4 border-2 border-gray-300 rounded-md resize-y focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              placeholder={placeholderText}
            />
            {/* ✨ 1. 文字数カウンターを追加 */}
            <div className="text-right text-gray-600 mt-1 pr-2">
              {text.length} / 400 <RubyText segments={[{ text: '文字', ruby: 'もじ' },]} />
            </div>
          </div>

          {/* ===== 操作ボタンエリア ===== */}
          <div className="flex items-center gap-4 my-4">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-[#F5A623] text-white font-semibold rounded-md shadow hover:bg-[#D99A1C] transition"
            >
              <RubyText segments={[{ text: 'リセット', ruby: 'りせっと' }]} />
            </button>
          </div>

            {/* ===== 原稿用紙 表示エリア ===== */}
            <div className="mt-4 flex flex-col items-center gap-8 w-full">
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <div key={pageIndex} className="flex justify-center w-full">
              <GenkoDisplay
                text={text.slice(pageIndex * charsPerPage, (pageIndex + 1) * charsPerPage)}
                isFirstPage={pageIndex === 0}
                scale={scale}
              />
              </div>
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

