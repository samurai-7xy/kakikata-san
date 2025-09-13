// propsに `onClick` を追加します。型は () => void (引数なし、戻り値なしの関数) です。
export default function DeviceButton({ label, onClick }: { label: string; onClick: () => void; }) {
  return (
    <button 
      // button要素に受け取ったonClick関数を設定します
      onClick={onClick} 
      className="w-full bg-[#4A90E2] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#357ABD] transition-colors duration-300"
    >
      {label}
    </button>
  );
}