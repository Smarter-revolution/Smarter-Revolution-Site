export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-red-500" />
      <p className="mt-4 text-sm uppercase tracking-[0.3em] text-gray-500">
        Loading
      </p>
    </div>
  );
}
