// import CloseButton from '@/components/CloseButton';
// import DeviceButton from '@/components/DeviceButton'; // ✨ 作成したボタンコンポーネントをインポート
// import RubyText from '@/components/RubyText';

// export default function DeviceSelectPage() {
//   const devices = ['iPhone', 'Android', 'Mac', 'Windows', 'iPad'];

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-75">
//       <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//         <CloseButton />
        
//         <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
//           <RubyText segments={[{ text: 'ご使用', ruby: 'ごしよう' }, { text: 'の'}, { text: '端末', ruby: 'たんまつ' }]} />
//         </h1>

//         <div className="grid grid-cols-2 gap-4">
//           {devices.map((device) => (
//             // iPadだけ横幅を広げるための条件分岐
//             <div key={device} className={device === 'iPad' ? 'col-span-2' : ''}>
//               <DeviceButton label={device} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import CloseButton from '@/components/CloseButton';
import DeviceButton from '@/components/DeviceButton';
import RubyText from '@/components/RubyText';

export default function DeviceSelectPage() {
  const deviceLinks = {
    'iPhone': 'https://www.youtube.com/watch?v=your_iphone_video_id',
    'Android': 'https://www.youtube.com/watch?v=your_android_video_id',
    'Mac': 'https://www.youtube.com/watch?v=your_mac_video_id',
    'Windows': 'https://www.youtube.com/watch?v=your_windows_video_id',
    'iPad': 'https://www.youtube.com/watch?v=your_ipad_video_id',
  };

  // handleDeviceClick の引数に string 型を指定します
  const handleDeviceClick = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-75">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <CloseButton />
        
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
          <RubyText segments={[{ text: 'ご使用', ruby: 'ごしよう' }, { text: 'の'}, { text: '端末', ruby: 'たんまつ' }]} />
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {/* ここを Object.entries に変更します */}
          {Object.entries(deviceLinks).map(([device, url]) => (
            // device: キー ('iPhone'など), url: 値 ('https://...')
            <div key={device} className={device === 'iPad' ? 'col-span-2' : ''}>
              <DeviceButton 
                label={device} 
                // 直接urlを渡すので、deviceLinks[device] のような記述が不要になります
                onClick={() => handleDeviceClick(url)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}