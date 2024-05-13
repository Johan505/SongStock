import { useDispatch } from "react-redux";
import { registerVinylDiscAsync } from "../store/vinyldiscs/slice";


export const useVinylDiscActions = () => {
    const dispatch = useDispatch();
  
    const NewVinylDisc = (vinyldiscData) => {
      dispatch(registerVinylDiscAsync(vinyldiscData));
    };  
  
    return { NewVinylDisc };
  };