'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Button } from '@/components/button';

interface CorrectionPoint {
    元: string;
    修正後: string;
}

interface CorrectionResult {
    修正点: CorrectionPoint[];
    提案: string[];
}

interface ApiResult {
    corrected_content: CorrectionResult;
    raw_response?: any;
}

export default function ResultPage() {
    const router = useRouter();
    const [resultData, setResultData] = useState<ApiResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = sessionStorage.getItem('correctionResult');
        if (stored) {
            const parsed = JSON.parse(stored);

            // corrected_content が文字列ならオブジェクトに変換
            if (typeof parsed.corrected_content === 'string') {
                try {
                    parsed.corrected_content = JSON.parse(parsed.corrected_content);
                } catch (err) {
                    console.error('corrected_content の JSON パースに失敗:', err);
                    parsed.corrected_content = { 修正点: [], 提案: [] };
                }
            }

            setResultData(parsed);
        }
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-xl">読み込み中...</p>
            </div>
        );
    }

    if (!resultData) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
                <p className="text-xl mb-4">採点結果が見つかりません。</p>
                <Button onClick={() => router.push('/')}>ホームに戻る</Button>
            </div>
        );
    }

    const { corrected_content } = resultData;

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader className="flex flex-col items-center justify-center p-6">
                    <CardTitle className="text-3xl font-bold">採点結果</CardTitle>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                    {/* 改善アドバイス */}
                    {corrected_content.提案 && corrected_content.提案.length > 0 && (
                        <div className="rounded-md border border-blue-400 bg-blue-50 p-4 text-blue-800">
                            <h2 className="text-xl font-semibold mb-2">改善アドバイス</h2>
                            <ul className="list-disc list-inside space-y-1">
                                {corrected_content.提案.map((advice, idx) => (
                                    <li key={idx}>{advice}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* 修正ポイント */}
                    {corrected_content.修正点 && corrected_content.修正点.length > 0 ? (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">修正ポイント</h2>
                            <ul className="space-y-2">
                                {corrected_content.修正点.map((point, idx) => (
                                    <li
                                        key={idx}
                                        className="rounded-md border border-gray-300 bg-gray-50 p-3"
                                    >
                                        <p>
                                            <strong>元:</strong> {point.元}
                                        </p>
                                        <p>
                                            <strong>修正後:</strong> {point.修正後}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-gray-500">修正ポイントはありません。</p>
                    )}
                </CardContent>

                {/* ボタン */}
                <div className="flex justify-center gap-4 p-6 pt-0">
                    <Button
                        onClick={() => router.push('/')}
                        className="h-12 w-full max-w-[200px] rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                    >
                        ホームに戻る
                    </Button>
                </div>
            </Card>
        </div>
    );
}
