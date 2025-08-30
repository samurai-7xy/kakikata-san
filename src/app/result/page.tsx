"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultPage() {
    const searchParams = useSearchParams();
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        const d = searchParams.get("data");
        if (d) {
            try {
                setResult(JSON.parse(decodeURIComponent(d)));
            } catch (e) {
                console.error("結果の読み込みに失敗しました", e);
            }
        }
    }, [searchParams]);

    if (!result) {
        return <div className="p-6">結果を読み込み中...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">採点結果</h1>
            <pre className="bg-gray-100 p-4 rounded">
                {JSON.stringify(result, null, 2)}
            </pre>
        </div>
    );
}
