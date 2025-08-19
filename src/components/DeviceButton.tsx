// ボタンに表示するテキストを受け取るようにします
export default function DeviceButton({ label }: { label: string }) {
  return (
    <button className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
      {label}
    </button>
  );
}
