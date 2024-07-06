import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) return;
        
        fetch("https://themovieflix-ab7619e62e53.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                    id: movie._id,
                    Title: movie.Title,
                    Genre: movie.Genre,
                    Description: movie.Description,
                    Director: movie.Director,
                    ImagePath: movie.ImagePath
                };
            });
            setMovies(moviesFromApi);
        });
    }, [token]);

    return (
        <Row className="justify-content-center">
            {!user ? (
                <Col md={8}>
                  <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }} 
                  />
                  or
                  <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8}>
                  <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                  />
                </Col>
            ) : movies.length === 0 ? (
                <div>This list is empty!</div>
            ) : (
                <>
                  {movies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                      />
                    </Col>
                  ))}
                  <Button variant="primary" type="Logout"
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                  >
                    Logout
                  </Button>
                </>
            )}
        </Row>
    );
};