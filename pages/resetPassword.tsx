import React from 'react';
import ResetPasswordLayout from '@/components/layouts/ResetPasswordLayout.tsx';
import Space from '@/components/Space.tsx';
import Typography from '@/components/Typography/Typography.tsx';
import { FieldError, useForm as UseForm } from 'react-hook-form';
import Input from '@/components/Input/Input.tsx';
import { isValidEmail } from '@/utils/validCheck.ts';
import { useTranslation as UseTranslation } from 'next-i18next';
import Button from '@/components/Button/Button.tsx';
import ModalBox from '@/components/Modal/ModalBox.tsx';
import type { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

export default function resetPassword() {
  const { t } = UseTranslation('common');
  const {
    register,
    formState: { errors },
  } = UseForm({ mode: 'onChange' });

  return (
    <div className="font-pretendard w-full">
      <div className="relative w-full h-[60px]">
        <Space />
      </div>
      <div className="h-[69px]">
        <Typography variant="label">
          STEP <span className="font-bold">1</span> OF <span className="font-bold">2</span>{' '}
        </Typography>
      </div>
      <Typography variant="header">Forgotten your password? </Typography>
      <Typography variant="label">We&apos;ll send you a reset link to your email</Typography>
      <div className="mt-5 h-[404px]">
        <Input
          type="email"
          placeholder="Your email"
          register={register('email', {
            validate: (value) => {
              return isValidEmail(value, `${t('validEmail')}`);
            },
          })}
          error={errors.email as FieldError}
        />
      </div>
      <Button onClick={() => console.log('hoi')} disabled={false} size="lg">
        Next
      </Button>
      {/* <ModalBox title="Check Your Mail Box" content={`A reset link has just been sent to`} buttonType="default" hasCloseButton /> */}
    </div>
  );
}

resetPassword.getLayout = function getLayout(page: React.ReactElement) {
  return <ResetPasswordLayout>{page}</ResetPasswordLayout>;
};
