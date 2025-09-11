"use client";

import dynamic from "next/dynamic";

// クライアント専用で読み込む（SSRをオフ）
const GenkoYoshiEditor = dynamic(
  () => import("../../components/GenkoYoshiEditor"),
  { ssr: false }
);

export default function Page() {
  return <GenkoYoshiEditor />;
}
