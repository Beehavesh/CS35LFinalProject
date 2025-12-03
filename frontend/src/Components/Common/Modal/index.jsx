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
  disableSubmit = false, }) => {
  return (
    <>
      <Modal
        title={title}
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
            <button
                key="submit"
                onClick={onSubmit}
                disabled={disableSubmit} 
            >
                {submitLabel}
            </button>
        ]}
      >
        {children}
      </Modal>
    </>
  );
};
export default ModalComponent;