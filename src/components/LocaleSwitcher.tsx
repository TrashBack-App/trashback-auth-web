'use client';

import { useLocale } from 'next-intl';
import type { ChangeEventHandler } from 'react';

import { usePathname, useRouter } from '@/libs/i18nNavigation';
import { AppConfig } from '@/utils/AppConfig';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    router.push(pathname, { locale: event.target.value });
    router.refresh();
  };

  return (
    <select
      defaultValue={locale}
      onChange={handleChange}
      className="fixed left-5 top-5 border border-gray-300 font-medium focus:outline-none focus-visible:ring p-1 rounded-md hover:bg-gray-300 hover:text-white"
    >
      {AppConfig.locales.map((elt) => (
        <option key={elt} value={elt}>
          {elt.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
