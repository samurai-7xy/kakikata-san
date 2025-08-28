"use client";

import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState<number | "">("");
    const [grade, setGrade] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, age, grade }),
            });

            if (res.ok) {
                setMessage("登録に成功しました！");
            } else {
                const errorData = await res.json();
                setMessage(`エラー: ${errorData.detail || "登録に失敗しました"}`);
            }
        } catch (err) {
            setMessage("サーバーに接続できませんでした");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-80"
            >
                <h1 className="text-xl font-bold mb-4">ユーザ登録</h1>

                <input
                    type="text"
                    placeholder="ユーザー名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 mb-3 w-full rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mb-3 w-full rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 mb-3 w-full rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="年齢"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : "")}
                    className="border p-2 mb-3 w-full rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="学年"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="border p-2 mb-4 w-full rounded"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                >
                    登録
                </button>

                {message && <p className="mt-4 text-center text-sm">{message}</p>}
            </form>
        </div>
    );
}
