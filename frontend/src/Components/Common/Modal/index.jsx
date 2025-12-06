import React from 'react';
import { Modal } from 'antd';
import './index.scss';

const ModalComponent = ({ 
  modalOpen, 
  setModalOpen, 
  title, 
  children, 
  onSubmit,
  submitLabel = "Submit",
  disableSubmit = false,  }) => {
  const footer = onSubmit 
  ? [
      <button
          data-testid="modal-submit-button"
          key="submit"
          onClick={async () => {
            const ok = await onSubmit();

            if (ok) {
              setModalOpen(false);
            }
          }}
          disabled={disableSubmit} 
      >
          {submitLabel}
      </button>
  ] : null ;
  return (
    <>
      <Modal
        title={title}
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={footer}
      >
        {children}
      </Modal>
    </>
  );
};
export default ModalComponent;