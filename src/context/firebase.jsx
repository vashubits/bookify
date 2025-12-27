import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { signOut } from "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  getDoc,
  doc,
  where,
  query,
  deleteDoc,  
  updateDoc    
} from "firebase/firestore";

const FirebaseContext = createContext(null);



const firebaseConfig = {
  apiKey: "AIzaSyDbbZRB5kkWZ_wdhPzfytbbl-jGdVorZ-o",
  authDomain: "bookify001-75b4a.firebaseapp.com",
  projectId: "bookify001-75b4a",
  storageBucket: "bookify001-75b4a.firebasestorage.app",
  messagingSenderId: "143633750398",
  appId: "1:143633750398:web:b274363dd7a8aa0afe3b2f"
};


const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
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

  const Viewmybooks = async () => {
    if (!user) return null;
    const ref = collection(firestore, "books");
    const q = query(ref, where("orderId", "==", user.uid));
    const result = await getDocs(q);
    return result;
  };

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const listallbooks = () => getDocs(collection(firestore, "books"));

  const myorders = (id) =>
    getDocs(collection(firestore, "books", id, "orders"));

  const deleteOrder = async (bookId, orderId) => {
    const orderRef = doc(firestore, "books", bookId, "orders", orderId);
    await deleteDoc(orderRef);
  };

  const updateOrderStatus = async (bookId, orderId, newStatus) => {
    const orderRef = doc(firestore, "books", bookId, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus });
  };
  const updateapproveStatus = async (bookId, orderId, newStatus) => {
    const orderRef = doc(firestore, "books", bookId, "orders", orderId);
    await updateDoc(orderRef, { isapprove: newStatus });
  };

  const logout = () => {
    const auth = getAuth();
    return signOut(auth);
  };

  const signinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

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
      orderId: user.uid,
      ownermail: user.email
    });

    return newDocRef;
  };

  const bookorder = async (name, email, Qty, bookId, phone, address,city,state,pincode) =>
    addDoc(collection(firestore, "books", bookId, "orders"), {
      name,
      email,
      phone,
      address,
      Qty,
      city,
      state,
      pincode,
      status: false,
      isapprove:false
    });

  const viewdatabyid = async (id) => {
    const viewref = doc(firestore, "books", id);
    const result = await getDoc(viewref);
    return result.exists() ? result.data() : null;
  };

  const signinwithgoogle = () =>
    signInWithPopup(firebaseAuth, googleProvider);

  const isLogin = !!user;

  return (
    <FirebaseContext.Provider
      value={{
        listallbooks,
        bookorder,
        viewdatabyid,
        logout,
        signupUserWithEmailAndPassword,
        handlecreatednewlisting,
        signinUserWithEmailAndPass,
        Viewmybooks,
        myorders,
        deleteOrder,       
        updateOrderStatus, 
        updateapproveStatus,
        signinwithgoogle,
        isLogin
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
