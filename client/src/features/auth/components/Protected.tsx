import { Navigate } from "react-router-dom";
import { ChildrenProps } from "../../models/Modal";
import { useSelectorAuthState } from "../authSlice";

const Protected = ({ children }: ChildrenProps) => {
  const { loggedInUser } = useSelectorAuthState();

  if (!loggedInUser) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  return children;
};

export default Protected;
