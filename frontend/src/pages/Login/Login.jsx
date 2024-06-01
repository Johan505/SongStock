import { useEffect, useState } from "react";
import { useUserActions } from "../../hooks/useUserActions";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Module.scss";

export const Login = () => {
  const { LoginUser } = useUserActions();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginUser(formData);
    setFormData({ email: "", password: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { status } = useSelector((state) => state.users);
  const { access_token, user } = useSelector((state) => state.users.auth);

  useEffect(() => {
    if (access_token) {
      navigate("/");
    }
  }, [access_token, user, navigate]);

  return (
    <div className="container-login">
      <div className="sing-in-login">
        <div className="info-login">
          Sing In
        </div>

        <form className="form-login" onSubmit={handleSubmit}>
          <label className="title-input">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
          />

          <label className="title-input">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-input"
          />

          <button
            className="button-login"
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "loading..." : "Sign in"}
          </button>
          <div className="link-register">
            <p>
              Do not have an account?{" "}
              <Link to="/user/user-register" className="link">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
