import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#1A1918] text-[#F3EFEA] font-mono-code p-4">
      <h2 className="text-3xl font-bold mb-2">404 - Page Not Found</h2>
      <p className="text-sm text-[#A39E95] mb-4">The requested system resource does not exist.</p>
      <Link href="/" className="px-4 py-2 rounded bg-emerald-800 text-white text-xs hover:bg-emerald-700">
        Return Home &rarr;
      </Link>
    </div>
  );
}
