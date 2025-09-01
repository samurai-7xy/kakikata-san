import React from 'react';

// この部品に渡すデータの型を定義
interface GenkoDisplayProps {
  text: string;
}

interface GenkoDisplayProps {
  text: string;
  isFirstPage?: boolean;
}

const GenkoDisplay: React.FC<GenkoDisplayProps> = ({ text , isFirstPage = false }) => {
  const rows = 20;
  const cols = 20;
  const totalCells = rows * cols;
  // 表示する文字を、先頭から400文字に制限
  const chars = text.slice(0, totalCells).padEnd(totalCells, ' ').split('');

  // 句読点や小さい文字を判定するための正規表現
  const punctuationRegex = /[、。]/;
  const smallKanaRegex = /[ぁぃぅぇぉゃゅょっァィゥェォャュョッ]/;

  // 文字に応じて特別なCSSクラスを割り当てる関数
  const getCharClass = (char: string) => {
    if (punctuationRegex.test(char) || smallKanaRegex.test(char)) {
      return 'punctuation'; // globals.cssで定義したスタイルを適用
    }
    return '';
  };

  return (
    <div
      className="genko-display-grid" // 新しいCSSクラスを適用
    >
      {/* 400個のマス目を生成 */}
      {Array.from({ length: totalCells }).map((_, i) => (
        <div
          key={i}
          className={`genko-cell ${getCharClass(chars[i])}`}
        >
          {/* 空白文字は表示しない */}
          {chars[i] === ' ' ? '' : chars[i]}
        </div>
      ))}
    </div>
  );
};

export default GenkoDisplay;
