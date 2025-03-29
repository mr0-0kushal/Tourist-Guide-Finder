import React, { useEffect, useState, useContext } from "react"; 
import { Container, Row, Col, Table, Button, Spinner, Badge } from "reactstrap";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import "../../styles/admin-dashboard.css";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch All Users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/admin/users`, {
          method: "GET",
          headers: { "content-type": "application/json" },
          credentials: "include",
        });

        const result = await res.json();
        if (res.ok) {
          setUsers(result.data);
        } else {
          console.error(result.message);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
      setLoading(false);
    };

    if (user.role === "admin") fetchUsers(); // Fetch only if admin
  }, [user]);
  const fetchGuides = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/guides`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Ensure backend supports credentials
      });
  
      const result = await res.json();
      if (res.ok) {
        setGuides(result.data);
      } else {
        console.error("Error fetching guides:", result.message);
      }
    } catch (err) {
      console.error("Error fetching guides:", err);
    }
    setLoading(false);
  };
  
  // ✅ Fetch guides when component mounts or user changes
  useEffect(() => {
    if (user && user.role === "admin") {
      fetchGuides();
    }
  }, [user]);
  
  // ✅ Now `fetchGuides` is accessible here
  const handleApproveGuide = async (id) => {
    const name = prompt("Enter guide's name:");
    const location = prompt("Enter guide's location:");
    const experience = prompt("Enter years of experience:");
    const languages = prompt("Enter languages spoken (comma separated):");
    const photo = prompt("Enter guide's photo URL:");
    const pricePerHour = prompt("Enter guide's hourly price:");
  
    if (!name || !location || !experience || !languages || !photo || !pricePerHour) {
      alert("All fields are required!");
      return;
    }
  
    try {
      const res = await fetch(`${BASE_URL}/admin/users/promote/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name,
          location,
          experience: Number(experience),
          languages: languages.split(",").map((lang) => lang.trim()),
          photo,
          pricePerHour: Number(pricePerHour),
        }),
      });
  
      const result = await res.json();
      if (res.ok) {
        alert("User successfully promoted to Guide!");
        
        // ✅ Now this will work because `fetchGuides` is accessible
        fetchGuides();
      } else {
        alert("Failed to approve guide: " + result.message);
      }
    } catch (err) {
      console.error("Error approving guide:", err);
    }
  };
  
  

  // ✅ Reject Guide
  const handleRejectGuide = async (id) => {
    if (!window.confirm("Are you sure you want to reject this guide?")) return;

    try {
      const res = await fetch(`${BASE_URL}/admin/users/reject/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        alert("User rejected as guide!");
        setUsers(users.map((u) => (u._id === id ? { ...u, status: "rejected" } : u))); // Update UI
      } else {
        alert("Failed to reject guide: " + result.message);
      }
    } catch (err) {
      console.error("Error rejecting guide:", err);
    }
  };

  // ✅ Delete Guide
  const handleDeleteGuide = async (id) => {
    if (!window.confirm("Are you sure you want to delete this guide?")) return;

    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        setGuides((prevGuides) => prevGuides.filter((g) => g._id !== id));   // Update UI
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error("Error deleting guide:", err);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg="10" className="m-auto">
          <h2 className="text-center mb-4">Admin Dashboard</h2>

          {/* ✅ USERS MANAGEMENT */}
          <h4 className="mt-4">Manage Users</h4>
          {loading ? (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          ) : (
            <Table bordered striped className="shadow-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <Badge color={user.role === "guide" ? "primary" : "success"}>
                          {user.role}
                        </Badge>
                      </td>
                      <td>
                        <Badge color={
                          user.status === "pending" ? "warning" :
                          user.status === "approved" ? "success" :
                          "danger"
                        }>
                          {user.status}
                        </Badge>
                      </td>
                      <td>
                        {user.role === "guide" && user.status === "pending" && (
                          <>
                            <Button color="primary" size="sm" onClick={() => handleApproveGuide(user._id)}>
                              Approve
                            </Button>{" "}
                            <Button color="warning" size="sm" onClick={() => handleRejectGuide(user._id)}>
                              Reject
                            </Button>
                          </>
                        )}
                        &nbsp;
                        <Button color="danger" size="sm" onClick={() => handleDeleteGuide(user._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No users found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}

          {/* ✅ GUIDES MANAGEMENT */}
          <h4 className="mt-4">Manage Guides</h4>
          {loading ? (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          ) : (
            <Table bordered striped className="shadow-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Guide Name</th>
                  <th>Email</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {guides.length > 0 ? (
                  guides.map((guide, index) => (
                    <tr key={guide._id}>
                      <td>{index + 1}</td>
                      <td>{guide.name}</td>
                      <td>{guide.email}</td>
                      <td>{guide.experience || "Not provided"}</td>
                      <td>
                        <Badge color={
                          guide.status === "pending" ? "warning" :
                          guide.status === "approved" ? "success" :
                          "danger"
                        }>
                          {guide.status}
                        </Badge>
                      </td>
                      <td>
                        <Button color="danger" size="sm" onClick={() => handleDeleteGuide(guide._id)}>
                          Delete Guide
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No guides found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
