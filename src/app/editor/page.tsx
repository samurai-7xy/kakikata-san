"use client";
import "../globals.css";
import React, { useState } from "react";
import RubyText from "@/components/RubyText";

const GenkoYoshi: React.FC = () => {
  const rows = 20; // 行数
  const cols = 20; // 列数
  const total = rows * cols;

  // 入力されたテキストを状態管理
  const [text, setText] = useState("");

  // 入力された文字をマスに割り当て
  const chars = text.split("").slice(0, total);

  return (
    <div className="flex flex-col items-center p-6 m-plus-rounded-1c-regular">
      {/* 入力欄 */}
      <textarea
        className="border p-2 w-80 h-24 mb-6 m-plus-rounded-1c-regular"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ここに文字を入力してください"
      />

      {/* 原稿用紙エリア */}
      <div
        className="grid border border-black"
        style={{
          gridTemplateColumns: `repeat(${cols}, 2rem)`,
          gridTemplateRows: `repeat(${rows}, 2rem)`,
          writingMode: "vertical-rl", // 縦書き
          fontFamily: '"M PLUS Rounded 1c", sans-serif', // フォント指定
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="border border-gray-400 flex items-center justify-center text-xl m-plus-rounded-1c-regular"
          >
            {chars[i] || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenkoYoshi;
