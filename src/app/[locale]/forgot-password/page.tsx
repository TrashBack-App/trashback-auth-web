'use client';

import { zodResolver } from '@hookform/resolvers/zod';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import { useToast } from '@/components/ui/use-toast';
import { SERVER_URL } from '@/utils/Constants';

const passwordSchema = z
  .string()
  .min(10, 'Password must be at least 10 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{10,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  );
const formSchema = z
  .object({
    newPassword: passwordSchema,
    confirmNewPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmNewPassword;
    },
    {
      message: 'Confirmation password does not match!',
      path: ['confirmNewPassword'],
    },
  );

export default function ForgetPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hash = searchParams.get('hash');
  if (!hash) {
    throw Error('No hash provided');
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await axios.post(
        `${SERVER_URL}/auth/reset/password`,
        { password: values.newPassword, hash },
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
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-balance text-muted-foreground">
              Reset your password
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
                  name="newPassword"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="new password"
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
                  name="confirmNewPassword"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Confirm new Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="confirm new password"
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
                <span>Reset</span>
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
  );
}
