import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase.init";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthContextComponent = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerWithEmailPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logInWithEmailPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const email = currentUser?.email || user?.email;
      const logedUser = { email };
      setLoading(false);
      // if (currentUser) {
      //   axios
      //     .post("https://vibepalace.vercel.app/jwt", logedUser, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       if (res.data.success) {
      //         // console.log("jwt res :", res);
      //       }
      //     })
      //     .catch((err) => console.log(err));
      // } else {
      //   axios
      //     .post("https://vibepalace.vercel.app/logout", logedUser, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       // console.log(res.data);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }
    });

    return () => unSubscribe();
  }, [user]);

  const context = {
    user,
    loading,
    setLoading,
    registerWithEmailPass,
    logInWithEmailPass,
    logInWithGoogle,
    logOut,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextComponent;
