'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'sonner';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslations } from 'use-intl';
import * as z from 'zod';

import { DeleteAccountDrawer } from '@/components/DeleteAccountDrawer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SERVER_URL } from '@/lib/constants';

const passwordSchema = z
  .string()
  .min(10, 'Password must be at least 10 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{10,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  );
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: passwordSchema,
});

export default function ForgetPasswordPage() {
  const t = useTranslations('MainPage');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [user, setUser] = useState<UserResponse>();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleSubmitMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const toastId = toast(t('activate-btn-msg'));
      toast.loading('Loading...', {
        description: t('activate-btn-msg'),
        id: toastId,
      });
      try {
        const response = await axios.post(
          `${SERVER_URL}/auth/email/login`,
          { email: values.email, password: values.password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.status === 200) {
          setUser(response.data);
          toast.success(t('toast-success-header'), {
            description: t('toast-success-activation-msg'),
          });
          toast.dismiss();
          setOpenDrawer(true);
        }
      } catch (error: any) {
        const errorDetails = error.response.data.message;
        toast.error(t('toast-error-header'), {
          description: `${t('toast-error-activation-msg')} ${errorDetails}`,
        });
        toast.dismiss();
      }
    },
  });
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    handleSubmitMutation.mutate(values);
  };

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold"> {t('delete-account-msg')}</h1>
              <p className="text-balance text-muted-foreground">
                {t('delete-account-header2-msg')}
              </p>
            </div>
            <Form {...form}>
              <form
                id="stepOneCampaignForm"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex w-full flex-1 flex-col gap-4"
              >
                <div className="flex w-full flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>{t('email-msg')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('email-msg')}
                              type="newPassword"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>{t('password-msg')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('password-msg')}
                              type="confirmNewPassword"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <Button
                  /* eslint-disable-next-line no-plusplus,no-return-assign */
                  type="submit"
                  className="flex items-center justify-center gap-2"
                >
                  <span>{t('delete-btn-msg')}</span>
                </Button>
              </form>
            </Form>
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
      {user && (
        <DeleteAccountDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          user={user}
        />
      )}
    </>
  );
}
