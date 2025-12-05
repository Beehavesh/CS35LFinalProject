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
  disableSubmit = false, 
}) => {
  const footer = onSubmit 
  ? [
      <button
          key="submit"
          onClick={onSubmit}
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
        classNames={{
          body: 'modalStyle',
        }}
        styles={{
        title: { color: 'white', fontFamily: 'Gudea', fontSize: 30},
        content: { fontFamily: 'serif', backgroundColor: '#0E0E0E', padding: 24 },
        container: { backgroundColor: '#0E0E0E', borderRadius: 30, borderColor: 'purple'},
        header: { color: 'white', colorIcon: 'white' },
        body: { color: 'white', fontSize: 16 },
        footer: { display: 'flex', justifyContent: 'center' },
        
  }}
      >
        {children}
      </Modal>
    </>
    
  );
};
export default ModalComponent;