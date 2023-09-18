import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonDiv from '../../../styledComponent/ButtonDiv';
import BodyLargeBold from '../../../styledComponent/heading/BodyLargeBold';
import colors from '../../../assets/styles/color';

function GoPageBtn({
  judge,
  path,
  prevTitle,
  prevColor = `${colors.gray200}`,
  prevFontColor = `${colors.gray400}`,
  prevAction = () => {},
  action = () => {},
}: {
  judge: boolean;
  path: string;
  prevTitle: string;
  prevColor?: string;
  prevFontColor?: string;
  prevAction?: () => void;
  action?: () => void;
}): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  const onClick = (): void => {
    navigate(path);
    action();
  };
  return (
    <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
      {judge ? (
        <ButtonDiv onClick={onClick}>
          <BodyLargeBold>다음</BodyLargeBold>
        </ButtonDiv>
      ) : (
        <ButtonDiv onClick={prevAction} style={{ backgroundColor: prevColor, color: prevFontColor }}>
          <BodyLargeBold>{prevTitle}</BodyLargeBold>
        </ButtonDiv>
      )}
    </section>
  );
}

export default GoPageBtn;
