import { Routes, Route} from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { Register } from "../pages/Register/Register";
import { Login } from "../pages/Login/Login";
import { RegisterVinylDisc } from "../pages/VinylDisc/VinylDisc";
import { UpdateVinyldisc } from "../pages/UpdateVinylDisc/UpdateVinyldisc";
import { Nav } from "../components/Nav/Nav";
<<<<<<< HEAD
import { UpdateSong } from "../pages/UpdateSong/UpdateSong";
import { RegisterSong } from "../pages/Song/Song";
import { DetailsSong } from "../pages/DetailsSong/DetailsSong";
import { DetailsVinyls } from "../pages/DetailsVinyls/DetailsVinyls";
import { MyPost } from "../pages/MyPost/MyPost";
import { Favorites } from "../pages/Favorites/Favorites";

export const AppRouter = () => {
 
=======
import { useValidators } from "../hooks/useValidators";
import { HomeAdmin } from "../pages/HomeAdmin/HomeAdmin";
import { HomeProvider } from "../pages/HomeProvider/HomeProvider";
import { UpdateSong } from "../pages/UpdateSong/UpdateSong";
import { RegisterSong } from "../pages/Song/Song";

export const AppRouter = () => {
  const {isUserRolAdmin, isUserRolProvider} = useValidators()
>>>>>>> Santiago
  return (
    <>
    <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
=======
        <Route path="/admin" element={ isUserRolAdmin() ? (<HomeAdmin />) : (<>denied access</>)}/>
        <Route path="/provider" element={ isUserRolProvider() ? (<HomeProvider />) : (<>denied access</>)}/>
>>>>>>> Santiago
        <Route path="/user/user-register" element={<Register />} />
        <Route path="/user/user-login" element={<Login />} />
        <Route path="/song/song-register" element={<RegisterSong />} />
        <Route path="/song/song-edit/:id" element={<UpdateSong />} />
<<<<<<< HEAD
        <Route path="/details-song/:id" element={<DetailsSong />} />
        <Route path="/song/favorites" element={<Favorites />} />
        <Route path="/vinyldisc/vinyldisc-register" element={<RegisterVinylDisc />} />
        <Route path="/vinyldisc/vinyldisc-edit/:id" element={<UpdateVinyldisc />} />
        <Route path="/details-vinyldisc/:id" element={<DetailsVinyls />} />
        <Route path="/vinyldisc/myposts" element={<MyPost />} />
        
        
=======
        <Route path="/vinyldisc/vinyldisc-register" element={<RegisterVinylDisc />} />
        <Route path="/vinyldisc/vinyldisc-edit/:id" element={<UpdateVinyldisc />} />
>>>>>>> Santiago
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};