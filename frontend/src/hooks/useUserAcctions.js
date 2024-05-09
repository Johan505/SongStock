import { useDispatch } from "react-redux";
import { registerUserAsync } from "../store/users/slice";
//import { useNavigate } from "react-router-dom";

export const useUserActions = () => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const NewUser = (userData) => {
    dispatch(registerUserAsync(userData));
  };


  return { NewUser };
};