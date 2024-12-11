import { fireStore } from "../firebaseConfig"
import {
    addDoc,
    collection,
    onSnapshot,
    doc,
    updateDoc,
    where,
    query,
    setDoc,
    deleteDoc,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore'
import { toast } from "react-toastify";

let postRef = collection(fireStore, 'posts');
let userRef = collection(fireStore, 'users');
let likeRef = collection(fireStore, 'likes');
let commentsRef = collection(fireStore, 'comments');
let connectionRef = collection(fireStore, 'connections');

export const postStatus = async (object) => {
    try {
        await addDoc(postRef, { ...object, timeStamp: serverTimestamp() });
        toast.success("Post added successfully");

    } catch (err) {
        toast.error("Failed to add Post");
        console.log(err);
    }
};


export const getStatus = (setAllStatus) => {
    const q = query(postRef, orderBy('timeStamp', 'desc'));
    onSnapshot(q, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            }))
    })
}

export const getAllUsers = (setAllUsers) => {
    onSnapshot(userRef, (response) => {
        setAllUsers(
            response.docs?.map((docs) => {
                return { ...docs.data(), id: docs.id };
            }) || []
        );
    });
};

export const getSingleStatus = (setAllStatus, id) => {
    const singlePostQuery = query(postRef, where("userID", "==", id));
    onSnapshot(singlePostQuery, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        );
    });
};

export const getSingleUser = (setCurrentUser, email) => {
    const singleUserQuery = query(userRef, where("email", "==", email));
    onSnapshot(singleUserQuery, (response) => {
        const user = response.docs?.[0]?.data();
        setCurrentUser(user ? { ...user, id: response.docs[0].id } : null);
    });
};

export const postUserData = async (object) => {
    try {
        await addDoc(userRef, object);
        toast.success("User data added successfully");
    } catch (err) {
        toast.error("Failed to add user data");
        console.log(err);
    }
};
export const getCurrentUser = (setCurrentUser) => {
    onSnapshot(userRef, (response) => {
        setCurrentUser(
            response.docs
                .map((docs) => {
                    return { ...docs.data(), id: docs.id };
                }).filter((item) => {
                    return item.email === localStorage.getItem('userEmail');
                })[0]
        );
    })
}

export const editProfile = (userId, payload) => {
    let userToEdit = doc(userRef, userId)

    updateDoc(userToEdit, payload).then(() => {
        toast.success("Profile updated successfully");
    })
        .catch((err) => {
            console.log(err);
        })
};

export const likePost = async (userId, postId, liked) => {
    try {
        let docToLike = doc(likeRef, `${userId}_${postId}`);
        if (liked) {
            await deleteDoc(docToLike);
            toast.success("Like removed");
        } else {
            await setDoc(docToLike, { userId, postId });
            toast.success("Post liked");
        }
    } catch (err) {
        toast.error("Failed to update like");
        console.log(err);
    }
};

// export const commentPost = async (userId, postId, comment) => {
//     try{
//         let docToComment = doc(commentRef, `${postId}_${userId}`);
//         if(comment) {
//             await deleteDoc(docToComment);
//             toast.success("Comment removed");
//         }else {
//             await setDoc(docToComment, { userId, postId });
//             toast.success("Post Comment");
//         }
//     } catch (err) {
//         toast.error("Failed to comment");
//         console.log(err);
//     }
// }


export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
    try {
        let likeQuery = query(likeRef, where("postId", "==", postId));
        onSnapshot(likeQuery, (response) => {
            let likes = response.docs.map((doc) => doc.data());
            let likesCount = likes?.length || 0;

            const isLiked = likes?.some((like) => like.userId === userId);

            setLikesCount(likesCount);
            setLiked(isLiked);
        });
    } catch (err) {
        console.log(err);
    }
};

const getCommentsByUser = (userId, postId, setComments, setCommentsCount) => {
    try {
        let commentQuery = query(commentsRef, where("postId", "==", postId));
        onSnapshot(commentQuery, (response) => {
            let comments = response.docs.map((doc) => doc.data());
            let commentsCount = comments?.length || 0;

            const isComment = comments?.some((comment) => comment.userId === userId);
            setCommentsCount(commentsCount)
            setComments(comments);
        });
    } catch (err) {
        console.log(err);
    }
}



export const postComment = async (postId, comment, name, imageLink) => {
    try {
        await addDoc(commentsRef, {
            postId,
            imageLink,
            name,
            comment,
            timeStamp: serverTimestamp(),
        });
        toast.success("Comment posted");
    } catch (err) {
        toast.error("Failed to post comment");
        console.log(err);
    }
};



export const getComments = (postId, setComments) => {
    try {
        let singlePostQuery = query(commentsRef, where("postId", "==", postId));

        onSnapshot(singlePostQuery, (response) => {
            const comments = response.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });

            setComments(comments);
        });
    } catch (err) {
        console.log(err);
    }
};

export const updatePost = async (id, status, postImage) => {
    let docToUpdate = doc(postRef, id);
    try {
        await updateDoc(docToUpdate, { status, postImage });
        toast.success("Post has been updated");
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = async (id) => {
    let docToDelete = doc(postRef, id);
    try {
        await deleteDoc(docToDelete);
        toast.success("Post has been deleted");
    } catch (err) {
        console.log(err)
    }
};

export const addConnection = (userId, targetId) => {
    try {
        let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);

        setDoc(connectionToAdd, { userId, targetId });
        toast.success("Connection Added!");
    } catch (err) {
        console.log(err)
    }
};


export const getConnections = (userId, targetId, setIsConnected) => {
    try {
        let connectionQuery = query(
            connectionRef,
            where("targetId", "==", targetId)
        );

        onSnapshot(connectionQuery, (response) => {
            let connections = response.docs.map((doc) => doc.data());
            const isConnected = connections.some(
                (connection) => connection.userId === userId
            );
            setIsConnected(isConnected);
        });
    } catch (err) {
        toast.error("Failed to check connection");
        console.log(err);
    }
};
