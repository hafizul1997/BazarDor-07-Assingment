import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-extrabold text-[#05893E]">404</p>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
      </h1>

      <p className="mt-3 max-w-md text-gray-600">
        আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে অথবা ঠিকানাটি ভুল।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#05893E] px-5 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}