/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import NoLiked from '@/public/icons/noLiked.svg';
import useModal from '@/hooks/useModal';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { Nav, Typography } from '@/components/index.tsx';
import { useRouter } from 'next/router';
// TODO 데이터가 구체화되면 바꿔줘야함
interface MyPostingProps {
  roomInfo: any | null;
}

export default function Liked({ roomInfo }: MyPostingProps) {
  const router = useRouter();
  /**
   *  좋아요 없을 때 보여주는 Component
   */
  const NoPostings = () => {
    const noPostingStyle = 'text-[20px] font-bold mt-[29px] text-center';
    const containerStyle = 'flex flex-col items-center justify-start mt-[135px]'; // 'justify-start'로 변경

    return (
      <div className={containerStyle}>
        <NoLiked />
        <div className={noPostingStyle}>{`You don't have liked room`}</div>
        <div className="text-[16px] text-g5 font-pretendard">{`There aren't any rooms you liked yet.`}</div>
        <div className="text-[16px] text-g5 font-pretendard">Find places that you like!</div>
        <div className="mt-[29px]">
          <button
            className="font-pretendard text-[16px] font-semibold bg-g0 border border-solid border-r1 rounded-[2px] text-r1 w-[120px] h-[48px]"
            onClick={() => router.push('/')}
            type="button"
            data-size="md"
          >
            Look around
          </button>
        </div>
        <div className="mt-[83px] fixed bottom-[-15px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max z-20 border-t-[1px] border-g2">
          <div className="w-full">
            <div className="mb-[13px] space-x-[8px] max-w-max">
              <Nav initMenu={2} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LikedComponent = () => {
    return (
      <div>
        <Typography variant="body" customClassName="text-left font-bold text-[16px] text-g7">
          There are <span className="text-r1">{`${(roomInfo || []).length} rooms`}</span> in total!
        </Typography>
        {/* {rooms.map((room, idx) => (
          <div className={`mt-[20px] ${rooms.length - 1 === idx ? 'mb-[83px]' : ''}`} key={`room-${idx}`}>
            <RoomCard room={room} onClick={() => handleCardClick(room.id)} />
          </div>
        ))} */}
        {/* <div ref={target} /> */}
        <div className="mt-[83px] fixed bottom-[-15px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
          <div className="w-full">
            <div className="mb-[13px] space-x-[8px] max-w-max">
              <Nav />
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * 좋아요 있을 때 보여주는 Component (TODO : 구체화 해줘야함)
   */
  return (roomInfo || []).length === 0 ? <NoPostings /> : <LikedComponent />;
}

Liked.getLayout = function getLayout(page: React.ReactElement) {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <DefaultLayout
      type="title"
      title="Liked"
      handleButtonClick={handleGoBack}
      titleStyle="pt-[14.5px] font-pretendard font-medium text-[18px]"
      titleCenter
    >
      {page}
    </DefaultLayout>
  );
};
