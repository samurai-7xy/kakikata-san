import React from 'react';

// 表示するテキスト(400字分)を受け取る
type Props = {
  text: string;
};

// 句読点や小さい仮名などを判定
const punctuationRegex = /^[、。、「」『』（）？！゛゜´¨]/;
const smallKanaRegex = /^[ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮ]/;

const GenkoSheet: React.FC<Props> = ({ text }) => {
  const rows = 20;
  const cols = 20;
  const totalCells = rows * cols;

  const characters = text.padEnd(totalCells, ' ').split('');

  const getCharClass = (char: string) => {
    if (punctuationRegex.test(char) || smallKanaRegex.test(char)) {
      return 'punctuation'; // 右上に配置するクラス
    }
    return '';
  };

  return (
    <div
      className="grid bg-white shadow-lg"
      style={{
        gridTemplateColumns: `repeat(${cols}, 2.5rem)`,
        gridTemplateRows: `repeat(${rows}, 2.5rem)`,
        writingMode: 'vertical-rl',
        border: '2px solid #555',
      }}
    >
      {characters.map((char, i) => (
        <div
          key={i}
          className={`border border-dashed border-red-200 flex items-center justify-center text-2xl relative ${getCharClass(char)}`}
        >
          <div className="absolute h-full border-l border-dashed border-red-200 left-1/2"></div>
          <span className="z-10">{char.trim()}</span>
        </div>
      ))}
    </div>
  );
};

export default GenkoSheet;
