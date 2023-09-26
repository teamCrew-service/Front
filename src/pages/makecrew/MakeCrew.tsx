import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { meet } from '../../api';

import './makeCrewStyle.scss';
import ProgressBar from '../../components/common/ProgressBar';
import CrewType from './crewType/CrewType';

function MakeCrew(): JSX.Element {
  // const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    createCrewDto: {
      category: '',
      crewAddress: '',
      crewType: '',
      crewDDay: '',
      crewMemberInfo: '',
      crewTimeInfo: '',
      crewAgeInfo: '',
      crewSignup: false,
      crewTitle: '',
      crewContent: '',
      thumbnail: '',
      crewMaxMember: 0,
      crewLatitude: 0,
      crewLongtitude: 0,
    },
    createSignupFormDto: {
      question1: '',
      question2: '',
    },
  });

  const mutation = useMutation(meet.makeCrew, {
    // This function is called on successful mutation
    onSuccess: data => {
      // Invalidate and refetch a query after a successful mutation
      // queryClient.invalidateQueries('yourQueryKey');
      // Optionally, reset the form data or perform other actions
      console.log(data);
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setFn = (): void => {
    setFormData({
      createCrewDto: {
        category: '운동',
        crewAddress: '홍대입구역 1번 출구',
        crewType: '번개',
        crewDDay: '2023-08-19T03:44:19.661Z',
        crewMemberInfo: '털털한 분',
        crewTimeInfo: '2시간',
        crewAgeInfo: '20대 초반 ~ 30대 후반',
        crewSignup: false,
        crewTitle: '오늘은 꼭 뛰어야 한다!!',
        crewContent: '오늘 꼭 뛰고 싶은 사람들 모이세요',
        thumbnail: 'https://www.sportsw.kr/news/data/20230627/p1065588600851429_657_thum.jpg',
        crewMaxMember: 8,
        crewLatitude: 23.010203,
        crewLongtitude: 106.102032,
      },
      createSignupFormDto: {
        question1: '자기소개 또는 가입 동기',
        question2: '나를 표현하는 형용사 3가지는?',
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUpdate = (): void => {
    // Call the mutation function with the data you want to update
    mutation.mutate(formData);
  };

  return (
    <div className="createWrap">
      <ProgressBar step={2} totalSteps={10} type="thinType" />

      <div className="stepWrap">
        <CrewType setFormData={setFormData} />
        <div className="step">
          <button type="button" className="btnCondition">
            02 관심사
          </button>
          <div className="stepCont">
            <h2>관심사를 선택해주세요</h2>
            <div className="GridDiv">
              <div className="SmallCardDiv">친목</div>
              <div className="SmallCardDiv">음료</div>
              <div className="SmallCardDiv">친목</div>
              <div className="SmallCardDiv">친목</div>
              <div className="SmallCardDiv">친목</div>
              <div className="SmallCardDiv">친목</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeCrew;
