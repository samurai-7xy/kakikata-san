'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/card';
import { Button } from '@/components/button';
import RubyText from '@/components/RubyText';
import { Download, FileText, Image as ImageIcon, FileType, Edit } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CloseButton from '@/components/CloseButton';

interface CorrectionPoint {
    元: string;
    修正後: string;
}

interface CorrectionResult {
    修正点?: CorrectionPoint[];
    提案?: string[];
}

interface ApiResult {
    corrected_content: CorrectionResult;
    //raw_response?: any;
    original_content?: string;
}

export default function ResultPage() {
    const router = useRouter();
    const [resultData, setResultData] = useState<ApiResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const resultCardRef = useRef<HTMLDivElement>(null); // 保存する要素への参照


    useEffect(() => {
        const stored = sessionStorage.getItem('correctionResult');
        const storedOriginalText = sessionStorage.getItem('originalText');
        //     if (stored) {
        //         const parsed = JSON.parse(stored);

        //         // corrected_content が文字列ならオブジェクトに変換
        //         if (typeof parsed.corrected_content === 'string') {
        //             try {
        //                 parsed.corrected_content = JSON.parse(parsed.corrected_content);
        //             } catch (err) {
        //                 console.error('corrected_content の JSON パースに失敗:', err);
        //                 parsed.corrected_content = { 修正点: [], 提案: [] };
        //             }
        //         }

        //         setResultData(parsed);
        //     }
        // }, []);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (typeof parsed.corrected_content === 'string') {
                    parsed.corrected_content = JSON.parse(parsed.corrected_content);
                }
                // ✨ 取得した元の文章を結果データに追加
                if (storedOriginalText) {
                    parsed.original_content = storedOriginalText;
                }
                setResultData(parsed);
            } catch (error) {
                console.error("Failed to parse result data:", error);
            }
        }
        setLoading(false);
    }, []);

    // ✨「書き直す」ボタンが押されたときの処理
    const handleRewrite = () => {
        if (resultData?.original_content) {
            // 元の文章をURLに含めてエディターページに移動
            router.push(`/editor?text=${encodeURIComponent(resultData.original_content)}`);
        }
    };
    const handleSave = async (format: 'pdf' | 'png' | 'jpeg' | 'text') => {
        if (!resultCardRef.current || !resultData) return;

        const element = resultCardRef.current;
        const fileName = `採点結果_${new Date().toISOString().split('T')[0]}`;

        if (format === 'text') {
            let textContent = `【元の文章】\n${resultData.original_content || ''}\n\n`;
            textContent += `採点結果\n\n`;
            textContent += `■ 改善アドバイス\n`;
            // ✨ データが存在するか必ずチェックしてから処理する
            if (resultData.corrected_content.提案 && Array.isArray(resultData.corrected_content.提案)) {
                resultData.corrected_content.提案.forEach(p => textContent += `- ${p}\n`);
            }
            textContent += `\n■ 修正ポイント\n`;
            // データが存在するか必ずチェックしてから処理する
            if (resultData.corrected_content.修正点 && Array.isArray(resultData.corrected_content.修正点)) {
                resultData.corrected_content.修正点.forEach(p => {
                    textContent += `- 元: ${p.元}\n`;
                    textContent += `  修正後: ${p.修正後}\n`;
                });
            }
            const blob = new Blob([textContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.txt`;
            a.click();
            URL.revokeObjectURL(url);
            setShowSaveModal(false);
            return;
        }

        const canvas = await html2canvas(element, {
            scale: 2,
            backgroundColor: '#ffffff',
            useCORS: true
        } as any);


        if (format === 'pdf') {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${fileName}.pdf`);
        } else {
            const image = canvas.toDataURL(`image/${format}`, 1.0);
            const a = document.createElement('a');
            a.href = image;
            a.download = `${fileName}.${format}`;
            a.click();
        }
        setShowSaveModal(false);
    };


    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-xl"><RubyText segments={[{ text: '読', ruby: 'よ' }, { text: 'み' }, { text: '込', ruby: 'こ' }, { text: 'み' }, { text: '中', ruby: 'ちゅう' }, { text: '...' }]} /></p>
            </div>
        );
    }

    if (!resultData) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
                <p className="text-xl mb-4"><RubyText segments={[{ text: '採点結果', ruby: 'さいてんけっか' }, { text: 'が' }, { text: '見', ruby: 'み' }, { text: 'つかりません。' }]} /></p>
                <Button onClick={() => router.push('/')}>
                    <RubyText segments={[{ text: 'ホーム', ruby: 'ほーむ' }, { text: 'に' }, { text: '戻', ruby: 'もど' }, { text: 'る' }]} />
                </Button>
            </div>
        );
    }

    const { corrected_content, original_content } = resultData;

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div ref={resultCardRef} className="w-full max-w-2xl bg-white">
                <CloseButton />
                <Card className="shadow-lg border-0">
                    <CardHeader className="flex flex-col items-center justify-center p-6 border-b">
                        <CardTitle className="text-3xl font-bold text-gray-800">
                            <RubyText segments={[{ text: '採点結果', ruby: 'さいてんけっか' }]} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        {/* ✨ 元の文章を表示するエリア */}
                        {original_content && (
                            <div>
                                <h2 className="text-xl font-semibold mb-2 text-gray-700"><RubyText segments={[{ text: '元', ruby: 'もと' }, { text: 'の' }, { text: '文章', ruby: 'ぶんしょう' }]} /></h2>
                                <p className="rounded-md border border-gray-300 bg-gray-50 p-3 whitespace-pre-wrap">{original_content}</p>
                            </div>
                        )}
                        {/* ✨ データが存在するか必ずチェックしてから表示する */}
                        {corrected_content.提案 && corrected_content.提案.length > 0 && (
                            <div className="rounded-md border border-blue-400 bg-blue-50 p-4 text-blue-800">
                                <h2 className="text-xl font-semibold mb-2"><RubyText segments={[{ text: '改善', ruby: 'かいぜん' }, { text: 'アドバイス', ruby: 'あどばいす' }]} /></h2>
                                <ul className="list-disc list-inside space-y-1">
                                    {corrected_content.提案.map((advice, idx) => <li key={idx}>{advice}</li>)}
                                </ul>
                            </div>
                        )}
                        {/* ✨ データが存在するか必ずチェックしてから表示する */}
                        {corrected_content.修正点 && corrected_content.修正点.length > 0 ? (
                            <div>
                                <h2 className="text-xl font-semibold mb-2 text-gray-700"><RubyText segments={[{ text: '修正', ruby: 'しゅうせい' }, { text: 'ポイント', ruby: 'ぽいんと' }]} /></h2>
                                <ul className="space-y-3">
                                    {corrected_content.修正点.map((point, idx) => (
                                        <li key={idx} className="rounded-md border border-gray-300 bg-gray-50 p-3">
                                            <p className="text-gray-600"><strong><RubyText segments={[{ text: '元', ruby: 'もと' }, { text: 'の' }, { text: '文章', ruby: 'ぶんしょう' }]} />:</strong> {point.元}</p>
                                            <p className="text-green-700"><strong><RubyText segments={[{ text: '修正後', ruby: 'しゅうせいご' }]} />: </strong> {point.修正後}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 py-4"><RubyText segments={[{ text: '修正', ruby: 'しゅうせい' }, { text: 'ポイント', ruby: 'ぽいんと' }, { text: 'はありませんでした。' }]} /></p>
                        )}
                    </CardContent>
                    <CardFooter className="p-6 flex justify-center gap-4">
                        <Button
                            onClick={handleRewrite}
                            className="!bg-[#F5A623] !hover:bg-[#D99A1C] flex items-center gap-2"
                        >
                            <Edit size={18} />
                            <RubyText segments={[{ text: '書き直す', ruby: 'かきなおす' }]} />
                        </Button>
                        <Button
                            onClick={() => router.push('/')}
                            className="bg-[#4A90E2] hover:bg-blue-600" >
                            <RubyText segments={[{ text: 'ホ', ruby: 'ほ' }, { text: 'ー', ruby: 'ー' }, { text: 'ム', ruby: 'む' }, { text: 'に' }, { text: '戻', ruby: 'もど' }, { text: 'る' }]} />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            {/* フローティングアクションボタン */}
            <div className="absolute bottom-8 right-8">
                <Button
                    onClick={() => setShowSaveModal(true)}
                    className="h-16 w-16 rounded-full bg-[#4A90E2] text-white shadow-lg hover:bg-blue-600 flex items-center justify-center"
                >
                    <Download size={32} />
                </Button>
            </div>
            {/* 保存モーダル */}
            {showSaveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full">
                        <h2 className="text-2xl font-bold text-center mb-6"><RubyText segments={[{ text: '保存形式', ruby: 'ほぞんけいしき' }, { text: 'を' }, { text: '選択', ruby: 'せんたく' }]} /></h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Button onClick={() => handleSave('pdf')} className="flex items-center justify-center gap-2 py-6 text-lg"><FileType /> PDF</Button>
                            <Button onClick={() => handleSave('png')} className="flex items-center justify-center gap-2 py-6 text-lg"><ImageIcon /> PNG</Button>
                            <Button onClick={() => handleSave('jpeg')} className="flex items-center justify-center gap-2 py-6 text-lg"><ImageIcon /> JPEG</Button>
                            <Button onClick={() => handleSave('text')} className="flex items-center justify-center gap-2 py-6 text-lg"><FileText /><RubyText segments={[{ text: 'テキスト', ruby: 'てきすと' }]} /></Button>
                        </div>
                        <Button onClick={() => setShowSaveModal(false)} className="w-full mt-6 bg-gray-500 hover:bg-gray-600">
                            <RubyText segments={[{ text: 'キャンセル', ruby: 'きゃんせる' }]} />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
