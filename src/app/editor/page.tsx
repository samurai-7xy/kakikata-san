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
  const searchParams = useSearchParams(); // ← 追加
  const charsPerPage = 400;

  const settingsContext = useContext(SettingsContext);
  const rubyMode = settingsContext?.rubyMode || "furigana";

  const [scale, setScale] = useState(1.0);
  const genkoWidth = 960; // 原稿用紙の基本幅 (px)

  const BASE_URL = "https://kakikata-san.onrender.com";

  // ✅ クエリパラメータから初期値を反映
  useEffect(() => {
    const paramText = searchParams.get("text");
    if (paramText) {
      setText(decodeURIComponent(paramText)); // URLエンコードされた文字列をデコード
    }
  }, [searchParams]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let containerWidth;

      if (screenWidth < 768) {
        containerWidth = screenWidth - 32;
      } else {
        containerWidth = screenWidth - 64;
      }

      if (containerWidth < genkoWidth) {
        setScale(containerWidth / genkoWidth);
      } else {
        setScale(1.0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      // ログイン情報などから grade/age を取得
      // 今回はテスト用に仮で grade=3, age=9 にしています
      const userGrade = 3; // 実際はログインユーザ情報から取得
      const userAge = 9;   // 実際はログインユーザ情報から取得

      const res = await fetch(`${BASE_URL}/api/correction/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text,
          grade: userGrade,
          age: userAge,
          options: {}, // 空オブジェクトを必ず送る
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

      sessionStorage.setItem("correctionResult", JSON.stringify(result));
      sessionStorage.setItem('originalText', text);
      router.push(`/result?data=${encodeURIComponent(JSON.stringify(result))}`);
    } catch (err) {
      console.error("採点処理エラー:", err);
      alert("採点に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const placeholderText = useMemo(() => {
    if (rubyMode === "hiragana") {
      return "ここに ぶんしょうを にゅうりょく してください...";
    }
    return "ここに文章を入力してください...";
  }, [rubyMode]);

  return (
    <>
      <LoadingSpinner isVisible={isLoading} />
      <div className="relative flex flex-col min-h-screen bg-[#FAFAFA] p-4 sm:p-6 md:p-8">
        <CloseButton href="/" />
        <header className="flex-shrink-0 w-full max-w-5xl mx-auto flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
            <RubyText
              segments={[
                { text: "文章", ruby: "ぶんしょう" },
                { text: "を" },
                { text: "入力", ruby: "にゅうりょく" },
              ]}
            />
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
            <div className="text-right text-gray-600 mt-1 pr-2">
              {text.length} / 400{" "}
              <RubyText segments={[{ text: "文字", ruby: "もじ" }]} />
            </div>
          </div>

          <div className="flex items-center gap-4 my-4">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-[#F5A623] text-white font-semibold rounded-md shadow hover:bg-[#D99A1C] transition"
            >
              <RubyText
                segments={[{ text: "リセット", ruby: "りせっと" }]}
              />
            </button>
          </div>

          <div className="mt-4 flex flex-col items-center gap-8 w-full">
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <div key={pageIndex} className="flex justify-center w-full">
                <GenkoDisplay
                  text={text.slice(
                    pageIndex * charsPerPage,
                    (pageIndex + 1) * charsPerPage
                  )}
                  isFirstPage={pageIndex === 0}
                  scale={scale}
                />
              </div>
            ))}
          </div>
        </main>

        {text.length > 0 && (
          <button
            onClick={handleScoring}
            disabled={isLoading}
            className="fixed bottom-8 right-8 bg-[#4A90E2] text-white font-semibold text-xl py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed z-30"
          >
            <RubyText
              segments={[
                { text: "採点", ruby: "さいてん" },
                { text: "する" },
              ]}
            />
          </button>
        )}
      </div>
    </>
  );
};

export default GenkoYoshiEditor;
