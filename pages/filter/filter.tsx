import React, { useState, useEffect, useMemo } from 'react';
import Router from 'next/router';
import FilterLayout from '@/components/layouts/FilterLayout.tsx';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import { Select, Typography, Toggle, Checkbox, Space, Button, Input } from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { guList as GuList, dongList as DongList } from './guDongList.tsx';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['filter', 'common'])),
  },
});

export default function Filter() {
  const filterTranslation = useTranslation('filter');
  const commonTranslation = useTranslation('common');
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    Router.push('/signup/step2');
  };
  // const GU = watch('Gu');
  const [guValue, setGuValue] = useState('');
  const filteredDongList = DongList.filter((v) => v.gu === guValue);
  return (
    <>
      <div className="mt-[9px] mb-[20px]">
        <Typography variant="header" fontStyle="semiBold">
          {filterTranslation.t('Location')}
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          options={GuList}
          register={register('Gu', {
            validate: (value) => {
              setGuValue(watch('Gu'));
              return value;
            },
          })}
          placeholder={filterTranslation.t('Gu') as string}
        />
        <Select
          options={filteredDongList}
          register={register('Dong')}
          placeholder={filterTranslation.t('Dong') as string}
          disabled={!watch('Gu')}
        />
        <div className="py-[64px] ">
          <div className="mt-[9px] mb-[20px]">
            <Typography variant="header" fontStyle="semiBold">
              {filterTranslation.t('Deposit')}
            </Typography>
          </div>
          <div className="flex justify-between items-center mb-[20px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              {filterTranslation.t('View rooms without deposit')}
            </Typography>
            <Toggle className="ml-2" />
          </div>
          <div className="mb-[8px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              {filterTranslation.t('Min 0 ￦ - Max 500,000,000 ￦ ')}
            </Typography>
          </div>
          <div className="mb-[8px]">
            <Input
              placeholder={filterTranslation.t('Min') as string}
              type="text"
              register={register('min', {
                validate: (value) => {
                  return value;
                },
              })}
            />
          </div>
          <Input
            placeholder={filterTranslation.t('Max') as string}
            type="text"
            register={register('max', {
              validate: (value) => {
                return value;
              },
            })}
          />
        </div>
        <div className="fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
          <div className="w-full">
            <hr className="my-[18px] border-x-0" />
            <div className="flex mb-[12px]">
              <Checkbox
                label={filterTranslation.t('14over') as string}
                required
                register={register('yearChecked')}
                checked={watch('yearChecked')}
              />
              <Space />
            </div>
            <div className="flex mb-[12px]">
              <Checkbox
                label={filterTranslation.t('termsAndCondition') as string}
                required
                register={register('termChecked')}
                checked={watch('termChecked')}
              />
              <Space />
            </div>
            <div className="flex mb-[16px]">
              <Checkbox
                label={filterTranslation.t('privacyPolicies') as string}
                required
                register={register('privacyChecked')}
                checked={watch('privacyChecked')}
              />
              <Space />
            </div>
            <div className="mb-[13px]">
              <Button size="lg" type="submit" disabled={false}>
                {commonTranslation.t('next')}
              </Button>
            </div>
            <div className="flex mb-[6px] justify-center">
              <p className="text-[14px]">{filterTranslation.t('checkMember')}</p>
              <button
                className="text-[16px] text-r1 ml-1 underline"
                onClick={() => {
                  Router.push('/login');
                }}
                type="button"
              >
                {filterTranslation.t('login')}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

/** RoomList 주석 추가 */
Filter.getLayout = function getLayout(page: React.ReactElement) {
  return <FilterLayout>{page}</FilterLayout>;
};
