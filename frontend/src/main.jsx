import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./store";
import "./index.css";
import { AppSong } from "./AppSong";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppSong />
  </Provider>
);
