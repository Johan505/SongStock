import { useSelector } from "react-redux";
import { useVinylDiscActions } from "../../hooks/useVinylDiscActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const FormVinyl = ({ action, vinyl }) => {
    const navigate = useNavigate()
    const { createVinylDisc, updatevini } = useVinylDiscActions();
    const { status } = useSelector((state) => state.vinyldiscs);
  
    const [formData, setFormData] = useState({
      id: null,
      name: "",
      artist: "",
      releaseyear: "",
      price: "",
      amount: "",
      img: "",
      format: "",
      description: "",
      state: "",
      condition: "",
      observations: "",
    });

    useEffect(() => {
      if (action === "Update" && vinyl) {
        setFormData({
          id: vinyl.id,
          name: vinyl.name,
          artist: vinyl.artist,
          releaseyear: vinyl.releaseyear,
          price: vinyl.price,
          amount: vinyl.amount,
          img: vinyl.img,
          format: vinyl.format,
          description: vinyl.description,
          state: vinyl.state,
          condition: vinyl.condition,
          observations: vinyl.observations,
        });
      }
    }, [action]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = action === "Update" ? await updatevini(formData): await createVinylDisc(formData);
      if (response.meta.requestStatus === "fulfilled") {
        if (action === "Create") {
          navigate("/");
        } else {
          navigate("/");
        }
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    return(
        <form
        onSubmit={handleSubmit}
        className="form-register"
        encType="multipart/form-data"
      >
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

            <label>Artist:</label>
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleInputChange}
              className="form-input"
            />

            <label>Release year:</label>
            <input
              type="date"
              name="releaseyear"
              value={formData.releaseyear}
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

            <label>Amount:</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
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

            <label>Format:</label>
            <input
              type="text"
              name="format"
              value={formData.format}
              onChange={handleInputChange}
              className="form-input"
            />

            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-input"
            />

            <label>State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="form-input"
            />

            <label>Condition:</label>
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="form-input"
            />
            <label>Observations:</label>
            <input
              type="text"
              name="observations"
              value={formData.observations}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>

        <button
          className="button-register"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Loading..." : "Sign up"}
        </button>
      </form>
    )
}