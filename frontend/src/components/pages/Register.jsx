import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Label, Input } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/login.css';
import registerImg from '../../assets/images/register.png';
import userIcon from '../../assets/images/user.png';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config.js';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    role: "tourist", // Default role is "tourist"
    status: "pending",
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setCredentials((prev) => ({
      ...prev,
      role: selectedRole,
      status: selectedRole === "guide" ? "pending" : undefined, // ✅ Guides get "pending" status
    }));
  };
  

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      dispatch({ type: 'REGISTER_SUCCESS' });
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="md:m-auto">
            <div className="login__container flex flex-col md:flex-row md:w-[70%] justify-content-between rounded-2xl mx-auto">
              <div className="login__img md:w-full">
                <img src={registerImg} alt="" className="md:h-full mx-auto" />
              </div>
              <div className="login__form w-full rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="text" placeholder="Username" required id="username" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="email" placeholder="Email" required id="email" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
                  </FormGroup>

                  {/* Role Selection (Tourist or Guide) */}
                  <FormGroup>
                    <Label>Select Role:</Label>
                    <div className="role-selection flex w-[23px] h-[23px] rounded-full bg-white gap-x-2 mb-2">
                      <Input type="radio" name="role" value="tourist" checked={credentials.role === "tourist"} onChange={handleRoleChange} /> Tourist
                    </div>
                    <div className='role-selection flex w-[23px] h-[23px] rounded-full bg-white gap-x-2'>
                      <Input type="radio" name="role" value="guide" checked={credentials.role === "guide"} onChange={handleRoleChange}/> Guide
                    </div>
                  </FormGroup>

                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Register
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login"> Login Here!</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
