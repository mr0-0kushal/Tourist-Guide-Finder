import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import loginImg from "../../assets/images/login.png";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
        setError(result.message);
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
      setError("An error occurred. Please try again.");
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container fade-in">
              <div className="login__img">
                <img src={loginImg} alt="Login" />
              </div>
              <div className="login__form">
                <h2>Welcome Back!</h2>
                <Form onSubmit={handleLogin}>
                  <FormGroup>
                    <select
                      className={`form-control ${error ? 'error' : ''}`}
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="user">Tourist/Guide</option>
                      <option value="admin">Admin</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      value={credentials.email}
                      onChange={handleChange}
                      className={error ? 'error' : ''}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      value={credentials.password}
                      onChange={handleChange}
                      className={error ? 'error' : ''}
                    />
                  </FormGroup>
                  {error && <div className="error-message">{error}</div>}
                  <Button 
                    className={`auth__btn ${loading ? 'loading' : ''}`} 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </Form>
                <p>
                  Don't have an account?<Link to="/register">Create Account</Link>
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
