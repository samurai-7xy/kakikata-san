"use client";

import { useState } from "react";
import CloseButton from "@/components/CloseButton";
import RubyText from "@/components/RubyText";

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
                className="relative bg-white p-6 rounded-lg shadow-md w-80"
            >
                <h1 className="text-xl font-bold mb-4 text-center"><RubyText segments={[{text:'ユーザー登録',ruby:'ゆーざーとうろく'}]}/></h1>
                <div className="mb-3">
                    <CloseButton />
                    <label className="block mb-1">
                        <RubyText segments={[{text:'ユーザー名',ruby:'ゆーざーめい'}]}/>
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block mb-1">
                        <RubyText segments={[{text:'メールアドレス',ruby:'めーるあどれす'}]}/>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block mb-1">
                        <RubyText segments={[{text:'パスワード',ruby:'ぱすわーど'}]}/>
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block mb-1">
                        <RubyText segments={[{text:'年齢',ruby:'ねんれい'}]}/>
                    </label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : "")}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">
                        <RubyText segments={[{text:'学年',ruby:'がくねん'}]}/>
                    </label>
                    <input
                        type="text"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                >
                    <RubyText segments={[{text:'登録',ruby:'とうろく'}]}/>
                </button>

                {message && <p className="mt-4 text-center text-sm">{message}</p>}
            </form>
        </div>
    );
}
