'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ImageContext } from '@/contexts/ImageContext';
import RubyText from '@/components/RubyText';
import ConfirmationModal from '@/components/ConfirmationModal'; // ✨ 削除確認モーダル
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'; // ✨ D&Dライブラリ
import { Trash2 } from 'lucide-react'; // ゴミ箱アイコン

export default function ReviewPage() {
  const context = useContext(ImageContext);
  if (!context) throw new Error('ImageContext is not provided');
  const { images, setImages } = context;

  const router = useRouter();

  // モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageIndexToDelete, setImageIndexToDelete] = useState<number | null>(null);

  const BASE_URL = "https://kakikata-san.onrender.com";

  // 「選び直す」ボタンの処理
  const handleRetake = () => {
    setImages([]);
    router.push('/upload');
  };

  // ドラッグが終了したときの処理
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImages(items);
  };

  // 削除アイコンがクリックされたときの処理
  const handleDeleteClick = (index: number) => {
    setImageIndexToDelete(index);
    setIsModalOpen(true);
  };

  // モーダルで「OK」が押されたときの処理
  const handleConfirmDelete = () => {
    if (imageIndexToDelete !== null) {
      const newImages = images.filter((_, index) => index !== imageIndexToDelete);
      setImages(newImages);
      setImageIndexToDelete(null);
    }
    setIsModalOpen(false);
  };

  if (images.length === 0) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-2xl mb-4">画像が選択されていません。</p>
        <Link href="/upload" className="text-[#4A90E2] hover:underline">選択ページに戻る</Link>
      </div>
    );
  }

  //Base64 DataURL → Blob 変換関数
  async function base64ToBlob(dataUrl: string): Promise<Blob> {
    // DataURLを fetch で扱う
    const res = await fetch(dataUrl);
    return await res.blob();
  }


  // 次に進むの処理関数
  const handleNext = async () => {
    try {
      const formData = new FormData();

      for (let i = 0; i < images.length; i++) {
        const blob = await base64ToBlob(images[i]);
        formData.append("file", blob, `image_${i}.png`);
      }

      const res = await fetch(`${BASE_URL}/api/ocr`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const recognizedText = data.text;

      router.push(`/editor?text=${encodeURIComponent(recognizedText)}`);
    } catch (err) {
      console.error("OCR failed:", err);
    }
  };




  return (
    <>
      {/* 確認モーダルをページに設置 */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="この写真を削除しますか？"
      />
      <div className="flex flex-col h-screen bg-white">
        {/* ドラッグ＆ドロップの範囲を定義 */}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="images">
            {(provided) => (
              <div
                className="flex-grow overflow-y-auto bg-gray-100 p-4 sm:p-8"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="max-w-4xl mx-auto space-y-8">
                  {/* 画像をループ表示 */}
                  {images.map((src, index) => (
                    // ドラッグ可能な要素を定義
                    <Draggable key={src} draggableId={src} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative w-full group" // groupクラスでホバーを検知
                        >
                          <img
                            src={src}
                            alt={`Review ${index + 1}`}
                            className="w-full h-auto object-contain rounded-lg shadow-md"
                          />
                          {/* マウスホバーで表示される削除ボタン */}
                          <button
                            onClick={() => handleDeleteClick(index)}
                            className="absolute top-2 right-2 p-2 bg-[#F5A623] text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="削除"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* 下部固定ボタンエリア */}
        <div className="flex-shrink-0 bg-white p-4 border-t border-gray-200">
          <div className="max-w-md mx-auto flex gap-4">
            <button onClick={handleRetake} className="w-full bg-gray-500 text-white font-semibold text-xl py-3 px-6 rounded-lg shadow-md hover:bg-gray-600">
              <RubyText segments={[{ text: '選び直す', ruby: 'えらびなおす' }]} />
            </button>
            <button
              onClick={handleNext}
              className="w-full bg-blue-500 text-white font-semibold text-xl py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 flex items-center justify-center text-center"
            >
              <RubyText segments={[{ text: '次へ進む', ruby: 'つぎへすすむ' }]} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
