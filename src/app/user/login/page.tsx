"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CloseButton from "@/components/CloseButton";
import RubyText from "@/components/RubyText";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const BASE_URL = "https://kakikata-san.onrender.com";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            const res = await fetch(`${BASE_URL}/api/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errData = await res.json();
                setMessage(errData.detail || "メールアドレスまたはパスワードが間違っています");
                setIsLoading(false);
                return;
            }

            const data = await res.json();
            console.log("ログイン成功:", data);

            // username を localStorage に保存
            localStorage.setItem("username", data.username);

            // ホーム画面に遷移
            router.push("/");
        } catch (err) {
            console.error("ログインエラー:", err);
            setMessage("サーバーに接続できませんでした");
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="relative bg-white p-6 rounded-lg shadow-md w-80"
            >
                <CloseButton />

                <h1 className="text-xl font-bold mb-4 text-center">
                    <RubyText segments={[{ text: "ログイン", ruby: "ろぐいん" }]} />
                </h1>

                <div className="mb-3">
                    <label className="block mb-1">
                        <RubyText segments={[{ text: "メールアドレス", ruby: "めーるあどれす" }]} />
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">
                        <RubyText segments={[{ text: "パスワード", ruby: "ぱすわーど" }]} />
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full disabled:bg-gray-400"
                >
                    {isLoading ? "ログイン中..." : "ログイン"}
                </button>

                {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
            </form>
        </div>
    );
}
