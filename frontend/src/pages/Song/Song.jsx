import { useSongActions } from "../../hooks/useSongActions";
import { useState } from "react";
import { useSelector } from "react-redux";

export const RegisterSong = () => {
  const { NewSong } = useSongActions();
  const { status } = useSelector((state) => state.songs)

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    mb: "",
    kbps:"",
    gender:"",
    artist:"",
    img: "",
    song: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (!formData[key]) continue;

      formDataToSend.append(key, formData[key]);
    }

    NewSong(formDataToSend);
    // const response = await NewSong(formDataToSend);
    // if (response.meta.requestStatus === "fulfilled") {
    //   navigate("/");
    // }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name} = e.target;
    const file = e.target.files[0];
    if (file && file.type === "audio/mpeg") {
      // Crear un objeto URL para el archivo
      const audioUrl = URL.createObjectURL(file);
      const audio = new Audio(audioUrl);

      // Cargar el archivo de audio para leer su metadata
      audio.onloadedmetadata = () => {
        const mb = (file.size / 1048576).toFixed(2); 
        const durationInSeconds = audio.duration;
        const kbps = ((file.size * 8) / (durationInSeconds * 1000)).toFixed(2); 

        setFormData({
          ...formData,
          mb: mb,
          duration: durationInSeconds,
          kbps: kbps,
          [name]: file
        });
        // Limpiar el objeto URL después de su uso
        URL.revokeObjectURL(audioUrl);
      };
    } else {
      alert('Por favor, sube un archivo MP3.');
    }
  };

  return (
    <div className="container-register">
      <div className="register">
        <div className="info-login">
          <i className="fa-solid fa-earth-americas"></i>
          <h2>Songs</h2>
        </div>
        <form onSubmit={handleSubmit} className="form-register"  encType="multipart/form-data">
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

              <label>Gender:</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
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
              <label>img:</label>
              <input
                type="text"
                name="img"
                value={formData.img}
                onChange={handleInputChange}
                className="form-input"
              />
              
              <label>Song:</label>
              <input
                type="file"
                accept=".mp3"
                name="song"
                onChange={handleFileChange} 
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