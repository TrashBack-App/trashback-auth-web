import { Fredericka_the_Great } from 'next/font/google';
import React from 'react';

import {
  ArrowThickIcon,
  ChildWhiteBgIcon,
  CircleIcon,
  DonationWhiteBgIcon,
  GroupWhiteBgIcon,
} from '@/icons/general';

const frederickaTheGreat = Fredericka_the_Great({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
});

const OurJob = () => {
  return (
    <section className="flex min-h-max w-full flex-col items-center p-4">
      <div className="flex size-full max-w-[1400px] flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1
            className={`${frederickaTheGreat.className} pb-6 text-6xl text-primary`}
          >
            Our Job
          </h1>
          <p className="max-w-[500px] text-lg font-semibold">
            Empowering readers to exchange, donate, and swap books online,
            fostering community engagement and spreading the joy of reading
            globally.
          </p>
        </div>
        <div className="flex w-full justify-around">
          <div className="size-[300px] rounded-[50px] border-2 border-primary">
            <div className="flex size-[300px] -translate-x-3 -translate-y-3 flex-col items-center justify-center gap-2 rounded-[50px] border-4 border-primary bg-white">
              <div className="relative flex size-[100px] items-center justify-center rounded-full bg-primary/30">
                <CircleIcon iconClass="size-[90%] absolute m-1 text-primary" />
                <ChildWhiteBgIcon iconClass="size-20 text-primary text-white relative" />
              </div>
              <h4 className="text-xl capitalize">interest group of</h4>
              <h2 className="text-4xl font-bold capitalize">people</h2>
              <ArrowThickIcon iconClass="size-20 text-primary" />
            </div>
          </div>
          <div className="size-[300px] rounded-[50px] border-2 border-tertiary">
            <div className="flex size-[300px] -translate-x-3 -translate-y-3 flex-col items-center justify-center gap-2 rounded-[50px] border-4 border-tertiary bg-white">
              <div className="relative flex size-[100px] items-center justify-center rounded-full bg-tertiary/30">
                <CircleIcon iconClass="size-[90%] absolute m-1 text-tertiary" />
                <DonationWhiteBgIcon iconClass="size-16 text-primary text-white" />
              </div>
              <h4 className="text-xl capitalize">interest group of</h4>
              <h2 className="text-4xl font-bold capitalize">Economic</h2>
              <ArrowThickIcon iconClass="size-20 text-tertiary" />
            </div>
          </div>
          <div className="size-[300px] rounded-[50px] border-2 border-primary">
            <div className="flex size-[300px] -translate-x-3 -translate-y-3 flex-col items-center justify-center gap-2 rounded-[50px] border-4 border-primary bg-white">
              <div className="relative flex size-[100px] items-center justify-center rounded-full bg-primary/30">
                <CircleIcon iconClass="size-[90%] absolute m-1 text-primary" />
                <GroupWhiteBgIcon iconClass="size-20 text-white" />
              </div>
              <h4 className="text-xl capitalize">interest group of</h4>
              <h2 className="text-4xl font-bold capitalize">social</h2>
              <ArrowThickIcon iconClass="size-20 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJob;
