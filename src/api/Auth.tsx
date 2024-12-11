import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from 'firebase/auth'
import { auth } from '../firebaseConfig'

export const SignInApi = (email: string, password: string) => {
    try {
        const response = signInWithEmailAndPassword(auth, email, password);
        return response;
    } catch (error) {
        alert(error);
    }
}

export const SignUpApi = async ( email: string, password: string) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return response;
    } catch (err) {
        alert(err);
    }
}

export const GoogleSignInApi = async () => {
    try {
        let googleProvider = new GoogleAuthProvider();
        let res = await signInWithPopup(auth, googleProvider)
        return res;
    } catch (err) {
        return (err);
    }
}

export const onLogout = () => {
    try {
        signOut(auth);
    } catch (err) {
        return err;
    }
}