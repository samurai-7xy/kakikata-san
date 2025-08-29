import CloseButton from '@/components/CloseButton';
import DeviceButton from '@/components/DeviceButton'; // ✨ 作成したボタンコンポーネントをインポート
import RubyText from '@/components/RubyText';

export default function DeviceSelectPage() {
  const devices = ['iPhone', 'Android', 'Mac', 'Windows', 'iPad'];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-75">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <CloseButton />
        
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
          <RubyText segments={[{ text: 'ご使用', ruby: 'ごしよう' }, { text: 'の'}, { text: '端末', ruby: 'たんまつ' }]} />
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {devices.map((device) => (
            // iPadだけ横幅を広げるための条件分岐
            <div key={device} className={device === 'iPad' ? 'col-span-2' : ''}>
              <DeviceButton label={device} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}