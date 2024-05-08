'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { SERVER_URL } from '@/utils/Constants';

export default function ConfirmEmailPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hash = searchParams.get('hash');
  if (!hash) {
    throw Error('No hash provided');
  }

  const handleConfirmEmail = async () => {
    try {
      const result = await axios.post(
        `${SERVER_URL}/auth/email/confirm`,
        { hash },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (result.status === 200) {
        toast({
          title: 'Success!',
          description: 'Your email has been confirmed.',
        });
        router.push('/success');
      }
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    }
  };
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Confirm Email</h1>
            <p className="text-balance text-muted-foreground">
              Activate your account
            </p>
          </div>
          <div className="grid gap-4">
            <Button
              type="button"
              className="w-full"
              onClick={handleConfirmEmail}
            >
              Activate
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
