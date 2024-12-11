import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Image } from '@mui/icons-material';
import { Button, Modal, Progress } from 'antd';
import ReactQuill from 'react-quill';

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  sendStatus,
  setStatus,
  status,
  isEdit,
  updateStatus,
  uploadPostImage,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost,
}) => {
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [editorContent, setEditorContent] = useState('');

  if (!modalOpen) return null;

  const handleClose = () => {
    setModalOpen(false);
    setStatus('');
    setPostImage(null);
    setImageUrl('');
    setEditorContent('');
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = (file) => {
    setTimeout(() => {
      setImageUrl(URL.createObjectURL(file));
      setProgress(100);
    }, 2000);
  };

  const handlePost = () => {
    sendStatus({ text: editorContent, imageUrl });
    handleClose();  
  };

  return (
    <>
      <Modal
        title="Create Post"
        centered
        open={modalOpen}
        onOk={handlePost}
        onCancel={handleClose}
        footer={[
          <Button
            onClick={isEdit ? updateStatus : handlePost}
            key="submit"
            type="primary"
            disabled={!status.length && !postImage ? true : false}
          >
            {isEdit ? 'Update' : 'Post'}
          </Button>
        ]}
      >
        <Box>
          <ReactQuill
            value={status}
            theme="snow"
            onChange={setStatus}
            placeholder="What's on your mind?"
            style={{ marginTop: '20px' }}
          />
          {progress === 0 || progress === 100 ? (
            <></>
          ) : (
            <Box>
              <Progress type="circle" percent={progress} />
            </Box>
          )}

          {(postImage || currentPost?.postImage) && (
            <img
              src={postImage || currentPost?.postImage}
              alt="Post"
              style={{ width: '100%', marginTop: '20px' }}
            />
          )}

          <label htmlFor="fileInput">
            <Image sx={{ color: '#0073b1', cursor: 'pointer', marginTop: '20px' }} />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={(event) =>
              uploadPostImage(event.target.files[0], setPostImage, setProgress)
            }
            accept="image/*"
          />
        </Box>
      </Modal>
    </>
  );
};

export default ModalComponent;
