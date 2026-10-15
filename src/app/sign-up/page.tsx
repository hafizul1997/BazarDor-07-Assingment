"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await authClient.signUp.email({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      if (signUpError) {
        setError(signUpError.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    setError("");
    setSocialLoading(provider);

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      setError(
        `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন আপ করা যায়নি। OAuth সেটিংস চেক করুন।`
      );
      setSocialLoading("");
    }
  };

  const isBusy = loading || Boolean(socialLoading);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md sm:p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="text-2xl font-extrabold text-[#05893E]"
          >
            বাজার দর
          </Link>

          <h1 className="mb-2 mt-4 text-2xl font-bold text-gray-900">
            সাইন আপ
          </h1>

          <p className="text-sm leading-6 text-gray-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্ট তৈরি করুন।
          </p>
        </div>

        {/* Email Sign Up */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="আপনার নাম"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none transition focus:border-[#05893E] focus:ring-2 focus:ring-green-100"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block font-medium text-gray-700"
            >
              ইমেইল
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none transition focus:border-[#05893E] focus:ring-2 focus:ring-green-100"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block font-medium text-gray-700"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={8}
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none transition focus:border-[#05893E] focus:ring-2 focus:ring-green-100"
              required
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-md bg-red-50 p-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isBusy}
            className="w-full rounded-md bg-[#05893E] py-2.5 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
{/* Social Sign Up Buttons */}
<div className="grid grid-cols-2 gap-3">
  {/* Google Sign Up */}
  <button
    type="button"
    onClick={() => handleSocialSignIn("google")}
    disabled={loading || Boolean(socialLoading)}
    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
  >
    <svg
      className="h-5 w-5 shrink-0"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
        transform="translate(0 4)"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.68 5.96c4.48-4.14 7.1-10.23 7.1-17.61Z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
        transform="translate(1 0)"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.9-5.79l-7.68-5.96c-2.13 1.43-4.85 2.28-8.22 2.28-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
      />
    </svg>

    <span>
      {socialLoading === "google" ? "অপেক্ষা করুন..." : "Google"}
    </span>
  </button>

  {/* GitHub Sign Up */}
  <button
    type="button"
    onClick={() => handleSocialSignIn("github")}
    disabled={loading || Boolean(socialLoading)}
    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
  >
    <svg
      className="h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.1c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>

    <span>
      {socialLoading === "github" ? "অপেক্ষা করুন..." : "GitHub"}
    </span>
  </button>
</div>


        {/* Sign In */}
        <p className="mt-5 text-center text-sm text-gray-600">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-[#05893E] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>

        {/* Home */}
        <p className="mt-3 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 underline hover:text-[#05893E]"
          >
            হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </main>
  );
}