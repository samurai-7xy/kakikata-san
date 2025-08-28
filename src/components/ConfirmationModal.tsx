'use client';

// isOpen: モーダルを開くか閉じるか
// onClose: キャンセル時に呼ばれる関数
// onConfirm: OK時に呼ばれる関数
// message: 表示するメッセージ
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

export default function ConfirmationModal({ isOpen, onClose, onConfirm, message }: Props) {
  if (!isOpen) return null;

  return (
    // 画面全体を覆うオーバーレイ
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* モーダル本体 */}
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
        <p className="text-lg text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
