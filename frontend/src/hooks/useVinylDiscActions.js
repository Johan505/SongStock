import { useDispatch } from "react-redux";
import { getVinylDiscAsync, registerVinylDiscAsync, updateVinylDiscAsync,getAllVinylDiscAsync, deleteVinylDisc } from "../store/vinyldiscs/slice";

export const useVinylDiscActions = () => {
    const dispatch = useDispatch();
  
    const createVinylDisc = async (vinyldiscData) => {
      return dispatch(registerVinylDiscAsync(vinyldiscData));
    };
    
    const updatevini = async (formData) => {
      return dispatch(updateVinylDiscAsync(formData));
    };

    const searchid = (id)  => {
       dispatch(getVinylDiscAsync(id));
    };

    const getAllVinylDisc = ()  => {
      dispatch(getAllVinylDiscAsync());
   };

   const dropVinylDisc = (id)  => {
    dispatch(deleteVinylDisc(id));
 };
  
    return { createVinylDisc, updatevini, searchid, getAllVinylDisc, dropVinylDisc };
};
