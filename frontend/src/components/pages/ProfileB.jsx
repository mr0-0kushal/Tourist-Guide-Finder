import React, { useState, useContext } from 'react';
import "../../styles/profile.css";
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from "../../utils/config";

// Optional: If you use a Toast library like react-toastify, import it here
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const ProfileB = () => {
  const { user, dispatch } = useContext(AuthContext);  // Access dispatch from context
  console.log("User: ",user)
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(""); // 🔔 For custom popup

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showPopup = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2500); // Auto-dismiss after 2.5s
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
  
      const updatedUser = await response.json();
      console.log("Profile updated:", updatedUser);
  
      // Update the local state with the updated user info
      setFormData(prev => ({
        ...prev,
        username: updatedUser.username,
        location: updatedUser.location,
        photo: updatedUser.photo, // Include photo if updated
      }));
  
      // Dispatch an action to update the user in the context
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { ...user, ...formData }  // or updatedUser if it's the complete object
      });
      
  
      setIsEditing(false);
      showPopup("✅ Profile updated successfully!");
    } catch (error) {
      console.error(error.message);
      showPopup("❌ Failed to update profile.");
    }
  };
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!image) return;

    const formDataToSend = new FormData();
    formDataToSend.append('file', image);

    try {
      const res = await fetch(`${BASE_URL}/upload/${user._id}`, {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend,
      });

      if (!res.ok) throw new Error('Failed to upload image');

      const data = await res.json();
      console.log('Image uploaded:', data);

      setFormData(prev => ({
        ...prev,
        photo: data.url,
      }));

      // Dispatch an action to update the user in the context after uploading the image
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { ...user, photo: data.url }
      });

      showPopup("📸 Image uploaded successfully!");
    } catch (error) {
      console.error(error.message);
      showPopup("❌ Failed to upload image.");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container w-full">

        {/* 🔔 Custom Popup Message */}
        {message && (
          <div className="popup fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50">
            {message}
          </div>
        )}

        {/* Profile Header */}
        <div className="profile-header flex flex-col items-center w-full">
          <img
            src={formData.photo}
            alt="Profile"
            className="profile-img"
          />
          <h2>{formData.username}</h2>
          <div className="role-badge">
            <span className={`badge ${user.role === "tourist" ? "badge-primary" : "badge-success"}`}>
              {user.role}
            </span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <h5>UserName</h5>
          {isEditing ? (
            <textarea
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          ) : (
            <p>{formData.username || "No information provided."}</p>
          )}

          <h5 className="mt-4">Location</h5>
          {isEditing ? (
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          ) : (
            <p>{formData.location || "Location not specified."}</p>
          )}

          {user.status && (
            <>
              <h5 className="mt-4">Status</h5>
              <p>{user.status}</p>
            </>
          )}
        </div>
        <>
          <h5 className="mt-4">Role </h5>
          <p>{user.role}</p>
        </>

        {/* Image Upload */}
        {isEditing && (
          <div className="image-upload mt-4">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && <button onClick={handleImageUpload} className="btn upload-btn mt-2">Upload Image</button>}
          </div>
        )}

        {/* Actions */}
        <div className="text-center mt-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="btn save-btn mr-2">Save</button>
              <button onClick={() => setIsEditing(false)} className="btn cancel-btn">Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn edit-btn">Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileB;
