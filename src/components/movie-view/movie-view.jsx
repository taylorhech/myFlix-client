import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieView = ({ movie }) => {
    console.log("Movie data:", movie);
    
    return (
        <Card className="movie-view">
            <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>
                <div>
                    <span>Genre: </span>
                    <span>{movie.Genre?.Name}</span>
                </div>
                <div>
                    <span>Director: </span>
                    <span>{movie.Director.Name}</span>
                </div>
                <div>
                    <span>Description: </span>
                    <span>{movie.Description}</span>
                </div>
                </Card.Text>
                <div>
                    <Link to={`/`}>
                    <Button variant="secondary">Back</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        ImagePath: PropTypes.string.isRequired
       }).isRequired,
       onBackClick: PropTypes.func.isRequired,
};