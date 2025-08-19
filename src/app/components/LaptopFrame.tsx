// components/LaptopFrame.tsx
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const LaptopFrame: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-gray-800 border-4 border-gray-800 rounded-xl shadow-2xl">
      {/* 上部ベゼル */}
      <div className="w-full h-8 bg-black rounded-t-lg flex justify-center items-center">
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>
      {/* スクリーンエリア */}
      <div className="bg-white w-[800px] h-[500px]">
        {children}
      </div>
      {/* 下部シャーシ */}
      <div className="w-full h-4 bg-gray-200 rounded-b-lg"></div>
    </div>
  );
};

export default LaptopFrame;