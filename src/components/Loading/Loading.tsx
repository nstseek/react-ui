import { ReactUIContext } from '../../context';
import React, { useContext } from 'react';
import Backdrop from '../Backdrop/Backdrop';

interface Props {
  removeStyles?: boolean;
}

const Loading: React.FC<Props> = (props) => {
  const ctx = useContext(ReactUIContext);

  if (!props.removeStyles) {
    require('./Loading.scss');
  }

  return ctx.state.loading.length > 0 ? (
    <Backdrop>
      <i id='loading' className='fas fa-spinner'></i>
    </Backdrop>
  ) : null;
};

export default Loading;
