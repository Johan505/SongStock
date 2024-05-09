import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { Register } from "../pages/Register/Register";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-register" element={<Register />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};