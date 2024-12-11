import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'
import { getCurrentUser } from '../api/FireStoreAPI';
import NetWorkComponent from '../components/NetworkComponent';
import Loader from '../components/common/Loader';

export default function Network() {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    let navigate = useNavigate();


    useEffect(() => {
        getCurrentUser(setCurrentUser)
        onAuthStateChanged(auth, (res) => {
            if (!res?.accessToken) {
                navigate("/");
            } else {
                setLoading(false);
            }
        })
    }, []);
    return loading ? (
        <Loader />
    ) : (<NetWorkComponent currentUser={currentUser} />
    );
};

