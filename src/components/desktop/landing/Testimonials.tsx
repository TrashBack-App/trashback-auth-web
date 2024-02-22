import { Fredericka_the_Great } from 'next/font/google';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  CircleIcon,
  CurvedArrowIcon,
  CurvedArrowLeftIcon,
} from '../../../icons/general';
import * as icons from '../../../icons/general';

const frederickaTheGreat = Fredericka_the_Great({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
});

export function getRandomIcon(props: IconProps): React.JSX.Element {
  const iconKeys = Object.keys(icons);
  const randomIndex = Math.floor(Math.random() * iconKeys.length);
  const randomKey = iconKeys[randomIndex] as keyof typeof icons;
  const SelectedIcon = icons[randomKey];
  return <SelectedIcon {...props} />;
}

const TestimonialCard = () => {
  const randomIcon = getRandomIcon({ iconClass: 'size-20 text-tertiary' });
  return (
    <div className="z-10 flex size-[300px] flex-col gap-2 rounded-[50px] border-2 border-primary bg-white p-4">
      {randomIcon}
      <p className="text-left font-semibold">
        find your wy to achieve your goals as long as you still breathing, ind
        your wy to achieve your goals as long as you still breathing
      </p>
    </div>
  );
};

const Testimonials = () => {
  const t = useTranslations('Landing');
  return (
    <section className="relative flex min-h-max w-full flex-col items-center bg-blue-100 p-4">
      <Image
        src="/assets/images/landing/our_services.png"
        alt="our_service"
        fill
        className="absolute size-full"
      />
      <div className="flex size-full max-w-[1400px] flex-col items-center gap-4 text-center">
        <h1
          className={`${frederickaTheGreat.className} mb-16 pb-6 text-6xl capitalize text-primary`}
        >
          {t('testimonials')}
        </h1>
        <div className="flex w-full justify-around">
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
        </div>
        <div className="flex w-full justify-center gap-4">
          <button
            type="button"
            aria-label="shift"
            className="group relative flex size-[70px] cursor-pointer items-center justify-center rounded-full bg-primary/30 hover:bg-primary/80"
          >
            <CircleIcon iconClass="size-[90%] absolute m-1 text-primary group-hover:text-white" />
            <CurvedArrowIcon iconClass="size-8 text-primary relative group-hover:text-white" />
          </button>
          <button
            type="button"
            aria-label="shift"
            className="group relative flex size-[70px] cursor-pointer items-center justify-center rounded-full bg-tertiary/30 hover:bg-tertiary/80"
          >
            <CircleIcon iconClass="size-[90%] absolute m-1 text-tertiary group-hover:text-white" />
            <CurvedArrowLeftIcon iconClass="size-8 text-tertiary relative group-hover:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
