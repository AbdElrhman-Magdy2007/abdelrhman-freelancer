'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Responses } from '@/constants/enums';

export default function AuthError() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!searchParams) return;
    
    const errorParam = searchParams.get('error');
    if (errorParam) {
      try {
        const errorData = JSON.parse(errorParam);
        setError(errorData.message || 'An authentication error occurred');
      } catch {
        setError('An authentication error occurred');
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-center">
            <a
              href="/auth/signin"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Return to Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 