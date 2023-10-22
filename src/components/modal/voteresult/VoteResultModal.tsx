import React from 'react';
import { useQuery } from 'react-query';

import heading from '../../../styledComponent/heading';
import icons from '../../../assets/icons';

import './style.css';
import { ModalContainer } from '../common/styled';

import { vote } from '../../../api';

import OptionBox from './OptionBox';

function VoteResultModal({
  crewId,
  voteFormId,
  closeModal,
  captainId,
}: {
  crewId: string;
  voteFormId: string;
  captainId: number;
  closeModal: () => void;
}): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    data: voteResult,
    isLoading,
    isError,
  } = useQuery(
    'getVoteResult',
    async () => {
      const result = await vote.getVoteResult(crewId, voteFormId);
      console.log('투표 결과 = ', result);
      const option1List = result.vote.filter(item => item.vote === result.voteForm.voteFormOption1);
      const option2List = result.vote.filter(item => item.vote === result.voteForm.voteFormOption2);
      const option3List = result.vote.filter(item => item.vote === result.voteForm.voteFormOption3);
      const option4List = result.vote.filter(item => item.vote === result.voteForm.voteFormOption4);
      const option5List = result.vote.filter(item => item.vote === result.voteForm.voteFormOption5);
      return {
        option1List,
        option2List,
        option3List,
        option4List,
        option5List,
        option1: result.voteForm.voteFormOption1,
        option2: result.voteForm.voteFormOption2,
        option3: result.voteForm.voteFormOption3,
        option4: result.voteForm.voteFormOption4,
        option5: result.voteForm.voteFormOption5,
      };
    },
    {
      onSuccess: res => {
        console.log('투표 재정렬 후 결과 = ', res);
      },
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Somthing Wrong</div>;
  }

  return (
    <ModalContainer style={{ backgroundColor: 'white' }}>
      <header id="vote-result-header">
        <icons.chevronLeft onClick={closeModal} />
        <heading.BodyLargeBold>투표한 멤버</heading.BodyLargeBold>
        <icons.ThreeDots fill="black" />
      </header>
      <main id="vote-result-main">
        {['option1', 'option2', 'option3', 'option4', 'option5'].map(item => (
          <OptionBox key={item} voteResult={voteResult!} option={item} captainId={captainId} />
        ))}
      </main>
    </ModalContainer>
  );
}

export default VoteResultModal;
