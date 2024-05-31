import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'sonner';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { SERVER_URL } from '@/lib/constants';

type DrawerProp = {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserResponse;
};

export function DeleteAccountDrawer({
  openDrawer,
  setOpenDrawer,
  user,
}: DrawerProp) {
  const t = useTranslations('MainPage');
  const router = useRouter();
  const handleDeleteAccount = async () => {
    const toastId = toast(t('delete-account-msg'));
    toast.loading('Loading...', {
      description: t('delete-account-msg'),
      id: toastId,
    });
    try {
      const response = await axios.delete(`${SERVER_URL}/auth/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.result.token}`,
        },
      });
      if (response.status === 200) {
        toast.success(t('toast-success-header'), {
          description: t('toast-success-deletion-msg'),
        });
        setOpenDrawer(false);
        router.push('/success');
      }
    } catch (error: any) {
      const errorDetails = error.response.data.message;
      toast.error(t('toast-error-header'), {
        description: `${t('toast-error-activation-msg')} ${errorDetails}`,
      });
    }
    toast.dismiss();
  };
  return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              {t('delete-account-msg')}: {user?.result.user.fullName || ''}
            </DrawerTitle>
            <DrawerDescription>
              {t('delete-account-header2-msg')}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">{t('delete-notif-msg')}</div>
          <DrawerFooter>
            <Button onClick={handleDeleteAccount}>{t('delete-btn-msg')}</Button>
            <DrawerClose asChild>
              <Button variant="outline">{t('cancel-btn-msg')}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
