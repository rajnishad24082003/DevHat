import { auth, database } from "../misc/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const authunsubscribfun = onAuthStateChanged(auth, (authobj) => {
      if (authobj) {
        const starCountRef = ref(database, `/profile/${authobj.uid}`);
        onValue(starCountRef, (snapshot) => {
          const name = snapshot.val().name ? snapshot.val().name : "no name";
          const createdAt = snapshot.val().createdAt
            ? snapshot.val().createdAt
            : "no date";
          const data = {
            name,
            createdAt,
            email: authobj.email,
            uid: authobj.uid,
          };
          setProfile(data);
          setIsLoading(false);
        });
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      authunsubscribfun();
    };
  }, []);
  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
