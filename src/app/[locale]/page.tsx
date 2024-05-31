'use client';

import Image from 'next/image';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslations } from 'use-intl';

export default function SuccessPage() {
  const t = useTranslations('MainPage');
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t('welcome-msg')}</h1>
          </div>
        </div>
      </div>
      <div className="hidden items-center justify-center bg-muted lg:flex">
        <Image
          src="/logo.png"
          alt="Image"
          width="320"
          height="280"
          unoptimized
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
