import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            Title: "Fight Club",
            Director: "David Fincher",
            Genre: "Drama",
            Description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
            Image: "https://image.tmdb.org/t/p/original/A86dg5r6tdUVvQBeOGhvgTXGoQi.jpg"
        },
        {
            id: 2,
            Title: "Inception",
            Director: "Christopher Nolan",
            Genre: "Action",
            Description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
            Image: "https://image.tmdb.org/t/p/original/gWyowg9gwFBBj9YPbLd67dDK7GF.jpg"
        },
        {
            id: 3,
            Title: "The Dark Knight",
            Director: "Christopher Nolan",
            Genre: "Action",
            Description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            Image: "https://image.tmdb.org/t/p/original/3otEafr8bn78vqQQTg9omTyE6Il.jpg"
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>This list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    );
};