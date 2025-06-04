'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { authConfig } from '@/config/auth.config';

export default function AuthError() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!searchParams) return;
    
    const error = searchParams.get('error');
    const errorMessages = authConfig.messages.errors;

    switch (error) {
      case 'Configuration':
        setErrorMessage(errorMessages.configuration);
        break;
      case 'AccessDenied':
        setErrorMessage(errorMessages.accessDenied);
        break;
      case 'Verification':
        setErrorMessage(errorMessages.verification);
        break;
      case 'OAuthSignin':
        setErrorMessage('خطأ في تسجيل الدخول باستخدام OAuth');
        break;
      case 'OAuthCallback':
        setErrorMessage('خطأ في معالجة استجابة OAuth');
        break;
      case 'OAuthCreateAccount':
        setErrorMessage('فشل إنشاء حساب OAuth');
        break;
      case 'EmailCreateAccount':
        setErrorMessage('فشل إنشاء حساب بالبريد الإلكتروني');
        break;
      case 'Callback':
        setErrorMessage('خطأ في معالجة استجابة المصادقة');
        break;
      case 'OAuthAccountNotLinked':
        setErrorMessage('البريد الإلكتروني مرتبط بحساب آخر');
        break;
      case 'EmailSignin':
        setErrorMessage('فشل إرسال بريد إلكتروني للتحقق');
        break;
      case 'CredentialsSignin':
        setErrorMessage('فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد');
        break;
      case 'SessionRequired':
        setErrorMessage('يجب تسجيل الدخول للوصول إلى هذه الصفحة');
        break;
      default:
        setErrorMessage(errorMessages.default);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            خطأ في المصادقة
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {errorMessage}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-center">
            <Link
              href="/auth/signin"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              العودة إلى صفحة تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 