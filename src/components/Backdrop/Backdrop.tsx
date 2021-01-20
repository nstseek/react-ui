import React, { useRef } from 'react';
import './Backdrop.scss';

interface Props {
  onBackdropClick?();
  zIndex?: number;
}

const Backdrop: React.FC<Props> = (props) => {
  const backdropRef = useRef<HTMLDivElement>();

  return (
    <div
      {...(props.zIndex ? { style: { zIndex: props.zIndex } } : {})}
      ref={backdropRef}
      onClick={(event) =>
        event.target === backdropRef.current && props.onBackdropClick
          ? props.onBackdropClick()
          : null
      }
      className='Backdrop'>
      {props.children}
    </div>
  );
};

export default Backdrop;
