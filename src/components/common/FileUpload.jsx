import React from "react";
import {Box} from '@mui/material'
import { Button, Modal, Progress } from "antd";

export default function FileUpload({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}) {
  return (
    <Box>
      <Modal
        title="Add a Profile Image"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
          disabled={!currentImage || !currentImage.name}
            key="submit"
            type="primary"
            onClick={uploadImage}>
            Upload Profile Picture
          </Button>,
        ]}
      >
        <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent:'center',
          alignItems:'center',
          height:'auto',
        }}
        >
          <p>{currentImage.name}</p>
          <label
          sx={{border:'1px solid black', p:'10px', cursor:'pointer',}}
          for="image-upload">
            Add an Image
          </label>
          {progress === 0 ? (
            <></>
          ) : (
            <Box padding="20px">
              <Progress type="circle" percent={progress} />
            </Box>
          )}
          <input hidden id="image-upload" type={"file"} onChange={getImage} />
        </Box>
      </Modal>
    </Box>
  );
}
