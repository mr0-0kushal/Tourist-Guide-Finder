import React, { useEffect, useState, useContext } from "react";
import "../../styles/profile.css"; // Import your CSS file for styling
import { Container, Row, Col, Button } from "reactstrap";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { _id, username, email, photo, role, reviews } = user;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users/${_id}/profile`, {
            method:'get',
            headers:{
              'content-type':'application/json',
            },
            credentials:'include',
        });

        const result = await res.json();
        if (res.ok) {
          setProfile(result.data);
        } else {
          console.error(result.message);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <h2 className="text-center mt-5">Loading Profile...</h2>;
  }

  return (
    <section className="profile-page">
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="profile-container p-4 rounded shadow">
              <div className="profile-header text-center">
                <img
                  src={profile.photo || "https://via.placeholder.com/150"}
                  alt="User Profile"
                  className="profile-img rounded-circle shadow-lg"
                />
                <h2 className="mt-3">{profile.username}</h2>
                <p className="role-badge text-black">
                  <strong>Role:</strong> <span className={`badge ${profile.role === "guide" ? "badge-primary" : "badge-success"}`}>{profile.role}</span>
                </p>
              </div>

              {/* 🟢 Tourist Profile View */}
              {profile.role === "tourist" && (
                <div className="tourist-details mt-4">
                  <h5>Tourist Information</h5>
                  <p>Email: {profile.email}</p>
                  <p>Joined on: {new Date(profile.createdAt).toLocaleDateString()}</p>
                </div>
              )}

              {/* 🔵 Guide Profile View */}
              {profile.role === "guide" && (
                <div className="guide-details mt-4">
                  <h5>Guide Information</h5>
                  <p>Email: {profile.email}</p>
                  <p>Experience: 5+ years (example)</p>
                  <p>Location: New York (example)</p>
                </div>
              )}

              <div className="text-center mt-4">
                <Button color="primary">Edit Profile</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;
