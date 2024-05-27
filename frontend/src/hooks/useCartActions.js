import { useDispatch } from "react-redux";
import { addSongCart, addVinylCart, getSongCartAsync, getVinylCartAsync, deleteCartSong, deleteCartVinyl } from "../store/cart/slice";

export const useCartActions = () => {
  const dispatch = useDispatch();

  const addSongToCart = async (song) => {
    return dispatch(addSongCart(song));
  };

  const addVinylToCart = async (vinyl) => {
    return dispatch(addVinylCart(vinyl));
  };

  const getCartSongUser = (id) => {
    dispatch(getSongCartAsync(id));
 };

 const getCartVinylUser = (id) => {
  dispatch(getVinylCartAsync(id));
};

const dropCartSong = async (id) => {
  return dispatch(deleteCartSong(id));
};

const dropCartVinyl = async (id) => {
  return dispatch(deleteCartVinyl(id));
};

  return {
    addSongToCart,
    addVinylToCart,
    getCartSongUser,
    getCartVinylUser,
    dropCartSong,
    dropCartVinyl
  };
};
