'use client';

import {
  AppWindowIcon,
  GanttChartIcon,
  LifeBuoyIcon,
  NewspaperIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const Sidebar = () => {
  const t = useTranslations('Sidebar');
  const pathname = usePathname();
  return (
    <section className="flex h-full w-[239px] flex-col items-center justify-between bg-[#080C38] pb-[10px] pl-[10px] pt-[40px]">
      <ul className="flex w-full flex-1 flex-col items-center gap-y-4">
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <Link
          href="/campaign"
          className={`${pathname.includes('/campaign') && 'border-r-[5px] border-green-700 bg-slate-500/40'} group flex h-[52px] w-full items-center gap-4 rounded-l-[3px] p-[20px] text-[20px] font-bold text-white hover:border-r-[5px] hover:border-[#1B26AA] hover:bg-slate-500/40`}
        >
          <GanttChartIcon
            className={`${pathname.includes('/campaign') && 'border-green-700 text-green-700'} h-8 w-10 rounded-[5px] border-2  p-1 group-hover:border-[#1B26AA] group-hover:text-[#1B26AA]`}
          />
          <span>{t('campaign_link')}</span>
        </Link>
        <Link
          href="/merchant"
          className={`${pathname.includes('/merchant') && 'border-r-[5px] border-green-700 bg-slate-500/40'} group flex h-[52px] w-full items-center gap-4 rounded-l-[3px] p-[20px] text-[20px] font-bold text-white hover:border-r-[5px] hover:border-[#1B26AA] hover:bg-slate-500/40`}
        >
          <AppWindowIcon
            className={`${pathname.includes('/merchant') && 'border-green-700 text-green-700'} h-8 w-10 rounded-[5px] border-2  p-1 group-hover:border-[#1B26AA] group-hover:text-[#1B26AA]`}
          />
          {t('merchant_link')}
        </Link>
        <Link
          href="/team"
          className="group flex h-[52px] w-full items-center gap-4 rounded-l-[3px] p-[20px] text-[20px] font-bold text-white hover:border-r-[5px] hover:border-[#1B26AA] hover:bg-slate-500/40"
        >
          <UserIcon className="h-8 w-10 rounded-[5px] border-2 p-1 group-hover:border-[#1B26AA] group-hover:text-[#1B26AA]" />
          {t('team_link')}
        </Link>
        <Link
          href="/template"
          className="group flex h-[52px] w-full items-center gap-4 rounded-l-[3px] p-[20px] text-[20px] font-bold text-white hover:border-r-[5px] hover:border-[#1B26AA] hover:bg-slate-500/40"
        >
          <NewspaperIcon className="h-8 w-10 rounded-[5px] border-2 p-1 group-hover:border-[#1B26AA] group-hover:text-[#1B26AA]" />
          {t('template_link')}
        </Link>
      </ul>
      <ul className="flex w-full flex-col">
        <Link
          href="/statistics"
          className="group flex h-[52px] w-full items-center gap-4 rounded-l-[3px] p-[20px] text-[20px] font-bold text-white hover:border-r-[5px] hover:border-[#1B26AA] hover:bg-slate-500/40"
        >
          <SettingsIcon className="h-8 w-10 rounded-[5px]  border-2 p-1 group-hover:border-[#1B26AA] group-hover:text-[#1B26AA]" />
          {t('statistic_link')}
        </Link>

        <Link
          href="/helpdesk"
          className="group flex h-[52px] w-full items-center gap-4 rounded-l-[3px] p-[20px] text-[20px] font-bold text-white hover:border-r-[5px] hover:border-[#1B26AA] hover:bg-slate-500/40"
        >
          <LifeBuoyIcon className="roup-hover:border-[#1B26AA] h-8 w-10 rounded-[5px]  border-2 p-1 group-hover:text-[#1B26AA]" />
          {t('helpdesk_link')}
        </Link>
      </ul>
    </section>
  );
};

export default Sidebar;
