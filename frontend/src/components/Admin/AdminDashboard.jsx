import React, { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import "../../styles/admin-dashboard.css";
import ImageUpload from "./ImageUpload";

const AdminDashboard = () => {
  const { user } = React.useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("users"); // "users" or "tours" or "guides"
  const [users, setUsers] = useState([]);
  const [tours, setTours] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tourLoading, setTourLoading] = useState(false);
  const [guideLoading, setGuideLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedTourId, setSelectedTourId] = useState(null);
  const [guideForm, setGuideForm] = useState({
    fullName: "",
    expertise: "",
    experience: "",
    languages: "",
    location: "",
  });
  const [tourForm, setTourForm] = useState({
    title: "",
    city: "",
    address: "",
    distance: 0,
    price: 0,
    maxGroupSize: 1,
    desc: "",
    photo: "",
    featured: false,
  });
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [selectedGuideId, setSelectedGuideId] = useState(null);
  const [newGuideForm, setNewGuideForm] = useState({
    name: "",
    email: "",
    photo: "",
    location: "",
    experience: "",
    languages: "",
    pricePerHour: 0,
    availability: false,
    featured: false,
  });

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "tours") {
      fetchTours();
    } else if (activeTab === "guides") {
      fetchGuides();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = user?.token;

      const res = await fetch(`${BASE_URL}/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        setUsers(result.data);
      } else {
        console.error(result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
    setLoading(false);
  };

  const fetchTours = async () => {
    setTourLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/tours`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`,
        },
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        setTours(result.data);
      } else {
        console.error(result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (err) {
      console.error("Error fetching tours:", err);
    }
    setTourLoading(false);
  };

  const fetchGuides = async () => {
    setGuideLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/guide`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`,
        },
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        setGuides(result.data);
      } else {
        console.error(result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (err) {
      console.error("Error fetching guides:", err);
    }
    setGuideLoading(false);
  };

  // User Management Functions
  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(false);
    setGuideForm({
      fullName: "",
      expertise: "",
      experience: "",
      languages: "",
      location: "",
    });
  };

  const handleChange = (e) => {
    setGuideForm({ ...guideForm, [e.target.name]: e.target.value });
  };

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/admin/users/promote/${selectedUserId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          location: guideForm.location,
          experience: guideForm.experience,
          languages: guideForm.languages,
          photo: user?.photo || "default-profile.jpg",
          pricePerHour: 50, // Default price, you may want to add a field for this
        }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Failed to approve guide");
      }

      alert("Guide approved successfully!");
      closeModal();
      fetchUsers();  // Re-fetch users to update the list
    } catch (err) {
      console.error("Approval failed:", err);
      alert(`Approval failed: ${err.message}`);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await fetch(`${BASE_URL}/admin/users/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.token}`,
          },
          credentials: "include",
        });

        if (res.ok) {
          alert("User deleted successfully!");
          fetchUsers(); // Refresh the user list
        } else {
          const result = await res.json();
          console.error(result.message);
          alert("Failed to delete user.");
        }
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Error deleting user.");
      }
    }
  };

  const handleReject = async (userId) => {
    if (window.confirm("Are you sure you want to reject this guide?")) {
      try {
        const res = await fetch(`${BASE_URL}/admin/reject-guide/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.token}`,
          },
          credentials: "include",
        });
  
        if (res.ok) {
          alert("Guide rejected successfully!");
          fetchUsers(); // Refresh the user list
        } else {
          const result = await res.json();
          console.error(result.message);
          alert("Failed to reject guide.");
        }
      } catch (err) {
        console.error("Error rejecting guide:", err);
        alert("Error rejecting guide.");
      }
    }
  };

  // Tour Management Functions
  const openTourModal = (tourId = null) => {
    setSelectedTourId(tourId);
    if (tourId) {
      // Edit existing tour
      const tourToEdit = tours.find(tour => tour._id === tourId);
      if (tourToEdit) {
        setTourForm({
          title: tourToEdit.title || "",
          city: tourToEdit.city || "",
          address: tourToEdit.address || "",
          distance: tourToEdit.distance || 0,
          price: tourToEdit.price || 0,
          maxGroupSize: tourToEdit.maxGroupSize || 1,
          desc: tourToEdit.desc || "",
          photo: tourToEdit.photo || "",
          featured: tourToEdit.featured || false,
        });
      }
    } else {
      // New tour
      setTourForm({
        title: "",
        city: "",
        address: "",
        distance: 0,
        price: 0,
        maxGroupSize: 1,
        desc: "",
        photo: "",
        featured: false,
      });
    }
    setIsTourModalOpen(true);
  };

  const closeTourModal = () => {
    setSelectedTourId(null);
    setIsTourModalOpen(false);
    setTourForm({
      title: "",
      city: "",
      address: "",
      distance: 0,
      price: 0,
      maxGroupSize: 1,
      desc: "",
      photo: "",
      featured: false,
    });
  };

  const handleTourChange = (e) => {
    const value = e.target.type === 'checkbox' 
      ? e.target.checked 
      : e.target.type === 'number' 
        ? parseFloat(e.target.value) 
        : e.target.value;
    
    setTourForm({ ...tourForm, [e.target.name]: value });
  };

  const handleSaveTour = async (e) => {
    e.preventDefault();
    try {
      const method = selectedTourId ? "PUT" : "POST";
      const url = selectedTourId 
        ? `${BASE_URL}/tours/${selectedTourId}` 
        : `${BASE_URL}/tours`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`,
        },
        credentials: "include",
        body: JSON.stringify(tourForm),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || `Failed to ${selectedTourId ? 'update' : 'create'} tour`);
      }

      alert(`Tour ${selectedTourId ? 'updated' : 'created'} successfully!`);
      closeTourModal();
      fetchTours();  // Re-fetch tours to update the list
    } catch (err) {
      console.error(`${selectedTourId ? 'Update' : 'Creation'} failed:`, err);
      alert(`${selectedTourId ? 'Update' : 'Creation'} failed: ${err.message}`);
    }
  };

  const handleDeleteTour = async (tourId) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      try {
        const res = await fetch(`${BASE_URL}/tours/${tourId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.token}`,
          },
          credentials: "include",
        });

        if (res.ok) {
          alert("Tour deleted successfully!");
          fetchTours(); // Refresh the tour list
        } else {
          const result = await res.json();
          console.error(result.message);
          alert("Failed to delete tour.");
        }
      } catch (err) {
        console.error("Error deleting tour:", err);
        alert("Error deleting tour.");
      }
    }
  };
  
  // Guide Management Functions
  const openGuideModal = (guideId = null) => {
    setSelectedGuideId(guideId);
    if (guideId) {
      // Edit existing guide
      const guideToEdit = guides.find(guide => guide._id === guideId);
      if (guideToEdit) {
        setNewGuideForm({
          name: guideToEdit.name || "",
          email: guideToEdit.email || "",
          photo: guideToEdit.photo || "",
          location: guideToEdit.location || "",
          experience: guideToEdit.experience || "",
          languages: guideToEdit.languages || "",
          pricePerHour: guideToEdit.pricePerHour || 0,
          availability: guideToEdit.availability || false,
          featured: guideToEdit.featured || false,
        });
      }
    } else {
      // New guide
      setNewGuideForm({
        name: "",
        email: "",
        photo: "",
        location: "",
        experience: "",
        languages: "",
        pricePerHour: 0,
        availability: false,
        featured: false,
      });
    }
    setIsGuideModalOpen(true);
  };

  const closeGuideModal = () => {
    setSelectedGuideId(null);
    setIsGuideModalOpen(false);
    setNewGuideForm({
      name: "",
      email: "",
      photo: "",
      location: "",
      experience: "",
      languages: "",
      pricePerHour: 0,
      availability: false,
      featured: false,
    });
  };

  const handleGuideChange = (e) => {
    const value = e.target.type === 'checkbox' 
      ? e.target.checked 
      : e.target.type === 'number' 
        ? parseFloat(e.target.value) 
        : e.target.value;
    
    setNewGuideForm({ ...newGuideForm, [e.target.name]: value });
  };

  const handleSaveGuide = async (e) => {
    e.preventDefault();
    try {
      // Format the data to match the Guide model requirements
      const formattedData = {
        ...newGuideForm,
        // Convert languages from comma-separated string to array
        languages: newGuideForm.languages.split(',').map(lang => lang.trim()),
        // Ensure experience is a number
        experience: Number(newGuideForm.experience),
        // Ensure pricePerHour is a number
        pricePerHour: Number(newGuideForm.pricePerHour)
      };

      console.log("Submitting guide data:", formattedData);

      const method = selectedGuideId ? "PUT" : "POST";
      const url = selectedGuideId 
        ? `${BASE_URL}/guide/${selectedGuideId}` 
        : `${BASE_URL}/guide`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`,
        },
        credentials: "include",
        body: JSON.stringify(formattedData),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || `Failed to ${selectedGuideId ? 'update' : 'create'} guide`);
      }

      alert(`Guide ${selectedGuideId ? 'updated' : 'created'} successfully!`);
      closeGuideModal();
      fetchGuides();  // Re-fetch guides to update the list
    } catch (err) {
      console.error(`${selectedGuideId ? 'Update' : 'Creation'} failed:`, err);
      alert(`${selectedGuideId ? 'Update' : 'Creation'} failed: ${err.message}`);
    }
  };

  const handleDeleteGuide = async (guideId) => {
    if (window.confirm("Are you sure you want to delete this guide?")) {
      try {
        const res = await fetch(`${BASE_URL}/guide/${guideId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.token}`,
          },
          credentials: "include",
        });

        if (res.ok) {
          alert("Guide deleted successfully!");
          fetchGuides(); // Refresh the guide list
        } else {
          const result = await res.json();
          console.error(result.message);
          alert("Failed to delete guide.");
        }
      } catch (err) {
        console.error("Error deleting guide:", err);
        alert("Error deleting guide.");
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Admin Dashboard
      </h1>

      {/* Tab Navigation */}
      <div className="mb-6 flex border-b">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "users"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("users")}
        >
          User Management
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "tours"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("tours")}
        >
          Tour Management
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "guides"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("guides")}
        >
          Guide Management
        </button>
      </div>

      {/* User Management Tab */}
      {activeTab === "users" && (
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <table className="min-w-full text-left text-sm">
              <thead className="bg-blue-100 text-blue-700 uppercase">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 capitalize">{user.role}</td>
                    <td className="p-3">
                      {/* Show actions based on user role and status */}
                      {user.role === "guide" && user.status === "approved" ? (
                        <span className="text-green-600 font-semibold">Approved Guide</span>
                      ) : user.role === "guide" && user.status === "pending" ? (
                        <>
                          <button
                            onClick={() => openModal(user._id)}
                            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 mr-2"
                          >
                            Approve as Guide
                          </button>
                          <button
                            onClick={() => handleReject(user._id)}
                            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      ) : null}

                      {/* Show Delete option for everyone */}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Tour Management Tab */}
      {activeTab === "tours" && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Tour List</h2>
            <button
              onClick={() => openTourModal()}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add New Tour
            </button>
          </div>

          {tourLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-blue-100 text-blue-700 uppercase">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Featured</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tours.map((tour) => (
                    <tr key={tour._id}>
                      <td className="p-3">{tour.title}</td>
                      <td className="p-3">{tour.city}</td>
                      <td className="p-3">${tour.price}</td>
                      <td className="p-3">
                        {tour.featured ? (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Yes</span>
                        ) : (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">No</span>
                        )}
                      </td>
                      <td className="p-3 flex space-x-2">
                        <button
                          onClick={() => openTourModal(tour._id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTour(tour._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Guide Management Tab */}
      {activeTab === "guides" && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Guide List</h2>
            <button
              onClick={() => openGuideModal()}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add New Guide
            </button>
          </div>

          {guideLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-blue-100 text-blue-700 uppercase">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Price/Hour</th>
                    <th className="p-3">Experience</th>
                    <th className="p-3">Available</th>
                    <th className="p-3">Featured</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Array.isArray(guides) && guides.length > 0 ? guides.map((guide) => (
                    <tr key={guide._id}>
                      <td className="p-3">{guide.name}</td>
                      <td className="p-3">{guide.location}</td>
                      <td className="p-3">${guide.pricePerHour}</td>
                      <td className="p-3">{guide.experience}</td>
                      <td className="p-3">
                        {guide.availability ? (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Yes</span>
                        ) : (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded">No</span>
                        )}
                      </td>
                      <td className="p-3">
                        {guide.featured ? (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Yes</span>
                        ) : (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">No</span>
                        )}
                      </td>
                      <td className="p-3 flex space-x-2">
                        <button
                          onClick={() => openGuideModal(guide._id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteGuide(guide._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="p-3 text-center text-gray-500">
                        No guides found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Guide Approval Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-blue-600">
              Approve User as Guide
            </h2>
            <form onSubmit={handleApprove} className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={guideForm.fullName}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="expertise"
                placeholder="Expertise"
                value={guideForm.expertise}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="number"
                name="experience"
                placeholder="Years of Experience"
                value={guideForm.experience}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="languages"
                placeholder="Languages Known"
                value={guideForm.languages}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={guideForm.location}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Approve
                </button>
              </div>
            </form>
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Tour Modal */}
      {isTourModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4 text-blue-600">
              {selectedTourId ? "Edit Tour" : "Add New Tour"}
            </h2>
            <form onSubmit={handleSaveTour} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Tour Title"
                    value={tourForm.title}
                    onChange={handleTourChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={tourForm.city}
                    onChange={handleTourChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={tourForm.address}
                    onChange={handleTourChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Distance (km)
                  </label>
                  <input
                    type="number"
                    name="distance"
                    placeholder="Distance"
                    value={tourForm.distance}
                    onChange={handleTourChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={tourForm.price}
                    onChange={handleTourChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Max Group Size
                  </label>
                  <input
                    type="number"
                    name="maxGroupSize"
                    placeholder="Max Group Size"
                    value={tourForm.maxGroupSize}
                    onChange={handleTourChange}
                    required
                    min="1"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Photo
                  </label>
                  {console.log("Rendering tour photo input, photo value:", tourForm.photo)}
                  {tourForm.photo ? (
                    <div className="mb-2">
                      <img 
                        src={tourForm.photo} 
                        alt="Tour" 
                        className="w-32 h-32 object-cover border border-gray-300 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => setTourForm({...tourForm, photo: ""})}
                        className="text-red-600 text-sm mt-1 underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <ImageUpload 
                        onImageUploaded={(url) => setTourForm({...tourForm, photo: url})}
                        entityId={selectedTourId || user?._id}
                      />
                      <button
                        type="button"
                        onClick={() => setTourForm({...tourForm, photo: "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1746206868~exp=1746210468~hmac=608cb4a1a3418c165e30a71a2dffe3495fcfde6b7c85012678cd2ae7489f6d20&w=740"})}
                        className="mt-2 bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 text-xs"
                      >
                        Debug: Use Sample Image
                      </button>
                    </>
                  )}
                </div>
                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={tourForm.featured}
                    onChange={handleTourChange}
                    className="mr-2"
                  />
                  <label className="text-gray-700 font-medium">
                    Featured Tour
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="desc"
                  placeholder="Tour Description"
                  value={tourForm.desc}
                  onChange={handleTourChange}
                  required
                  rows="4"
                  className="w-full border rounded px-3 py-2"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={closeTourModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {selectedTourId ? "Update Tour" : "Create Tour"}
                </button>
              </div>
            </form>
            <button
              onClick={closeTourModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4 text-blue-600">
              {selectedGuideId ? "Edit Guide" : "Add New Guide"}
            </h2>
            <form onSubmit={handleSaveGuide} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Guide Name"
                    value={newGuideForm.name}
                    onChange={handleGuideChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={newGuideForm.email}
                    onChange={handleGuideChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Photo
                  </label>
                  {console.log("Rendering guide photo input, photo value:", newGuideForm.photo)}
                  {newGuideForm.photo ? (
                    <div className="mb-2">
                      <img 
                        src={newGuideForm.photo} 
                        alt="Guide" 
                        className="w-32 h-32 object-cover border border-gray-300 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => setNewGuideForm({...newGuideForm, photo: ""})}
                        className="text-red-600 text-sm mt-1 underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <ImageUpload 
                        onImageUploaded={(url) => setNewGuideForm({...newGuideForm, photo: url})}
                        entityId={selectedGuideId || user?._id}
                      />
                      <button
                        type="button"
                        onClick={() => setNewGuideForm({...newGuideForm, photo: "https://res.cloudinary.com/dfyzqizpt/image/upload/v1689542387/uploads/sample.jpg"})}
                        className="mt-2 bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 text-xs"
                      >
                        Debug: Use Sample Image
                      </button>
                    </>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={newGuideForm.location}
                    onChange={handleGuideChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    placeholder="Years of experience"
                    value={newGuideForm.experience}
                    onChange={handleGuideChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Languages (comma separated)
                  </label>
                  <input
                    type="text"
                    name="languages"
                    placeholder="English, French, Spanish"
                    value={newGuideForm.languages}
                    onChange={handleGuideChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Price Per Hour ($)
                  </label>
                  <input
                    type="number"
                    name="pricePerHour"
                    placeholder="Price per hour"
                    value={newGuideForm.pricePerHour}
                    onChange={handleGuideChange}
                    required
                    min="1"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={newGuideForm.availability}
                    onChange={handleGuideChange}
                    className="mr-2"
                  />
                  <label className="text-gray-700 font-medium">
                    Available for Booking
                  </label>
                </div>
                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={newGuideForm.featured}
                    onChange={handleGuideChange}
                    className="mr-2"
                  />
                  <label className="text-gray-700 font-medium">
                    Featured Guide
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={closeGuideModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {selectedGuideId ? "Update Guide" : "Create Guide"}
                </button>
              </div>
            </form>
            <button
              onClick={closeGuideModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
