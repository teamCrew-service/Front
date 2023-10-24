import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import heading from '../../styledComponent/heading';
import colors from '../../assets/styles/color';
import { crew } from '../../api';

import useResizeImage from '../../util/useResizeImage';

const NavContainer = styled.div`
  position: absolute;
  bottom: -96px;
  right: 0;
  width: 119px;
  height: 96px;
  background-color: ${colors.gray50};
  border-radius: 8px;
  z-index: 2;
  overflow: hidden;
`;

const NavItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 8px;
  border-bottom: 1px solid ${colors.gray200};
  color: ${colors.gray700};
`;

function ThreeDotModal({
  crewId,
  controlExtra,
  refetch,
}: {
  crewId: string;
  controlExtra: () => void;
  refetch: any;
}): JSX.Element {
  const navigate = useNavigate();

  const deleteCrew = (): void => {
    crew
      .deleteCrew(crewId)
      .then(res => {
        console.log(res);
        navigate('/home');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const changeThumbnail = (): void => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    fileInput.addEventListener('change', () => {
      if (fileInput.files === null) return;
      useResizeImage(fileInput.files[0]).then((res: Blob) => {
        console.log(res);
        crew
          .editCrewThumbnail(res, crewId)
          .then(() => {
            refetch();
            controlExtra();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    fileInput.click();
  };
  return (
    <NavContainer>
      <NavItem>
        <heading.BodySmallBold onClick={deleteCrew}>모임 삭제</heading.BodySmallBold>
      </NavItem>
      <NavItem>
        <heading.BodySmallBold onClick={changeThumbnail}>썸네일 수정하기</heading.BodySmallBold>
      </NavItem>
      <NavItem onClick={controlExtra}>
        <heading.BodySmallBold style={{ color: `${colors.errorRed}` }}>취소</heading.BodySmallBold>
      </NavItem>
    </NavContainer>
  );
}

export default ThreeDotModal;
