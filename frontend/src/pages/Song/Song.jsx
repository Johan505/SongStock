import { FormSong } from "../../components/Song/FormSong";

export const RegisterSong = () => {
  return (
    <div className="container-register">
      <div className="register">
        <div className="info-login">
          <i className="fa-solid fa-earth-americas"></i>
          <h2>Create Song</h2>
        </div>
        <FormSong action="Create"/>      
        </div>
    </div>
  );
};
