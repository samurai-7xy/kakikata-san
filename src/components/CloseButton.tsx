import Link from 'next/link';
import { X } from 'lucide-react';

// TypeScriptで正しく型を定義する
interface CloseButtonProps {
  href?: string;
  className?: string;
}


// `href`と`className`を受け取れるようにする
// export default function CloseButton({ href = '/', className = '' }) {
//   return (
//     <Link href={href}className={`absolute top-4 right-4 text-[#F5A623] hover:text-[#D99A1C] ${className}`}>
//       <X size={67} />
//     </Link>
//   );
// }

export default function CloseButton({ href = '/', className = '' }: CloseButtonProps) {
  return (
    // ✨ 1. ボタンの位置と余白を画面サイズに応じて調整
    <Link
      href={href}
      className={`absolute top-4 right-4 p-2 md:p-3 rounded-full text-[#F5A623] hover:text-[#D99A1C] transition-colors duration-200 ${className}`}
    >
      {/* ✨ 2. アイコンのサイズを画面サイズに応じて変更 */}
       <X className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" />
    </Link>
  );
}

