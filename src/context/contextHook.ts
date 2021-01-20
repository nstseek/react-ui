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
  addModal(modal: ModalData);
  removeModal(id: ModalData['id']);
  pushLoading();
  popLoading();
}

const generateStr = (length: number) => {
  let tmpStr = '';
  for (let i = 0; i < length; i++) {
    tmpStr += String.fromCharCode(33 + Number((Math.random() * 93).toFixed(0)));
  }
  return tmpStr;
};

export const useRootContext = () => {
  const addModal = (modal: ModalData) => {
    const tmpModal = { ...modal, id: modal.id ? modal.id : generateStr(9) };
    const modalArr = [...ctx.modal, tmpModal];
    setCtx({ ...ctx, modal: modalArr });
  };

  const removeModal = (id: ModalData['id']) => {
    const modalArr = ctx.modal.filter((modal) => modal.id !== id);
    setCtx({ ...ctx, modal: modalArr });
  };

  const pushLoading = () => {
    const loadingArr = [...ctx.loading, true];
    setCtx({ ...ctx, loading: loadingArr });
  };

  const popLoading = () => {
    const loadingArr = ctx.loading;
    loadingArr.splice(0, 1);
    setCtx({ ...ctx, loading: loadingArr });
  };

  const [ctx, setCtx] = useState<ContextState>({
    loading: [],
    modal: [],
    addModal,
    removeModal,
    pushLoading,
    popLoading
  });

  return ctx;
};
