import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { ref, set, get, child } from 'firebase/database';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const dbRef = ref(db);
        const userSnapshot = await get(child(dbRef, `users/${user.uid}`));
        if (userSnapshot.exists()) {
          setCurrentUser({ uid: user.uid, ...userSnapshot.val() });
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, additionalData) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = ref(db, 'users/' + user.uid);
    await set(userRef, {
      email: user.email,
      ...additionalData,
      userType: 'student'
    });

    return userCredential;
  };

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const adminLogin = (email, password) => {
    if (email === 'admin@campuslearn.com' && password === 'admin123') {
      const adminUser = {
        name: 'Admin',
        email: email,
        userType: 'admin'
      };
      setCurrentUser(adminUser);
      return adminUser;
    }
    throw new Error('Invalid admin credentials');
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    signup,
    login,
    adminLogin,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};