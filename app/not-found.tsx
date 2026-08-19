import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-semibold text-sand-12">404</h1>
      <p className="text-lg text-sand-10 mt-4">Page not found</p>
      <p className="text-sm text-sand-9 mt-2">
        The page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1.5 text-[13px] text-sand-12 hover:opacity-70 no-underline transition-opacity"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
