import React from "react";
import PropTypes from "prop-types";
import {Card, Button} from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="movie-card h-100">
      <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="outline-light">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    ImagePath: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};