import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import ProgressBar from '../../../components/common/ProgressBar';
import icons from '../../../assets/icons';
import BodySmallMedium from '../../../styledComponent/heading/BodySmallMedium';
import colors from '../../../assets/styles/color';
import defaultImage from '../../../assets/images/profile.jpg';
import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import GoPageBtn from '../components/GoPageBtn';

import useResizeImage from '../../../util/useResizeImage';
import { userNickName, userProfile } from '../../../atoms/login';

const StyledP = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.4px;
  color: ${colors.gray400};
  cursor: pointer;
`;

const ImageDiv = styled.div`
  width: 51%;
  aspect-ratio: 1;
  margin-top: 15.45%;
  border-radius: 50%;
`;

function Profile(): JSX.Element {
  const navigate = useNavigate();

  const [profile, setProfile] = useRecoilState(userProfile);
  const nickName = useRecoilValue(userNickName);

  const profileURL = useRef<string>(defaultImage);

  // file에서 부터 url 추출
  const readURL = (file: File): void => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result === null) return;
      if (typeof reader.result === 'string') {
        profileURL.current = reader.result;
      }
    };
    reader.readAsDataURL(file);
  };

  // 이미지 변환 시 작동하는 함수
  const changeProfile = (): void => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    fileInput.addEventListener('change', () => {
      if (fileInput.files === null) return;
      readURL(fileInput.files[0]);
      useResizeImage(fileInput.files[0]).then((res: Blob) => {
        console.log(res);
        setProfile({ url: profileURL.current, file: res });
      });
    });
    fileInput.click();
  };

  const goPrevFunc = (): void => {
    setProfile({ url: defaultImage, file: null });
    navigate('/login/gender');
  };

  const goNextFunc = (): void => {
    console.log('저장된 프로필 = ', profile);
    navigate('/login/introduction');
  };

  return (
    <>
      <header>
        <ProgressBar step={4} totalSteps={7} />
      </header>
      <main id="userinfo-main">
        <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: 'fit-content' }}>
          <icons.chevronLeft style={{ cursor: 'pointer' }} onClick={goPrevFunc} />
          {profile.file === null && <StyledP onClick={goNextFunc}>건너뛰기</StyledP>}
        </section>
        <section>
          <TitleLargeBold>{profile.file === null ? '프로필 사진' : '프로필 미리보기'}</TitleLargeBold>
          <BodySmallMedium style={{ color: `${colors.gray700}` }}>
            {profile.file === null
              ? '나만의 개성과 취향이 잘 드러나는 사진을 등록해주세요'
              : '다른 친구들이 내 프로필을 클릭했을 때 보게될 프로필입니다'}
          </BodySmallMedium>
        </section>
        <section
          style={{ display: 'flex', width: '100%', height: '27.09%', justifyContent: 'center', marginTop: '4.93%' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              aspectRatio: '1',
              backgroundColor: `${colors.primary100}`,
              borderRadius: '12px',
            }}
          >
            <ImageDiv onClick={changeProfile}>
              <img src={profile.url} alt="profile" width="100%" height="100%" style={{ borderRadius: '50%' }} />
            </ImageDiv>
            <div style={{ marginTop: '11.36%' }}>
              <TitleLargeBold>{nickName}</TitleLargeBold>
            </div>
          </div>
        </section>
        <GoPageBtn
          judge={profile.file !== null && profile.url !== defaultImage}
          path="/login/introduction"
          prevTitle="라이브러리에서 선택"
          prevColor=""
          prevFontColor=""
          prevAction={changeProfile}
          action={goNextFunc}
        />
      </main>
    </>
  );
}

export default Profile;
