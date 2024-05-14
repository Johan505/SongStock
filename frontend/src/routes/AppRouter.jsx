import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { Register } from "../pages/Register/Register";
import { Login } from "../pages/Login/Login";
import { RegisterSong } from "../pages/Song/Song";
import { RegisterVinylDisc } from "../pages/VinylDisc/VinylDisc";
import { UpdateVinyldisc } from "../pages/UpdateVinylDisc/UpdateVinyldisc";
import { Nav } from "../components/Nav/Nav";

export const AppRouter = () => {
  return (
    <>
    <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/user-register" element={<Register />} />
        <Route path="/user/user-login" element={<Login />} />
        <Route path="/song/song-register" element={<RegisterSong />} />
        <Route path="/vinyldisc/vinyldisc-register" element={<RegisterVinylDisc />} />
        <Route path="/vinyldisc/vinyldisc-edit/:id" element={<UpdateVinyldisc />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};