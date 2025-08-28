'use client';

// isVisible: 表示するかどうか
// message: 表示するメッセージ
type Props = {
  isVisible: boolean;
  message?: string;
};

export default function LoadingSpinner({ isVisible, message = "採点中..." }: Props) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50">
      {/* くるくる回るスピナー */}
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500 mb-4"></div>
      {/* メッセージ */}
      <p className="text-xl text-gray-700">{message}</p>
    </div>
  );
}
