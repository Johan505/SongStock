import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { Register } from "../pages/Register/Register";
import { Login } from "../pages/Login/Login";
import { RegisterSong } from "../pages/Song/Song";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-register" element={<Register />} />
        <Route path="/login-user" element={<Login />} />
        <Route path="/song-register" element={<RegisterSong />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};