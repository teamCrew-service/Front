import React from 'react';
import { CrewCardLink, TagDiv, ImageBox } from '../../pages/findcrew/styled';
import heading from '../../styledComponent/heading';
import icons from '../../assets/icons';
import colors from '../../assets/styles/color';
import useCalDate from '../../util/useCalDate';

function CrewCard({ spot }: { spot: any }): JSX.Element {
  return (
    <CrewCardLink to={`/detail/${spot.crew_crewId}`} key={spot.crew_crewId}>
      <div style={{ display: 'flex', gap: '4px' }}>
        <TagDiv $color="rgb(255, 234, 125, 0.5)">
          <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.crew_category}</p>
        </TagDiv>
        <TagDiv $color={spot.crew_crewType === '장기' ? colors.primary100 : colors.point100}>
          <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.crew_crewType}</p>
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
          <ImageBox image={spot.crew_thumbnail} />
        ) : (
          <ImageBox image="">no image</ImageBox>
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
          <heading.BodySmallMedium>{spot.crew_crewAddress} 근처</heading.BodySmallMedium>
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
      <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 102 }}>
        <icons.heart style={{ cursor: 'pointer' }} />
      </div>
    </CrewCardLink>
  );
}

export default CrewCard;
