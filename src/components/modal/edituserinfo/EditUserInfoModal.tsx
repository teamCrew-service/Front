import React from 'react';
import { ModalContainer, ModalHeader } from '../common/styled';

import icons from '../../../assets/icons';

function EditUserInfoModal({ closeModal }: { closeModal: () => void }): JSX.Element {
  return (
    <ModalContainer style={{ backgroundColor: 'white' }}>
      <ModalHeader>
        <icons.chevronLeft onClick={closeModal} />
      </ModalHeader>
    </ModalContainer>
  );
}

export default EditUserInfoModal;
