'use client';

import { useMutation } from '@apollo/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';

import NavbarItemsLanding from '@/components/desktop/NavbarItemsLanding';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { LOGIN_BY_EMAIL } from '@/graphql/mutations';
import { CartIcon } from '@/icons/general';
import { FaceBookIcon, RocketIcon, XIcon } from '@/icons/landing';
import { imagesUrls } from '@/lib/constants';

import ChildIcon from '../../../icons/landing/Child.icon';
import InstagramIcon from '../../../icons/landing/Instagram.icon';

function Hero() {
  const t = useTranslations('Landing');
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  });
  const [userLogin, { error }] = useMutation(
    LOGIN_BY_EMAIL,
    // refetchQueries: [{ query: GET_NOVEL, variables: { id } }],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  // const display = useTransform(scrollYProgress, (pos) => pos >= 0.5 && 'none');
  const handleUserLogin = async () => {
    const { data } = await userLogin({
      variables: {
        authEmailLoginDto: {
          email: 'test1@example.com',
          password: 'P_assword123',
        },
      },
    });
    console.log('resty', data, error);
  };
  return (
    <section ref={targetRef} className="z-20 flex w-full flex-col items-center">
      <nav className="fixed top-0 z-10 flex w-full max-w-[1300px] flex-col items-center pt-2">
        <motion.div
          style={{ opacity }}
          className="flex w-full items-center justify-between pb-2"
        >
          <Image
            src={imagesUrls.logoImage}
            alt="landing-hero-image"
            width={120}
            height={75}
            unoptimized
            className="object-contain"
          />
          <div className="flex h-full items-center justify-center gap-4">
            <Link
              href="/facebook"
              className="flex size-16 cursor-pointer items-center justify-center border-b-2 border-transparent hover:border-primary"
            >
              <FaceBookIcon iconClass="w-10 h-10" />
            </Link>
            <Link
              href="/x"
              className="flex size-16 cursor-pointer items-center justify-center border-b-2 border-transparent hover:border-black"
            >
              <XIcon iconClass="w-8 h-8" />
            </Link>
            <Link
              href="/instagram"
              className="flex size-16 cursor-pointer items-center justify-center border-b-2 border-transparent hover:border-[#ff48aa]"
            >
              <InstagramIcon iconClass="w-10 h-10" />
            </Link>
            {/*            <Button className="flex items-center justify-center gap-2">
              <span>{t('landing_login')}</span>
              <PlusIcon className="size-6" />
            </Button> */}
          </div>
          <div className="flex h-full items-center gap-4">
            <LocaleSwitcher />
            <button
              type="button"
              aria-label="login"
              onClick={() => handleUserLogin()}
              className=" flex size-20 rotate-45 items-center justify-center rounded-[30px] bg-white shadow-xl shadow-blue-400"
            >
              <ChildIcon iconClass="w-16 h-16 text-primary -rotate-45" />
            </button>
            <div className="flex size-20 rotate-45 items-center justify-center rounded-[30px] bg-white shadow-xl shadow-blue-400">
              <RocketIcon iconClass="w-16 h-16 text-primary -rotate-45" />
            </div>
          </div>
        </motion.div>
        <div className="flex w-full justify-end gap-4">
          <button
            type="button"
            aria-label="login"
            className="px-3 h-8 cursor-pointer rounded-t-2xl bg-primary text-lg font-semibold text-white hover:bg-primary/50"
          >
            {t('signIn')}
          </button>
          <button
            type="button"
            aria-label="login"
            className="px-2 h-8 cursor-pointer rounded-t-2xl bg-primary text-lg font-semibold text-white hover:bg-primary/50"
          >
            {t('signUp')}
          </button>
        </div>
        <div className="z-10 flex h-[70px] w-full items-center justify-between rounded-b-2xl rounded-tl-2xl border border-primary bg-white px-6">
          <NavbarItemsLanding />
          <CartIcon iconClass="w-12 h-12 text-[#ff4d16]" />
        </div>
      </nav>
      <motion.section className="top-0" style={{ opacity }}>
        <Image
          src={imagesUrls.heroImage}
          alt="landing-hero-image"
          width={1920}
          height={1076}
          unoptimized
          className="object-cover"
        />
      </motion.section>
    </section>
  );
}

export default Hero;
