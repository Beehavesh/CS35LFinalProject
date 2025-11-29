import React from 'react';
import { Modal, Button } from 'antd';
import './index.scss';

const ModalComponent = ({ modalOpen, setModalOpen, setStatus, status, sendStatus }) => {
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
            <button
                onClick={sendStatus}
                key="submit"
                type="primary"
                disabled={status.length === 0}
            >
                Post
            </button>
        ]}
      >
      <input 
        type="text" 
        placeholder="What's on your mind?" 
        className="post-input" 
        onChange={(event) => setStatus(event.target.value)} 
        value={status}
        />
      </Modal>
    </>
  );
};
export default ModalComponent;