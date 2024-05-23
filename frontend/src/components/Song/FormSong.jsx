import { useSelector } from "react-redux";
import { useSongActions } from "../../hooks/useSongActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const FormSong = ({ action, song }) => {
    const navigate = useNavigate()
    const { NewSong, updatesong } = useSongActions();
    const { status } = useSelector((state) => state.songs);
  
    const [formData, setFormData] = useState({
      id: null,
      name: "",
      price: "",
      duration: "",
      mb: "",
      kbps: "",
      gender: "",
      artist: "",
      img: null,
      song: null,
    });

    useEffect(() => {
      if (action === "Update" && song) {
        setFormData({
          id: song.id,
          name: song.name,
          price: song.price,
          duration: song.duration,
          mb: song.mb,
          kbps: song.kbps,
          gender: song.gender,
          artist: song.artist,
          img: song.img,
          song: song.song,
        });
      }
    }, [action]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formDataToSend = new FormData();
  
      for (const key in formData) {
        if (!formData[key]) continue;
  
        formDataToSend.append(key, formData[key]);
      }

    // const formDataObject = Object.fromEntries(formDataToSend.entries());

    // console.log(formDataObject);
  
      const response = action === "Update" ? await updatesong(formDataToSend): await NewSong(formDataToSend);
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

    const handleFileChange = (e) => {
      const { name } = e.target;
      const file = e.target.files[0];
    
      // Verifica si se seleccionó un archivo
      if (file) {
        // Verifica si el archivo es de tipo audio/mp3 (para la canción)
        if (file.type === "audio/mpeg") {
          // Crear un objeto URL para el archivo de audio
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
              [name]: file,
            });
            // Limpiar el objeto URL después de su uso
            URL.revokeObjectURL(audioUrl);
          };
        } else if (file.type.startsWith("image/")) {
          // El archivo es de tipo imagen, asignarlo al campo de imagen (img)
          setFormData({
            ...formData,
            [name]: file,
          });
        } else {
          // El archivo no es de tipo audio/mp3 ni de tipo imagen, mostrar una alerta
          alert("Por favor, sube un archivo MP3 para la canción o una imagen para la img.");
        }
      }
    };

    return (
      <div className="container-register">
        <div className="register">
          <div className="info-login">
            <i className="fa-solid fa-earth-americas"></i>
            <h2>Songs</h2>
          </div>
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
                  type="file"
                  name="img"
                  onChange={handleFileChange}
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
  
            <button
              className="button-register"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Loading..." : "Add"}
            </button>
          </form>
        </div>
      </div>
    );
}