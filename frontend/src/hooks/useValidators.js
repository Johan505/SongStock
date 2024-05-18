import { useSelector } from "react-redux";

export const useValidators = () => {
  const isAuthenticated = useSelector((state) => state.users.auth.access_token);
  const user = useSelector((state) => state.users.auth.user?.role.rol);

  const isUserAuthenticated = () => {
    return isAuthenticated ? true : false;
  };

  const isUserRolAdmin = () => {
    return user === "Admin" ? true : false;
  };

  const isUserRolUser = () => {
    return user === "User" ? true : false;
  };

  const isUserRolProvider = () => {
    return user === "Provider" ? true : false;
  };

  return {
    isUserAuthenticated,
    isUserRolAdmin,
    isUserRolUser,
    isUserRolProvider,
  };
};