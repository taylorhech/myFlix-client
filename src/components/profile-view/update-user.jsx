import React from "react";
import Form from"react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

export const UpdateUser = ({ userInfo, handleSubmit, handleUpdate }) => {

    return (
    <Row>
      <Form onSubmit={handleSubmit}>
        <br />
        <h2> User Information </h2>
        <Form.Group controlId="updateFormUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            minLength={5}
            value={userInfo.Username}
            onChange={(e) => handleUpdate(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="updateFormPassword">
          <Form.Label>Password:
          </Form.Label>
          <Form.Control
            type="password"
            minLength={8}
            value={userInfo.Password}
            onChange={(e) => handleUpdate(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="updateFormEmail">
          <Form.Label> Email: </Form.Label>
          <Form.Control
            type="email"
            value={userInfo.Email}
            onChange={(e) => handleUpdate(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="updateFormBirthday">
          <Form.Label> Birthday: </Form.Label>
          <Form.Control
            type="date"
            value={userInfo.Birthday}
            onChange={(e) => handleUpdate(e.target.value)}
            required
          />
        </Form.Group>
        <br />
      </Form>   
     </Row>   
  );
};
UpdateUser.propTypes = {
  userInfo: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};