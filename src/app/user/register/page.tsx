// src/app/user/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CloseButton from "@/components/CloseButton";
import RubyText from "@/components/RubyText";

export default function RegisterPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState<number | "">("");
    const [grade, setGrade] = useState("");
    const [message, setMessage] = useState("");

    const BASE_URL = "https://kakikata-san.onrender.com";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/api/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    age: Number(age), // 数値に変換
                    grade,
                }),
            });

            if (res.ok) {
                setMessage("登録に成功しました！ログインページへ移動します...");
                setTimeout(() => router.push("/user/login"), 1500); // 自動でログインページへ
            } else {
                const errorData = await res.json();
                setMessage(`エラー: ${errorData.detail || "登録に失敗しました"}`);
            }
        } catch (err) {
            console.error(err);
            setMessage("サーバーに接続できませんでした");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="relative bg-white p-6 rounded-lg shadow-md w-80"
            >
                <h1 className="text-xl font-bold mb-4 text-center">
                    <RubyText segments={[{ text: "ユーザー登録", ruby: "ゆーざーとうろく" }]} />
                </h1>

                <CloseButton />

                <label className="block mb-1">ユーザー名</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 w-full rounded mb-3"
                    required
                />

                <label className="block mb-1">メールアドレス</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full rounded mb-3"
                    required
                />

                <label className="block mb-1">パスワード</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full rounded mb-3"
                    required
                />

                <label className="block mb-1">年齢</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                    className="border p-2 w-full rounded mb-3"
                    required
                />

                <label className="block mb-1">学年</label>
                <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="border p-2 w-full rounded mb-4"
                    required
                >
                    <option value="">選択してください</option>
                    <option value="小1">小1</option>
                    <option value="小2">小2</option>
                    <option value="小3">小3</option>
                    <option value="小4">小4</option>
                    <option value="小5">小5</option>
                    <option value="小6">小6</option>
                    <option value="中1">中1</option>
                    <option value="中2">中2</option>
                    <option value="中3">中3</option>
                    <option value="高校生">高校生</option>
                    <option value="大学生">大学生</option>
                    <option value="その他">その他</option>
                </select>

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
