import { useState } from "react";
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="form">
      <p className="title gradient-text">Contact Form</p>
      <p className="message ">Signup now and get full access to our app.</p>
      
      <div className="flex">
        <label>
          <input 
            required 
            type="text" 
            name="firstname" 
            value={formData.firstname} 
            onChange={handleChange} 
            className="input"
            placeholder=" "
          />
          <span>Firstname</span>
        </label>
        
        <label>
          <input 
            required 
            type="text" 
            name="lastname" 
            value={formData.lastname} 
            onChange={handleChange} 
            className="input"
            placeholder=" "
          />
          <span>Lastname</span>
        </label>
      </div>
      
      <label>
        <input 
          required 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          className="input"
          placeholder=" "
        />
        <span>Email</span>
      </label>
      
      {/* <label>
        <input 
          required 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          className="input"
          placeholder=" "
        />
        <span>Password</span>
      </label>
       */}
      <label>
        <textarea
          type="message" 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          className="input"
          placeholder="Message"
        />
      </label>
      
      <button className="submit mx-auto">
        Submit
      </button>
      
      {/* <p className="signin">
        Already have an account? <a href="#">Sign in</a>
      </p> */}
    </form>
  );
};

export default ContactForm;