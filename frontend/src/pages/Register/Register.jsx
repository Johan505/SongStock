import { useState } from "react";
import { useUserActions } from "../../hooks/useUserActions";
import { useSelector } from "react-redux";

export const Register = () => {
    const { NewUser } = useUserActions();
    const { status } = useSelector((state) => state.users)
  
    const [formData, setFormData] = useState({
      name: "",
      lastname: "",
      identification: "",
      email: "",
      phone: "",
      address: "",
      id_rol: "2",
      password: "",
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      NewUser(formData);
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
            <h2>Sign up to SongStock</h2>
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
  
                <label>Lastname:</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="form-input"
                />
  
                <label>Identification:</label>
                <input
                  type="text"
                  name="identification"
                  value={formData.identification}
                  onChange={handleInputChange}
                  className="form-input"
                />
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="col-two">
                <label>phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                />
  
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"
                />
                <label>Rol:</label>
                <select
                  name="id_rol"
                  value={formData.id_rol}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="2">User</option>
                  <option value="3">Provider</option>
                </select>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
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