import React from 'react';
import { CrewCardLink, TagDiv, ImageBox } from '../../pages/findcrew/styled';
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
        <p style={{ fontSize: '14px', fontWeight: 700, lineHeight: '24px', letterSpacing: '-0.4px' }}>
          {spot.crew_crewTitle}
        </p>
        {/* <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.subTitle}</p> */}
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
            <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>
              {spot.crew_crewDDay === null ? '아직 일정이 없습니다' : useCalDate(new Date(spot.crew_crewDDay))}
            </p>
          </div>
        )}
        <div style={{ display: 'flex', gap: '2px' }}>
          <icons.Location />
          <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>{spot.crew_crewAddress} 근처</p>
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
