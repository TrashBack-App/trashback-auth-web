import { getTranslations } from 'next-intl/server';

import Hero from '@/components/desktop/landing/Hero';
import HowItWorks from '@/components/desktop/landing/HowItWorks';
import OurJob from '@/components/desktop/landing/OurJob';
import OurActivities from '@/components/desktop/landing/OurActivities';
import CommunityOffers from '@/components/desktop/landing/CommunityOffers';
import Testimonials from '@/components/desktop/landing/Testimonials';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function Index() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <OurJob />
      <HowItWorks />
      <OurActivities />
      <CommunityOffers />
      <Testimonials />
    </main>
  );
}
