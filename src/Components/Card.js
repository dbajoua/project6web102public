import react from "react";
import { Link } from "react-router-dom";

  

const Card = ({ title, rating, overview, poster }) => {
    return (
      <div className="card">
        <Link to={{
          pathname: "/movie",
          state: {
            title: title,
            rating: rating,
            overview: overview,
            poster: poster
          }
        }}>
          <img src={poster} alt="movie poster" />
          <div className="card-content"> 
            <h3>{title}</h3>
            <p>Rating: {rating}</p>
            <p>{overview}</p>
          </div>
        </Link>
      </div>
    );
  };
export default Card;