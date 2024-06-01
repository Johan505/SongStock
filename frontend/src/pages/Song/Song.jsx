import { FormSong } from "../../components/Song/FormSong";
import "./Module.scss";

export const RegisterSong = () => {
  return (
    <div className="container-register">
      <div className="register-song">
        <div className="info-login">
          <i className="fa-solid fa-earth-americas"></i>
          <h2>Create Song</h2>
        </div>
        <FormSong action="Create" />
      </div>
    </div>
  );
};
