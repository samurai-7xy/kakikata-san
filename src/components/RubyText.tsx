'use client';

import { useContext, Fragment } from 'react';
import { SettingsContext } from '@/contexts/SettingsContext';

// テキストの断片の型を定義
type Segment = {
  text: string;  // 表示するテキスト（漢字 or ひらがな）
  ruby?: string; // ルビ（漢字の場合のみ設定）
};

// この部品は、テキストの断片の配列を受け取るように変更
type Props = {
  segments: Segment[];
};

export default function RubyText({ segments }: Props) {
  const context = useContext(SettingsContext);
  if (!context) {
    // 設定がない場合は、単純にテキストを連結して表示
    return <>{segments.map(s => s.text).join('')}</>;
  }

  const { rubyMode } = context;

  // 設定に応じて表示を切り替える
  const renderText = () => {
    switch (rubyMode) {
      case 'hiragana':
        // すべてひらがなモード: rubyがあればrubyを、なければtextを表示
        return segments.map(s => s.ruby || s.text).join('');
      case 'furigana':
        // よみがなモード: rubyがある部分だけ<ruby>タグを使う
        return segments.map((segment, index) => (
          segment.ruby ? (
            <ruby key={index}>{segment.text}<rt>{segment.ruby}</rt></ruby>
          ) : (
            <Fragment key={index}>{segment.text}</Fragment>
          )
        ));
      case 'none':
      default:
        // よみがななしモード: textだけを連結して表示
        return segments.map(s => s.text).join('');
    }
  };

  return <>{renderText()}</>;
}
