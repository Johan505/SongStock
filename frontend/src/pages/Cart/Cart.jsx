import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useCartActions } from "../../hooks/useCartActions";
const { VITE_URL_API_IMG } = import.meta.env;

export const Cart = () => {
  const { getCartSongUser, getCartVinylUser, dropCartSong, dropCartVinyl } =
    useCartActions();
  const user = useSelector((state) => state.users.auth.user);
  const { allcartvinyls, allcartsongs, status } = useSelector(
    (state) => state.cart
  );

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    getCartSongUser(user.id);
    getCartVinylUser(user.id);
  }, []);

  useEffect(() => {
    const initialQuantities = {};
    allcartvinyls.forEach((vinyl) => {
      initialQuantities[vinyl.id] = vinyl.quantity;
    });
    setQuantities(initialQuantities);
  }, [allcartvinyls]);

  const deleteCartSong = async (id) => {
    await dropCartSong(id);
    getCartSongUser(user.id);
  };

  const deleteCartVinyl = async (id) => {
    await dropCartVinyl(id);
    getCartVinylUser(user.id);
  };

  const incrementQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decrementQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const calculateSubtotal = () => {
    let total = 0;
    allcartsongs.forEach((song) => {
      total += parseFloat(song.song.price);
    });
    allcartvinyls.forEach((vinyl) => {
      total +=
        parseFloat(vinyl.vinyldisc.price) *
        (quantities[vinyl.id] || vinyl.quantity);
    });
    return total;
  };

  if (!allcartsongs || status === "loading")
    return <div className="loader">Loading...</div>;

  return (
    <>
      <p>Cart</p>
      <div>
        {allcartsongs.map((song) => (
          <div key={song.id}>
            <img src={`${VITE_URL_API_IMG}${song.song.img}`} alt="Song Image" />
            <p>{song.song.name}</p>
            <p>{song.song.artist}</p>
            <p>{song.song.price}</p>
            <button onClick={() => deleteCartSong(song.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        {allcartvinyls.map((vinyl) => (
          <div key={vinyl.id}>
            <img
              src={`${VITE_URL_API_IMG}${vinyl.vinyldisc.img}`}
              alt="Vinyl Image"
            />
            <p>{vinyl.vinyldisc.name}</p>
            <p>{vinyl.vinyldisc.artist}</p>
            <p>{vinyl.vinyldisc.price}</p>
            <div>
              <button
                onClick={() => decrementQuantity(vinyl.id)}
                disabled={quantities[vinyl.id] <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={quantities[vinyl.id] || vinyl.quantity}
                readOnly
              />
              <button onClick={() => incrementQuantity(vinyl.id)}>+</button>
            </div>
            <button onClick={() => deleteCartVinyl(vinyl.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
      </div>
      <button>Buy</button>
    </>
  );
};