import { Link } from "react-router-dom";
const { VITE_URL_API_IMG } = import.meta.env;

export const CardVinylDisc = ({ vinyls }) => {
  return (
    <div>
        {vinyls.map((vinyl) => (
          <div key={vinyl.id}>
            <Link to={`/details-vinyldisc/${vinyl.id}`}>
              <img src={`${VITE_URL_API_IMG}${vinyl.img}`} alt="Vinyldisc Image" />
              <p>{vinyl.name}</p>
              <p>{vinyl.artist}</p>
            </Link>
          </div>
        ))}
      </div>
  );
};
