export default function Loading() {
  return (
    <main className="container mx-auto space-y-6 px-4 py-6">
      {/* Hero skeleton */}
      <div className="flex animate-pulse flex-col gap-5 rounded-xl bg-gray-100 p-6 md:flex-row">
        <div className="flex-1 space-y-4">
          <div className="h-5 w-28 rounded bg-gray-300" />
          <div className="h-8 w-3/4 rounded bg-gray-300" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-2/3 rounded bg-gray-200" />
          <div className="h-10 w-36 rounded-lg bg-gray-300" />
        </div>
        <div className="h-40 w-full rounded-xl bg-gray-200 md:w-72" />
      </div>

      {/* Product card skeletons */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border border-gray-100 p-4"
          >
            <div className="h-5 w-2/3 rounded bg-gray-200" />
            <div className="mt-4 h-8 w-1/2 rounded bg-gray-300" />
            <div className="mt-3 h-4 w-full rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}