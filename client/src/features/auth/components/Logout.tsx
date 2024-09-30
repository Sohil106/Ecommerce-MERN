import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useEffect } from "react";
import { signOutAsync, useSelectorAuthState } from "../authSlice";
import { Navigate } from "react-router-dom";
import { AllRoutes } from "../../../constants/constants";

const Logout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loggedInUser } = useSelectorAuthState();
  useEffect(() => {
    if (loggedInUser) {
      dispatch(signOutAsync(loggedInUser?.id));
    }
  }, [loggedInUser?.id]);
  return (
    <>
      {!loggedInUser && (
        <Navigate to={AllRoutes.Login} replace={true}></Navigate>
      )}
    </>
  );
};

export default Logout;
