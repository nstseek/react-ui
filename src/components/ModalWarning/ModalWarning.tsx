/* eslint-disable @typescript-eslint/ban-ts-comment */
import ReactUIContext from '../../context/mainContext';
import React, { useContext } from 'react';
import Backdrop from '../Backdrop/Backdrop';

interface Props {
  removeStyles?: boolean;
}

const ModalWarning: React.FC<Props> = (props) => {
  if (!props.removeStyles) {
    require('./ModalWarning.scss');
  }
  const ctx = useContext(ReactUIContext);
  const modal = ctx.modal[ctx.modal.length - 1];

  if (!modal) {
    return null;
  }

  let icon;
  switch (modal.type) {
    case 'error':
      icon = <i id='error' className='fas fa-times'></i>;
      break;
    case 'ok':
      icon = <i id='ok' className='fas fa-check'></i>;
      break;
    case 'warning':
    default:
      icon = <i id='warning' className='fas fa-exclamation-triangle'></i>;
  }

  const close = () => ctx.removeModal(modal.id);

  return (
    <Backdrop onBackdropClick={close}>
      <div className='ModalWarning'>
        {icon}
        <p id='title'>{modal.title}</p>
        <p id='content'>{modal.desc}</p>
        <button onClick={close}>OK</button>
      </div>
    </Backdrop>
  );
};

export default ModalWarning;
