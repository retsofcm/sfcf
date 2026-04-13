'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4 space-y-6">
      <h2 className="text-3xl font-semibold">Something went wrong!</h2>
      <p className="text-gray-600 max-w-md">We encountered an unexpected error while trying to load this page.</p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="bg-green text-white px-6 py-3 font-medium hover:bg-logo-green-dark transition-colors"
        >
          Try again
        </button>
        <Link 
          href="/"
          className="border border-green text-green px-6 py-3 font-medium hover:bg-green/5 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
