import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  getDoc,
  doc,
  where,
  query
} from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCGr4Qg1oKC-qXDn3v-fKx0zTx0Vqr56tM",
  authDomain: "bookify-7006a.firebaseapp.com",
  projectId: "bookify-7006a",
  storageBucket: "bookify-7006a.appspot.com",
  messagingSenderId: "868276582953",
  appId: "1:868276582953:web:674cc30ba9f4d6cce13a38"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setuser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setuser(user);
      else setuser(null);
    });
  }, []);

const Viewmybooks =async ()=>{
  if(!user)return null;
  const ref = collection(firestore,"books");
  const q = query(ref,where("orderId","==",user.uid));
  const result = await getDocs(q);
  return result;
}

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const listallbooks = () => {
    return getDocs(collection(firestore, "books"));
  };
  const myorders = (id) => {
   
   return   getDocs(collection(firestore,"books",id,"orders"));
  };

  const signinUserWithEmailAndPass = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const handlecreatednewlisting = async (name, isbn, price, imageurl, Owner) => {
    const newDocRef = doc(collection(firestore, "books"));
    const userID = newDocRef.id;
    
    
    await setDoc(newDocRef, {
      name,
      isbn,
      price,
      imageurl,
      Owner,
      userID,
      orderId:user.uid,
      ownermail: user.email

    });
    

    return newDocRef;
  };

  const bookorder = async (name, email, Qty, bookId) => {
    return await addDoc(collection(firestore, "books", bookId, "orders"), {
      name,
      email,
      Qty
    });
  };

  const viewdatabyid = async (id) => {
    const viewref = doc(firestore, "books", id);
    const result = await getDoc(viewref);
    return result.exists() ? result.data() : null;
  };

  const signinwithgoogle = () => signInWithPopup(firebaseAuth, googleProvider);



  const isLogin = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        listallbooks,
        bookorder,
        viewdatabyid,
        signupUserWithEmailAndPassword,
        handlecreatednewlisting,
        signinUserWithEmailAndPass,
        Viewmybooks,
        myorders,
        signinwithgoogle,
        isLogin
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
