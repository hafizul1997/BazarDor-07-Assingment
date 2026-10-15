
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Use session values until the user edits the form.
  const currentName = name ?? user?.name ?? "";
  const currentImage = image ?? user?.image ?? "";

  if (isPending) {
    return <p className="p-10 text-center">প্রোফাইল লোড হচ্ছে...</p>;
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">
          প্রোফাইল দেখতে সাইন ইন করুন
        </h1>

        <Link
          href="/sign-in"
          className="mt-5 inline-block rounded-lg bg-[#05893E] px-5 py-3 font-semibold text-white"
        >
          সাইন ইন
        </Link>
      </main>
    );
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setError("");
    setMessage("");

    const trimmedName = currentName.trim();
    const trimmedImage = currentImage.trim();

    if (!trimmedName) {
      setError("নাম লিখুন।");
      return;
    }

    if (trimmedImage) {
      try {
        const parsedUrl = new URL(trimmedImage);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          setError("একটি বৈধ HTTP বা HTTPS image URL দিন।");
          return;
        }
      } catch {
        setError("সঠিক image URL দিন।");
        return;
      }
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
        image: trimmedImage || "",
      });

      if (result.error) {
        setError(
          result.error.message || "প্রোফাইল update করা যায়নি।"
        );
        return;
      }

      setMessage("আপনার প্রোফাইল update হয়েছে।");

      // Refresh session data after a successful update.
      await authClient.getSession();
      router.refresh();
    } catch {
      setError("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-[70vh] bg-gray-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#05893E]">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            আপনার ব্যক্তিগত তথ্য update করুন।
          </p>
        </div>

        <div className="flex items-center gap-4">
          {currentImage ? (
            <Image
              src={currentImage}
              alt="Profile"
              width={64}
              height={64}
              unoptimized
              className="h-16 w-16 rounded-full border object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#05893E] text-2xl font-bold text-white">
              {currentName.trim().charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate font-semibold">{user.name}</p>
            <p className="truncate text-sm text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {message && (
          <p
            role="status"
            className="rounded-lg bg-green-50 p-3 text-sm text-green-700"
          >
            {message}
          </p>
        )}

        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium"
          >
            নাম
          </label>

          <input
            id="name"
            required
            value={currentName}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#05893E]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium"
          >
            ইমেইল
          </label>

          <input
            id="email"
            type="email"
            value={user.email}
            readOnly
            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="mb-1 block text-sm font-medium"
          >
            Profile image URL
          </label>

          <input
            id="image"
            type="url"
            value={currentImage}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/profile.jpg"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#05893E]"
          />

          <p className="mt-1 text-xs text-gray-500">
            ছবি সরাতে input খালি রেখে save করুন।
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-lg bg-[#05893E] px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {saving ? "Save হচ্ছে..." : "পরিবর্তন Save করুন"}
        </button>
      </form>
    </main>
  );
}
