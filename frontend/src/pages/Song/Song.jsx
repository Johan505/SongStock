import { useSongActions } from "../../hooks/useSongActions";
import { useState } from "react";
import { useSelector } from "react-redux";

export const RegisterSong = () => {
  const { NewSong } = useSongActions();
  const { status } = useSelector((state) => state.users)

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    mb: "",
    kbps:"",
    gender:"",
    author:"",
    img: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    NewSong(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container-register">
      <div className="register">
        <div className="info-login">
          <i className="fa-solid fa-earth-americas"></i>
          <h2>Songs</h2>
        </div>
        <form onSubmit={handleSubmit} className="form-register">
          <div className="container-cols">
            <div className="col-one">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
              />

              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="form-input"
              />

              <label>Duration:</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="form-input"
              />
              <label>mb:</label>
              <input
                type="text"
                name="mb"
                value={formData.mb}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="col-two">
              <label>kbps:</label>
              <input
                type="text"
                name="kbps"
                value={formData.kbps}
                onChange={handleInputChange}
                className="form-input"
              />

              <label>Gender:</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form-input"
              />
             <label>Author:</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="form-input"
              />
              <label>img:</label>
              <input
                type="text"
                name="img"
                value={formData.img}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <button className="button-register" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Loading..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};