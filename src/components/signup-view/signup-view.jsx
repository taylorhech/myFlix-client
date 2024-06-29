import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Container, Row, Col, CardGroup, Card } from "react-bootstrap";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };

        fetch("https://themovieflix-ab7619e62e53.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Please Register</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="signupFormUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        minLength={5}
                                        />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="signupFormPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={8}
                                        />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="signupFormEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="signupFormBirthday">
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control
                                        type="date"
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                        required
                                        />
                                    </Form.Group>
                                    <br />
                                    <Button variant="primary" type="Submit">Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};