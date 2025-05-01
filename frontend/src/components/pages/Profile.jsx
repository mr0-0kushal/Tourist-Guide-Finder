import React, { useContext } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/profile.css"; // your custom CSS

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const Sidebar = () => (
    <div className="dashboard-sidebar">
      <img
        src={user.photo}
        alt="User"
        className="sidebar-img mx-auto"
      />
      <h3>{user.username}</h3>
      <p className="role">{user.role}</p>
      <nav className="sidebar-links">
        <Link to="profile">Profile</Link>
        <Link to="tours">Tours</Link>
        <Link to="bookings">Bookings</Link>
        <Link to="messages">Messages</Link>
        <Link to="settings">Settings</Link>
        <Button color="danger" size="sm" onClick={handleLogout} className="mt-3">
          Logout
        </Button>
      </nav>
    </div>
  );

  const Navbar = () => (
    <div className="dashboard-navbar d-flex justify-content-between align-items-center p-3 mb-3 bg-light rounded">
      <h5 className="mb-0">Dashboard</h5>
      <Button color="danger" size="sm" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );

  return (
    <section className="dashboard-page mt-5">
      <Container fluid>
        <Row>
          <Col lg="3" md="4" sm="12">
            <Sidebar />
          </Col>
          <Col lg="9" md="8" sm="12">
            <Navbar />
            <div className="dashboard-content">
              <Outlet /> {/* Render nested routes here */}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;
