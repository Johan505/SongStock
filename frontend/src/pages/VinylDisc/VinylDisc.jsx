import { FormVinyl } from "../../components/VinylDisc/FormVinyl";

export const RegisterVinylDisc = () => {
  return (
    <div className="container-register">
      <div className="register">
        <div className="info-login">
          <i className="fa-solid fa-earth-americas"></i>
          <h2>Create Vinyl Discs</h2>
        </div>
        <FormVinyl action="Create"/>      
        </div>
    </div>
  );
};
