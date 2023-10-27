import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CrewCardDiv, TagDiv, ImageBox } from '../../pages/findcrew/styled';
import heading from '../../styledComponent/heading';
import icons from '../../assets/icons';
import colors from '../../assets/styles/color';
import useCalDate from '../../util/useCalDate';
import { like } from '../../api';

function CrewCard({ spot, page, refetch = () => {} }: { spot: any; page: string; refetch?: any }): JSX.Element {
  const navigate = useNavigate();

  const showHeart = !!(page === 'findcrew' || page === 'searchbycategory' || page === 'mypage');
  const isLikeCrew = spot.likeCheck;

  const checkLike = (event: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    event.stopPropagation();
    if (page === 'mypage') {
      like
        .postLike(spot.crew_crewId)
        .then(res => {
          console.log('좋아요 성공 유무 = ', res);
          refetch();
        })
        .catch(err => {
          console.log('좋아요 실패! ', err);
        });
    }
  };

  const unCheckLike = (event: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    event.stopPropagation();
    if (page === 'mypage') {
      like
        .deleteLike(spot.crew_crewId)
        .then(res => {
          console.log('좋아요 성공 유무 = ', res);
          refetch();
        })
        .catch(err => {
          console.log('좋아요 실패! ', err);
        });
    }
  };

  return (
    <CrewCardDiv
      onClick={() => {
        navigate(`/detail/${spot.crew_crewId}`);
      }}
      key={spot.crew_crewId}
    >
      <div style={{ display: 'flex', gap: '4px' }}>
        <TagDiv $color={colors.yellow}>
          <heading.BodySmallMedium>{spot.crew_category}</heading.BodySmallMedium>
        </TagDiv>
        <TagDiv $color={spot.crew_crewType === '장기' ? colors.primary100 : colors.point100}>
          <heading.BodySmallMedium>{spot.crew_crewType}</heading.BodySmallMedium>
        </TagDiv>
      </div>
      <div>
        <heading.BodyBaseBold>{spot.crew_crewTitle}</heading.BodyBaseBold>
        <heading.BodySmallMedium style={{ color: `${colors.gray500}` }}>
          {spot.crew_crewContent}
        </heading.BodySmallMedium>
      </div>
      <div>
        {spot.crew_thumbnail !== undefined ? (
          <ImageBox $image={spot.crew_thumbnail} />
        ) : (
          // 없을 때 이미지 필요
          <ImageBox $image="">no image</ImageBox>
        )}
      </div>
      <div>
        {spot.crew_crewDDay !== undefined && (
          <div style={{ display: 'flex', gap: '2px' }}>
            <icons.Calendar />
            <heading.BodySmallMedium>
              {spot.crew_crewDDay === null ? '아직 일정이 없습니다' : useCalDate(new Date(spot.crew_crewDDay))}
            </heading.BodySmallMedium>
          </div>
        )}
        <div style={{ display: 'flex', gap: '2px' }}>
          <icons.Location />
          <heading.BodySmallMedium>{spot.crew_crewAddress}</heading.BodySmallMedium>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '4px',
          textAlign: 'center',
          backgroundColor: 'white',
          padding: '4px 10px',
          borderRadius: '200px',
          marginLeft: 'auto',
        }}
      >
        <icons.users />
        <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>
          {spot.crewAttendedMember}/{spot.crew_crewMaxMember}
        </p>
      </div>
      {showHeart && (
        <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 102 }}>
          {isLikeCrew === '1' && <icons.ActiveHeart onClick={unCheckLike} />}
          {isLikeCrew === '0' && <icons.heart fill="black" onClick={checkLike} />}
          {page === 'mypage' && <icons.ActiveHeart onClick={unCheckLike} />}
        </div>
      )}
    </CrewCardDiv>
  );
}

export default CrewCard;
