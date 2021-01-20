import { useState } from 'react';

export interface ModalData {
  title: string;
  desc: string;
  type: 'ok' | 'warning' | 'error';
  id: string;
}

export interface ContextState {
  loading: boolean[];
  modal: ModalData[];
  addModal(modal: ModalData);
  removeModal(id: ModalData['id']);
  pushLoading();
  popLoading();
}

const useRootContext = () => {
  const addModal = (modal: ModalData) => {
    const modalArr = [...ctx.modal, modal];
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

export default useRootContext;
