// "use client";
// import React, { useState, useMemo, useEffect } from "react";
// import { useSearchParams } from "next/navigation"; // ← 追加
// import CloseButton from '@/components/CloseButton';
// import RubyText from "@/components/RubyText";
// import GenkoSheet from "@/components/GenkoSheet";
// import LoadingSpinner from "@/components/LoadingSpinner";
// import { useRouter } from "next/navigation";

// const GenkoYoshiEditor: React.FC = () => {
//   const searchParams = useSearchParams(); // ← フックで取得
//   const [text, setText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const charsPerPage = 400;
//   const sheetWidth = 2.5 * 20; // rem
//   const router = useRouter();

//   // URL のクエリから初期テキストを反映
//   useEffect(() => {
//     const paramText = searchParams.get("text") ?? "";
//     if (paramText) setText(decodeURIComponent(paramText));
//   }, [searchParams]); // ← フックを依存配列に

//   const pageCount = useMemo(() => {
//     return Math.max(1, Math.ceil(text.length / charsPerPage));
//   }, [text]);

//   const handleScoring = async () => {
//     setIsLoading(true);
//     try {
//       console.log("採点処理を開始します...");

//       // API 呼び出し
//       const res = await fetch("http://localhost:8000/api/correction/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           content: text,   // エディターの内容
//           // ここに追加の設定（例: 学年, 評価基準など）があれば送る
//           grade: 3,
//         }),
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error("APIエラー詳細:", res.status, errorText);
//         throw new Error(`API request failed: ${res.status}`);
//       }

//       const result = await res.json();
//       console.log("採点処理が完了しました:", result);

//       // result ページへ遷移してデータを渡す
//       router.push(
//         `/result?data=${encodeURIComponent(JSON.stringify(result))}`
//       );
//     } catch (err) {
//       console.error("採点エラー:", err);
//       alert("採点に失敗しました");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <LoadingSpinner isVisible={isLoading} />

//       <div className="flex flex-col items-center min-h-screen bg-[#f9f5e9] p-4 sm:p-8">
//         <div className="absolute top-4 right-4 z-30">
//           <CloseButton href="/" />
//         </div>

//         <h1 className="text-3xl font-bold text-gray-700 mb-6">
//           <RubyText segments={[{ text: '文章', ruby: 'ぶんしょう' }, { text: 'を' }, { text: '入力', ruby: 'にゅうりょく' }]} />
//         </h1>

//         <div className="relative w-max">
//           <div className="flex flex-col gap-8">
//             {Array.from({ length: pageCount }).map((_, pageIndex) => (
//               <GenkoSheet
//                 key={pageIndex}
//                 text={text.slice(pageIndex * charsPerPage, (pageIndex + 1) * charsPerPage)}
//               />
//             ))}
//           </div>
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="absolute inset-0 w-full bg-transparent text-transparent caret-black resize-none focus:outline-none z-20"
//             style={{
//               height: `${pageCount * (2.5 * 20)}rem`,
//               writingMode: "vertical-rl",
//               fontSize: '2rem',
//               lineHeight: '2.5rem',
//               letterSpacing: '1rem',
//               fontFamily: '"M PLUS Rounded 1c", sans-serif',
//               padding: '0.5rem 1rem'
//             }}
//             placeholder="ここをクリックして入力を開始"
//           />
//         </div>

//         <div className="mt-4 text-gray-600">
//           {text.length} <RubyText segments={[{ text: '文字', ruby: 'もじ' }]} />
//         </div>

//         {text.length > 0 && (
//           <button
//             onClick={handleScoring}
//             disabled={isLoading}
//             className="fixed bottom-8 right-8 bg-green-500 text-white font-semibold text-xl py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             <RubyText segments={[{ text: '採点', ruby: 'さいてん' }, { text: 'する' }]} />
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default GenkoYoshiEditor;

"use client";
import React, { useState, useMemo, useEffect, useContext, use } from "react";
import { useRouter } from "next/navigation";
import { SettingsContext } from "@/contexts/SettingsContext";
import CloseButton from '@/components/CloseButton';
import RubyText from "@/components/RubyText";
import LoadingSpinner from "@/components/LoadingSpinner";

const GenkoYoshiEditor: React.FC = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // --- placeholder用の設定 ---
  const settingsContext = useContext(SettingsContext);
  const [placeholderText, setPlaceholderText] = useState("ここに文字を入力してください");

  useEffect(() => {
    if (settingsContext?.rubyMode === 'hiragana') {
      setPlaceholderText("ここに もじを にゅうりょく してください");
    } else {
      setPlaceholderText("ここに文字を入力してください");
    }
  }, [settingsContext?.rubyMode]);

  const handleScoring = async () => {
    setIsLoading(true);
    // (API呼び出しのロジックは変更なし)
    try {
      const res = await fetch("http://localhost:8000/api/correction/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text, grade: 3 }),
      });
      if (!res.ok) throw new Error(`API request failed: ${res.status}`);
      const result = await res.json();
      router.push(`/result?data=${encodeURIComponent(JSON.stringify(result))}`);
    } catch (err) {
      console.error("採点エラー:", err);
      alert("採点に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };
  
  // テキストの行数を計算
  const rows = useMemo(() => {
    // 1行20文字として、必要な行数を計算
    const lines = Math.max(20, Math.ceil(text.length / 20));
    return lines;
  }, [text]);


  return (
    <>
      <LoadingSpinner isVisible={isLoading} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 sm:p-8">
        <div className="absolute top-4 right-4 z-30">
          <CloseButton href="/" />
        </div>
        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          <RubyText segments={[{ text: '文章', ruby: 'ぶんしょう' }, { text: 'を' }, { text: '入力', ruby: 'にゅうりょく' }]} />
        </h1>
        
        {/* 新しい原稿用紙風テキストエリア */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          // globals.cssで定義した新しいスタイルを適用
          className="genko-textarea w-[60rem] max-w-full"
          style={{ writingMode: "vertical-rl" }}
          rows={rows} // 文字数に応じて高さを自動調整
          placeholder={placeholderText}
        />

        <div className="mt-4 text-gray-600">
          {text.length} 文字
        </div>

        {text.length > 0 && (
          <button
            onClick={handleScoring}
            disabled={isLoading}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-green-500 text-white font-semibold text-lg md:text-xl py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg hover:bg-green-600"
          >
            <RubyText segments={[{ text: '採点', ruby: 'さいてん' }, { text: 'する' }]} />
          </button>
        )}
      </div>
    </>
  );
};

export default GenkoYoshiEditor;

