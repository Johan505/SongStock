import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useCartActions } from "../../hooks/useCartActions";
const { VITE_URL_API_IMG } = import.meta.env;

export const Cart = () => {
  const { getCartSongUser, getCartVinylUser } = useCartActions();
  const user = useSelector((state) => state.users.auth.user);
  const { vinylid, songid, status } = useSelector((state) => state.cart);

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    getCartSongUser(user.id);
    getCartVinylUser(user.id);
  }, []);

  useEffect(() => {
    if (songid) {
      const initialQuantities = songid.reduce((acc, song) => {
        acc[song.id] = song.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [songid]);

  const handleQuantityChange = (songId, action) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (action === "increase") {
        newQuantities[songId] += 1;
      } else if (action === "decrease" && newQuantities[songId] > 1) {
        newQuantities[songId] -= 1;
      }
      return newQuantities;
    });
  };

  if (!songid || status === "loading")
    return <div className="loader">Loading...</div>;

  return (
    <>
      <p>Cart</p>
      <div>
        {songid.map((song) => (
          <div key={song.id}>
            <img src={`${VITE_URL_API_IMG}${song.song.img}`} alt="Song Image" />
            <p>{song.song.name}</p>
            <p>{song.song.artist}</p>
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange(song.id, "decrease")}>
                -
              </button>
              <input
                type="number"
                value={
                  quantities[song.id] !== undefined ? quantities[song.id] : 1
                }
                readOnly
              />
              <button onClick={() => handleQuantityChange(song.id, "increase")}>
                +
              </button>
            </div>
            <p>{song.song.price}</p>
            <button>Delete</button>
          </div>
        ))}
      </div>
      <div>
      {vinylid.map((song) => (
          <div key={song.id}>
            <img src={`${VITE_URL_API_IMG}${song.song.img}`} alt="Song Image" />
            <p>{song.song.name}</p>
            <p>{song.song.artist}</p>
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange(song.id, "decrease")}>
                -
              </button>
              <input
                type="number"
                value={
                  quantities[song.id] !== undefined ? quantities[song.id] : 1
                }
                readOnly
              />
              <button onClick={() => handleQuantityChange(song.id, "increase")}>
                +
              </button>
            </div>
            <p>{song.song.price}</p>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};
