import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";


export const AppSong = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};