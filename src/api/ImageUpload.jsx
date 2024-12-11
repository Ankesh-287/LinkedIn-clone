import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { editProfile } from "./FireStoreAPI";

export const uploadImage = (
    file,
    id,
    setModalOpen,
    setProgress,
    setCurrentImage
) => {
    const profileImgRef = ref(storage, `profileImages/${file.name}`);
    const uploadTask = uploadBytesResumable(profileImgRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
        },
        (err) => {
            console.error(err);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((response) => {
                editProfile(id, {imageLink: response}).then(() => {
                    setModalOpen(false);
                    setCurrentImage({});
                    setProgress(0);
                });
               
            });
        }
    );
};
export const uploadPostImage = (file, setPostImage, setProgress) => {
    const postImgRef = ref (storage, `postImages/${file.name}`);
    const uploadTask = uploadBytesResumable(postImgRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            
            setProgress(progress);
        },
        (err) => {
            console.error(err);
        },
        () => {
        getDownloadURL(uploadTask.snapshot.ref).then((response) => {
            setPostImage(response);
        });
    }
    );
};