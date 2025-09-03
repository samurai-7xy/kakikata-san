import Link from 'next/link';
import { X } from 'lucide-react';

// `href`と`className`を受け取れるようにする
export default function CloseButton({ href = '/', className = '' }) {
  return (
    <Link href={href} className={`absolute top-4 right-4 text-[#F5A623] hover:text-[#D99A1C] ${className}`}>
      <X size={67} />
    </Link>
  );
}