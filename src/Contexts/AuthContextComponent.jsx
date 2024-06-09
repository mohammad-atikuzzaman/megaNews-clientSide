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
import useAxuisPublic from "../Hooks/useAxuisPublic";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthContextComponent = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxuisPublic();

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
      if (currentUser) {
        axiosPublic
          .post("/jwt", logedUser, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.token) {
              // console.log(res.data.token);
              localStorage.setItem("userToken", res.data.token);
            }
          });
      } else {
        localStorage.removeItem("userToken");
      }
    });

    return () => unSubscribe();
  }, [axiosPublic, user]);

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
