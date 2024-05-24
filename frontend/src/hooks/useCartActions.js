import { useDispatch } from "react-redux";
import { addSongCart } from "../store/cart/slice";

export const useCartActions = () => {
  const dispatch = useDispatch();

  const addSongToCart = async (song) => {
    return dispatch(addSongCart(song));
  };

  return {
    addSongToCart
  };
};
