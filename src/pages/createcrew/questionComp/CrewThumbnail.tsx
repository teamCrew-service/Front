import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useResizeImage from '../../../util/useResizeImage';

import { thumbnailFile, stepNum } from '../../../atoms/createcrew';

import AnswerBox from './common/AnswerBox';
import { QuestionBox } from '../styled';
import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import colors from '../../../assets/styles/color';
// import BodyLargeBold from '../../../styledComponent/heading/BodyLargeBold';

const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
`;

// const StyledBtn = styled.button`
//   width: 100%;
//   height: 56px;
//   border-radius: 4px;
//   border: none;
//   background-color: ${colors.primary};
//   color: white;
//   &:disabled {
//     background-color: ${colors.gray200};
//     color: ${colors.gray500};
//   }
// `;

function CrewThumbnail({ crewType }: { crewType: '장기' | '단기' }): JSX.Element {
  const [thumbnail, setThumbnail] = useRecoilState(thumbnailFile);
  const setStep = useSetRecoilState(stepNum);
  const thumb = useRef<HTMLInputElement | null>(null);
  // const saveValue = (input: any): void => {
  //   console.log('저장된 썸네일', input);
  //   setThumbnail(input);
  //   setStep(prev => prev + 1);
  // };

  useEffect(() => {
    const changeThumbnail = async (): Promise<void> => {
      if (thumb.current!.files === null) return;
      const file: Blob = await useResizeImage(thumb.current!.files[0]);
      console.log('저장될 썸네일', file);
      setThumbnail(file);
      setStep(prev => prev + 1);
    };
    if (thumb.current !== null) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      thumb.current.addEventListener('change', changeThumbnail);
    }
    return () => {
      if (thumb.current !== null) {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        thumb.current.removeEventListener('change', changeThumbnail);
      }
    };
  }, [thumbnail]);
  return (
    <section>
      <AnswerBox title={`${crewType === '장기' ? '09' : '10'} 썸네일`} value={thumbnail === null ? '' : 'registered'} />
      {thumbnail === null && (
        <QuestionBox>
          <TitleLargeBold>크루를 대표할 썸네일을 설정해주세요</TitleLargeBold>
          <StyledInput type="file" accept="image/*" ref={thumb} />
          {/* <StyledBtn
            onClick={() => {
              saveValue(thumbnail);
            }}
            disabled={thumbnail === null}
          >
            <BodyLargeBold>다음</BodyLargeBold>
          </StyledBtn> */}
        </QuestionBox>
      )}
    </section>
  );
}

export default CrewThumbnail;
