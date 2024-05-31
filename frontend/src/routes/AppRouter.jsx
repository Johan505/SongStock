import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { Register } from "../pages/Register/Register";
import { Login } from "../pages/Login/Login";
import { RegisterVinylDisc } from "../pages/VinylDisc/VinylDisc";
import { UpdateVinyldisc } from "../pages/UpdateVinylDisc/UpdateVinyldisc";
import { Nav } from "../components/Nav/Nav";
import { UpdateSong } from "../pages/UpdateSong/UpdateSong";
import { RegisterSong } from "../pages/Song/Song";
import { DetailsSong } from "../pages/DetailsSong/DetailsSong";
import { DetailsVinyls } from "../pages/DetailsVinyls/DetailsVinyls";
import { MyPost } from "../pages/MyPost/MyPost";
import { Favorites } from "../pages/Favorites/Favorites";
import { Cart } from "../pages/Cart/Cart";
import { useSelector } from "react-redux";
import { useSongActions } from "../hooks/useSongActions";
import { useEffect } from "react";
import { useValidators } from "../hooks/useValidators";
import { Player } from "../components/Player/Player";

export const AppRouter = () => {
  const { isUserAuthenticated } = useValidators();

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/user-register" element={<Register />} />
        <Route path="/user/user-login" element={<Login />} />
        <Route path="/song/song-register" element={<RegisterSong />} />
        <Route path="/song/song-edit/:id" element={<UpdateSong />} />
        <Route path="/details-song/:id" element={<DetailsSong />} />
        <Route path="/song/favorites" element={<Favorites />} />
        <Route
          path="/vinyldisc/vinyldisc-register"
          element={<RegisterVinylDisc />}
        />
        <Route
          path="/vinyldisc/vinyldisc-edit/:id"
          element={<UpdateVinyldisc />}
        />
        <Route path="/details-vinyldisc/:id" element={<DetailsVinyls />} />
        <Route path="/vinyldisc/myposts" element={<MyPost />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      {isUserAuthenticated() && <Player />}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
