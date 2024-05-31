'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'sonner';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { SERVER_URL } from '@/lib/constants';

export default function ConfirmEmailPage() {
  const router = useRouter();
  const t = useTranslations('MainPage');
  const searchParams = useSearchParams();
  const hash = searchParams.get('hash');
  if (!hash) {
    throw Error('No hash provided');
  }

  const handleConfirmEmailMutation = useMutation({
    mutationFn: async () => {
      const toastId = toast(t('activate-btn-msg'));
      toast.loading('Loading...', {
        description: t('activate-btn-msg'),
        id: toastId,
      });
      try {
        const response = await axios.post(
          `${SERVER_URL}/auth/email/confirm`,
          { hash },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.status === 200) {
          toast.success(t('toast-success-header'), {
            description: t('toast-success-activation-msg'),
          });
          router.push('/success');
        }
        toast.dismiss();
      } catch (error: any) {
        const errorDetails = error.response.data.message;
        toast.error(t('toast-error-header'), {
          description: `${t('toast-error-activation-msg')} ${errorDetails}`,
        });
        toast.dismiss();
      }
    },
  });
  const handleConfirmEmail = async () => {
    handleConfirmEmailMutation.mutate();
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t('confirm-email-msg')}</h1>
            <p className="text-balance text-muted-foreground">
              {t('activation-msg')}
            </p>
          </div>
          <div className="grid gap-4">
            <Button
              type="button"
              className="w-full"
              onClick={handleConfirmEmail}
            >
              {t('activate-btn-msg')}
            </Button>
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
