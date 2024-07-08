import React from "react";
import { useState } from "react";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";
import Button from "react-bootstrap/Button";


export const ProfileView = ({ token, user, movies, }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id));

    const userInfo = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`https://themovieflix-ab7619e62e53.herokuapp.com/users/${storedUser.Username}`, {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                alert("Update successful");
            } else {
                alert("Update failed");
            }
        });
    };

    const handleUpdate = (e) => {
        switch(e.target.name) {
            case "username":
                setUsername(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "birthday":
                setBirthday(e.target.value);
                default:
        };
    };

    const handleDeleteAccount = (id) => {
        fetch(`https://themovieflix-ab7619e62e53.herokuapp.com/users/${id}`, {
            method: "Delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        }).then((response) => {
            if (response.ok) {
                alert("Account successfully deleted");
                localStorage.clear();
                window.location.reload();
            } else {
                alert("Something went wrong");
            }
        });
    };

    return (
        <div>
            <div>
                <UpdateUser userInfo={userInfo} handleSubmit={handleSubmit} />
                <Button onClick={handleUpdate} variant="primary" type="submit">
                    Update
                </Button> {"  "}
                <Button onClick={handleDeleteAccount(storedUser._id)} variant="danger" type="Submit">
                    Delete Account
                </Button>
            </div>
            <br />
            <div>
                <FavoriteMovies favoriteMovies={favoriteMovies} />
            </div>
        </div>
    )
}