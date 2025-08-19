// app/page.tsx
import LaptopFrame from './components/LaptopFrame';
import './globals.css';

const ActionButton = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <button
    className={`bg-blue-500 text-white text-2xl font-bold rounded-lg shadow-md hover:bg-blue-600 transition-colors ${className}`}
  >
    {children}
  </button>
);

export default function Home() {
  return (
    <LaptopFrame>
      <div className="w-full h-full flex flex-col items-center justify-center p-8">
        <div className="flex gap-8 mb-8">
          <ActionButton>
            写真を
            <br />
            アップロード
          </ActionButton>
          <ActionButton>
            文章を
            <br />
            打ち込む
          </ActionButton>
        </div>
        <div>
          <ActionButton className="w-[544px] h-20">
            使い方のススメ
          </ActionButton>
        </div>
      </div>
    </LaptopFrame>
  );
}