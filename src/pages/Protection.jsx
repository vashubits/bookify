import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const Protection = ({ children }) => {
  const firebase = useFirebase();

  if (!firebase.isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protection;
