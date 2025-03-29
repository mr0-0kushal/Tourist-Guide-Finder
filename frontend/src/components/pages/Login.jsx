import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import loginImg from "../../assets/images/login.png";
import userIcon from "../../assets/images/user.png";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [role, setRole] = useState("user"); // Default role is 'user'

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const loginUrl =
        role === "admin" ? `${BASE_URL}/auth/admin-login` : `${BASE_URL}/auth/login`;

      const res = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return;
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else if (result.data.role === "guide") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex flex-column md:flex-row md:w-[70%] rounded-2xl mx-auto">
              <div className="login__img md:w-full">
                <img src={loginImg} alt="Login" className="md:h-full mx-auto" />
              </div>
              <div className="login__form w-full rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
                <div className="user">
                  <img src={userIcon} alt="User Icon" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={handleLogin}>
                  <FormGroup>
                    <label>Choose Role:</label>
                    <select
                      className="form-control"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="user">User (Tourist/Guide)</option>
                      <option value="admin">Admin</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an account? <Link to="/register">Register Here!</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
