import { Navigate } from "react-router-dom";
import { ChildrenProps } from "../../../models/Modal";
import { useSelectorAuthState } from "../authSlice";

const ProtectedAdmin = ({ children }: ChildrenProps) => {
  const { loggedInUser } = useSelectorAuthState();

  if (!loggedInUser) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (loggedInUser && loggedInUser.role !== "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  return children;
};

export default ProtectedAdmin;
