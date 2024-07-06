import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const [movies, setMovies] = useState([]);

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
        <BrowserRouter>
          <NavigationBar
            user={user}
            onLoggedOut={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          />
          <Row className="justify-content-center">
            <Routes>
              <Route
                path="/signup"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <SignupView />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <LoginView onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                          }} />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/movies/moviesId"
                element={
                  <>
                    {user ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <Col>This list is empty!</Col>
                    ) : (
                      <Col md={8}>
                        <MovieView movies={movies} />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <Col>This list is empty!</Col>
                    ) : (
                      <>
                        {movies.map((movies) => (
                          <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))}
                      </>
                    )}
                  </>
                }
              />
            </Routes>
          </Row>
        </BrowserRouter>
    );
};