import SettingsIcon from "../components/SettingsIcon";
import "./globals.css";

export default function HomePage() {
  return (
    // 全体の背景を明るいグレーに変更 (bg-gray-100)
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 上部の白いセクション */}
      {/* <header className="relative bg-white p-6 shadow-md"> */}
        {/* 設定アイコン */}
        <div className="absolute top-4 right-4">
          <button aria-label="設定">
            <SettingsIcon className="h-100 w-100 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* タイトル */}
        <h1
          className="text-center font-bold text-[#2C2C2C] mt-12"
          style={{ fontSize: "6rem", lineHeight: "1.1", height: "149px" }}
        >
          かきかたさん
        </h1>

        {/* 説明文 */}
        <p className="mt-4 text-[#2C2C2C] mx-auto leading-relaxed"
        style={{ fontSize: "35px", margin: "100px" }}>
          本アプリはあああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
        </p>
      {/*</header>

      {/* 中心のボタンセクション (grid-backgroundクラスを削除) */}
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
          <button className="col-span-1 bg-[#4A90E2] text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
            写真をアップロード
          </button>
          <button className="col-span-1 bg-[#4A90E2] text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
            文章を打ち込む
          </button>
        </div>
        <div className="mt-4 w-full max-w-lg">
          <button className="w-full bg-[#4A90E2] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-sky-600 transition-colors duration-300">
            使い方のススメ
          </button>
        </div>
      </main>

      {/* フッターの青いバー */}
      <footer className="bg-[#4A90E2] h-12"></footer>
    </div>
  );
}
