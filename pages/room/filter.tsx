import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import { Chip, Select, Typography, Toggle, Checkbox, Space, Button, Input } from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ModalSetterContext } from '@/context/ModalProvider.tsx';
import { GuList, DongList } from '../../public/js/guDongList.ts';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['filter', 'common'])),
  },
});

export default function Filter({
  getChildData,
  closeModal,
  roomsLength,
}: {
  getChildData: (data: any) => void;
  closeModal: () => void;
  roomsLength: number;
}) {
  const filterTranslation = useTranslation('common');
  const { register, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const [guValue, setGuValue] = useState('');
  // const modalSetter = React.useContext(ModalSetterContext);
  const [dongValue, setDongValue] = useState<{ gu: string; value: string; label: string }>({
    gu: '',
    value: '',
    label: '',
  });
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [clickedChip, setClickedChip] = useState('');
  const filteredDongList = DongList.filter((v) => v.gu === guValue);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    getChildData(data);
    closeModal();
  };

  // 옵션 선택 시 실행될 함수
  const handleOptionSelect = (option: string) => {
    let resultOptions: string[];
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.indexOf(option) <= -1) {
        resultOptions = [...prevSelectedOptions, option];
      } else {
        resultOptions = prevSelectedOptions;
      }
      return [...resultOptions];
    });
  };

  useEffect(() => {
    if (dongValue.value !== '') {
      handleOptionSelect(dongValue.label);
    }
  }, [dongValue]);

  /** Dong Select Component 변경될 경우 -> 일반 선언형 함수로 정의할 경우 Rendering 마다 새로운 인스턴스가 생성됨 */
  const handleDongChange = useCallback(
    (selectedValue: string, selectedLabel: string) => {
      // 선택된 value와 label 값을 이용하여 원하는 작업 수행
      setDongValue({ value: selectedValue, label: selectedLabel, gu: watch('gu') });
    },
    [watch]
  );
  const handleChipClick = (label: React.SetStateAction<string>) => {
    setClickedChip(label);
  };
  const handlePropsClick = (option: string, index: number) => {
    let result = false;
    if ((clickedChip || '') !== '') {
      result = clickedChip === option || selectedOptions.length === 1;
    } else {
      result = index === 0;
    }
    return result;
  };
  // 옵션 제거 시 실행될 함수
  const handleOptionRemove = (option: string, index: number) => {
    setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((item) => item !== option));
    const removedOptions = selectedOptions.filter((item) => item === option);
    // 선택된 칩이 없거나 클릭된 칩이 삭제된 칩인 경우에 맨 처음 칩을 clickedChip으로 설정
    if (selectedOptions.length === 0 || removedOptions.length > 0) {
      setClickedChip(selectedOptions[0] || '');
    }
  };
  return (
    <div className="h-screen overflow-y-scroll">
      <div className="mt-[9px] mb-[20px]" key="filter">
        <Typography variant="header" fontStyle="semiBold">
          {filterTranslation.t('location')}
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <Select
            options={GuList}
            register={register('gu', {
              validate: () => {
                setGuValue(watch('gu'));
                return true;
              },
            })}
            placeholder={filterTranslation.t('gu') as string}
          />
        </section>
        <Select
          options={filteredDongList}
          register={register('dong', {
            validate: () => {
              return true;
            },
          })}
          placeholder={filterTranslation.t('dong') as string}
          disabled={!watch('gu')}
          onChange={handleDongChange}
        />
        <div>
          {/* 선택된 옵션들에 대해 동적으로 Chip 컴포넌트 렌더링 */}
          {selectedOptions.map((option, index) => {
            return (
              <Chip
                key={option}
                label={option}
                onDelete={() => handleOptionRemove?.(option, index)}
                onChipClick={() => handleChipClick?.(option)}
                clicked={handlePropsClick?.(option, index)}
              />
            );
          })}
        </div>
        <div className="py-[64px]">
          <div className="mt-[9px] mb-[4px]">
            <Typography variant="header" fontStyle="semiBold">
              {filterTranslation.t('deposit')}
            </Typography>
          </div>
          <div className="flex justify-between items-center mb-[20px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              {filterTranslation.t('viewRoomsWithoutDeposit')}
            </Typography>
            <Toggle className="ml-2" register={register('depositToggle')} />
          </div>
          <div className="mb-[8px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              {filterTranslation.t('minMax')}
            </Typography>
          </div>
          <div className="mb-[8px]">
            <Input
              placeholder={filterTranslation.t('min') as string}
              type="number"
              register={register('depositMin', {
                validate: () => {
                  return true;
                  // return !!watch('depositToggle') && isRequired(value, '필수 항목');
                },
              })}
              disabled={!watch('depositToggle')}
            />
          </div>
          <Input
            placeholder={filterTranslation.t('max') as string}
            type="number"
            register={register('depositMax', {
              validate: () => {
                return true;
                // return !!watch('depositToggle') && isRequired(value, '필수 항목');
              },
            })}
            disabled={!watch('depositToggle')}
          />
          <div className="mt-[28px] mb-[4px]">
            <Typography variant="header" fontStyle="semiBold">
              {filterTranslation.t('monthRent')}
            </Typography>
          </div>
          <div className="flex justify-between items-center mb-[20px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              {filterTranslation.t('includeMainFee')}
            </Typography>
            <Toggle className="ml-2" register={register('monthToggle')} />
          </div>
          <div className="mb-[8px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              {filterTranslation.t('minMax')}
            </Typography>
          </div>
          <div className="mb-[8px]">
            <Input
              placeholder={filterTranslation.t('monthMin') as string}
              type="number"
              register={register('monthMin', {
                validate: () => {
                  return true;
                  // return !!watch('monthToggle') && isRequired(value, '필수 항목');
                },
              })}
              disabled={!watch('monthToggle')}
            />
          </div>
          <Input
            placeholder={filterTranslation.t('monthMax') as string}
            type="number"
            register={register('monthMax', {
              validate: () => {
                return true;
                // return !!watch('monthToggle') && isRequired(value, '필수 항목');
              },
            })}
            disabled={!watch('monthToggle')}
          />
        </div>
        <div className="mt-[72px] mb-[4px]">
          <Typography variant="header" fontStyle="semiBold">
            {filterTranslation.t('dateAvailable')}
          </Typography>
        </div>
        <div className="flex justify-between items-center mb-[20px]">
          <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
            {filterTranslation.t('viewRoomsAvailable')}
          </Typography>
          <Toggle className="ml-2" register={register('dateAvailable')} />
        </div>
        <div className="mb-[16px]">
          <Input
            placeholder={filterTranslation.t('mmddyyyy') as string}
            type="text"
            register={register('mmddyyyy', {
              validate: () => {
                return true;
                // return !!watch('dateAvailable') && isRequired(value, '필수 항목');
              },
            })}
            disabled={!watch('dateAvailable')}
            // error={errors.mmddyyyy as FieldError}
          />
        </div>
        <hr className="mt-[40px] border-x-0" />
        <div className="mt-[32px] mb-[4px]">
          <Typography variant="header" fontStyle="semiBold">
            {filterTranslation.t('typeOfHousing')}
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-[8px] mt-[12px]">
          <Checkbox
            type="outlined"
            label={filterTranslation.t('studio') as string}
            register={register('studioChecked')}
            checked={watch('studioChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('bedFlats') as string}
            register={register('bedFlatsChecked')}
            checked={watch('bedFlatsChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('shareHouse') as string}
            register={register('shareHouseChecked')}
            checked={watch('shareHouseChecked')}
          />
        </div>
        <hr className="mt-[32px] border-x-0" />
        <div className="mt-[32px] mb-[4px]">
          <Typography variant="header" fontStyle="semiBold">
            {filterTranslation.t('furnishing')}
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-[8px] mt-[12px] mb-[166px] ">
          <Checkbox
            type="outlined"
            label={filterTranslation.t('bed') as string}
            register={register('bedChecked')}
            checked={watch('bedChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('induction') as string}
            register={register('inductionChecked')}
            checked={watch('inductionChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('airconditioner') as string}
            register={register('airconditionerChecked')}
            checked={watch('airconditionerChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('gasStove') as string}
            register={register('gasStoveChecked')}
            checked={watch('gasStoveChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('refrigerator') as string}
            register={register('refrigeratorChecked')}
            checked={watch('refrigeratorChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('wardrobe') as string}
            register={register('wardrobeChecked')}
            checked={watch('wardrobeChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('washingMachine') as string}
            register={register('washingMachineChecked')}
            checked={watch('washingMachineChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('doorLock') as string}
            register={register('doorLockChecked')}
            checked={watch('doorLockChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('tv') as string}
            register={register('tvChecked')}
            checked={watch('tvChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('kitchenette') as string}
            register={register('kitchenetteChecked')}
            checked={watch('kitchenetteChecked')}
          />
        </div>
        <div className="mt-[83px] fixed bottom-[0px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
          <div className="w-full">
            <div className="mb-[13px] space-x-[8px] max-w-max">
              <Button type="reset" size="reset" color="noBg">
                {filterTranslation.t('reset')}
              </Button>
              <Button type="submit" size="apply">
                {/* TODO : 조회된 Room 개수로 변경 필요  */}
                {`${filterTranslation.t('apply')} (${roomsLength} Rooms)`}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
