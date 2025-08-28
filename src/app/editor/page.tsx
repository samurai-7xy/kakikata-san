"use client";
import React, { useState, useMemo } from "react";
import CloseButton from '@/components/CloseButton';
import RubyText from "@/components/RubyText";

// 句読点や小さい仮名などを判定するための正規表現
const punctuationRegex = /^[、。、「」『』（）？！゛゜´¨]/;
const smallKanaRegex = /^[ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮ]/;

const GenkoYoshiEditor: React.FC = () => {
  const rows = 20;
  const cols = 20;
  const totalCells = rows * cols;

  const [text, setText] = useState("");

  // 入力された文字を、句読点などを考慮してマス目に割り当てる
  // useMemoを使って、textが変更されたときだけ再計算する
  const characters = useMemo(() => {
    const chars = text.split('').slice(0, totalCells);
    return Array.from({ length: totalCells }).map((_, i) => chars[i] || "");
  }, [text, totalCells]);

  // 文字の種類に応じてCSSクラスを返すヘルパー関数
  const getCharClass = (char: string) => {
    if (punctuationRegex.test(char) || smallKanaRegex.test(char)) {
      return 'punctuation'; // 右上に配置するクラス
    }
    return '';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA] p-4 sm:p-8">
      <div className="absolute top-4 right-4">
        <CloseButton href="/" />
      </div>

      <h1 className="text-3xl font-bold text-[#2C2C2C] mb-6">
        <RubyText segments={[{ text: '文章', ruby: 'ぶんしょう' }, { text: 'を' }, { text: '入力', ruby: 'にゅうりょく' }]} />
      </h1>

      {/* 原稿用紙と、その上に重ねる透明なテキストエリアのコンテナ */}
      <div className="relative w-max shadow-lg">
        {/* 原稿用紙のグリッド */}
        <div
          className="grid bg-white"
          style={{
            gridTemplateColumns: `repeat(${cols}, 2.5rem)`,
            gridTemplateRows: `repeat(${rows}, 2.5rem)`,
            writingMode: "vertical-rl",
            border: '2px solid #555',
          }}
        >
          {characters.map((char, i) => (
            <div
              key={i}
              className={`border border-dashed border-red-200 flex items-center justify-center text-2xl relative ${getCharClass(char)}`}
            >
              {/* 各列の中央に縦の破線を追加 */}
              <div className="absolute h-full border-l border-dashed border-red-200 left-1/2"></div>
              <span className="z-10">{char}</span>
            </div>
          ))}
        </div>

        {/* ユーザーが実際に入力する透明なテキストエリア */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={totalCells}
          className="absolute inset-0 w-full h-full p-2 bg-transparent text-transparent caret-[#2C2C2C] resize-none focus:outline-none z-20"
          style={{
            writingMode: "vertical-rl",
            fontSize: '2rem',
            lineHeight: '2.5rem',
            letterSpacing: '1rem', // 文字間隔を調整
            fontFamily: '"M PLUS Rounded 1c", sans-serif',
          }}
          placeholder="ここをクリックして入力を開始"
        />
      </div>
      
      {/* 文字数カウンター */}
      <div className="mt-4 text-gray-600">
        {text.length} / {totalCells} 文字
      </div>
    </div>
  );
};

export default GenkoYoshiEditor;
