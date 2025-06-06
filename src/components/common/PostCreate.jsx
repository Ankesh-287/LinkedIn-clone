import React, { useState } from 'react';
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import { postStatus } from '../../api/FireStoreAPI';
import { uploadPostImage } from '../../api/ImageUpload';

import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostCreate = ({ currentUser }) => {
  const [text, setText] = useState(''); 
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false); 
  const [progress, setProgress] = useState(0); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      uploadImageToFirebase(file);
    }
  };

  const uploadImageToFirebase = (file) => {
    setUploading(true);
    const postImgRef = ref(storage, `postImages/${file.name}`);
    const uploadTask = uploadBytesResumable(postImgRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error('Image upload failed:', error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
          setUploading(false);
        });
      }
    );
  };

  // Post creation function
  const createPost = async () => {
    const postObject = {
      text, // Text content of the post
      imageUrl, // URL of the uploaded image
      userId: currentUser?.id, // User ID from currentUser object
      userName: currentUser?.name, // User name from currentUser object
      timestamp: new Date().toLocaleString(), // Current timestamp
    };

    // Save post to Firestore
    await postStatus(postObject);
    setText('');
    setImage(null);
    setImageUrl('');
  };

  return (
    <Box sx={{ p: 2, width: '500px', margin: 'auto' }}>
      <ReactQuill
        value={text}
        onChange={setText}
        placeholder="What's on your mind?"
        style={{ marginBottom: '20px' }}
      />

      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '100%', marginBottom: '20px' }} />}

      {uploading && <CircularProgress variant="determinate" value={progress} />}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'block', marginBottom: '20px' }}
      />

      {/* Post button */}
      <Button
        variant="contained"
        color="primary"
        onClick={createPost}
        disabled={!text || uploading} 
      >
        Post
      </Button>
    </Box>
  );
};

export default PostCreate;
