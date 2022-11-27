import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged(getAuth(), (userData) => {
    //   setUser(userData);
    //   setIsLoading(false);
    //   console.log(userData);
    // });

    const unsubscribe = onAuthStateChanged(getAuth(), (userData) => {
      setUser(userData);
      setIsLoading(false);
    });

    // unsubscribe();
    return unsubscribe;
  }, []);

  return { user, isLoading };
};

export default useUser;
