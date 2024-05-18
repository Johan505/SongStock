import { Routes, Route} from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { Register } from "../pages/Register/Register";
import { Login } from "../pages/Login/Login";
import { RegisterVinylDisc } from "../pages/VinylDisc/VinylDisc";
import { UpdateVinyldisc } from "../pages/UpdateVinylDisc/UpdateVinyldisc";
import { Nav } from "../components/Nav/Nav";
import { useValidators } from "../hooks/useValidators";
import { HomeAdmin } from "../pages/HomeAdmin/HomeAdmin";
import { HomeProvider } from "../pages/HomeProvider/HomeProvider";
import { UpdateSong } from "../pages/UpdateSong/UpdateSong";
import { RegisterSong } from "../pages/Song/Song";

export const AppRouter = () => {
  const {isUserRolAdmin, isUserRolProvider} = useValidators()
  return (
    <>
    <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={ isUserRolAdmin() ? (<HomeAdmin />) : (<>denied access</>)}/>
        <Route path="/provider" element={ isUserRolProvider() ? (<HomeProvider />) : (<>denied access</>)}/>
        <Route path="/user/user-register" element={<Register />} />
        <Route path="/user/user-login" element={<Login />} />
        <Route path="/song/song-register" element={<RegisterSong />} />
        <Route path="/song/song-edit/:id" element={<UpdateSong />} />
        <Route path="/vinyldisc/vinyldisc-register" element={<RegisterVinylDisc />} />
        <Route path="/vinyldisc/vinyldisc-edit/:id" element={<UpdateVinyldisc />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};