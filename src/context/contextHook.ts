import { useState } from 'react';

export interface ModalData {
  title: string;
  desc: string;
  type: 'ok' | 'warning' | 'error';
  id?: string;
}

export interface ModalModel extends ModalData {
  id: ModalData['id'];
}

export interface ContextState {
  loading: boolean[];
  modal: ModalModel[];
}

const generateStr = (length: number) => {
  let tmpStr = '';
  for (let i = 0; i < length; i++) {
    tmpStr += String.fromCharCode(33 + Number((Math.random() * 93).toFixed(0)));
  }
  return tmpStr;
};

export const useRootContext = () => {
  const [state, setState] = useState<ContextState>({
    loading: [],
    modal: []
  });

  const addModal = (modal: ModalData) => {
    setState((previousState) => {
      const tmpModal = { ...modal, id: modal.id ? modal.id : generateStr(6) };
      const modalArr = [...previousState.modal, tmpModal];
      return { ...previousState, modal: modalArr };
    });
  };

  const removeModal = (id: ModalData['id']) => {
    setState((previousState) => {
      const modalIndex = previousState.modal.findIndex(
        (modal) => modal.id === id
      );
      const modalArr = previousState.modal;
      if (typeof modalIndex === 'number' && modalIndex >= 0) {
        modalArr.splice(modalIndex, 1);
      }
      return { ...previousState, modal: modalArr };
    });
  };

  const pushLoading = () => {
    setState((previousState) => {
      const loadingArr = [...previousState.loading, true];
      return { ...previousState, loading: loadingArr };
    });
  };

  const popLoading = () => {
    setState((previousState) => {
      const loadingArr = previousState.loading;
      loadingArr.splice(0, 1);
      return { ...previousState, loading: loadingArr };
    });
  };

  return { state, addModal, removeModal, pushLoading, popLoading };
};
