import { useLocation } from "react-router-dom";

const Movie = () => {
  const location = useLocation();
  const { title, rating, overview, poster } = location.state;

  return (
    <div className="movie">
      <img src={poster} alt="movie poster" />
      <h1>{title}</h1>
      <p>Rating: {rating}</p>
      <p>{overview}</p>
    </div>
  );
};

export default Movie;