import React, { useState } from "react";
import "./form.css"; // Make sure this points to the correct CSS file
import { submitRecord } from "../../store/interactions";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"; // Import social media icons

const Form = () => {
  const provider = useSelector((state) => state.provider.connection);
  const medical = useSelector((state) => state.medical.contract);
  const account = useSelector((state) => state.provider.account);
  const dispatch = useDispatch();

  // State variables
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");

  // State for the pop-up notification
  const [showPopup, setShowPopup] = useState(false);

  // Function to display the pop-up
  const displayPopup = () => {
    setShowPopup(true);
  };

  // Function to close the pop-up
  const closePopup = () => {
    setShowPopup(false);
  };

  // Form submission handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (!account) {
      displayPopup(); // Show pop-up if wallet is not connected
      return; // Prevent submission
    }

    submitRecord(
      name,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
      provider,
      medical,
      dispatch
    );

    // Reset fields after submission
    setName("");
    setAge("");
    setGender("");
    setBloodType("");
    setAllergies("");
    setDiagnosis("");
    setTreatment("");
  };

  return (
    <div className="form-container">
      <h1>Patient Record Submission</h1>
      <form onSubmit={submitHandler} className="patient-form">
        <label htmlFor="name">Patient Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Aman Dhattarwal"
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          placeholder="29"
        />

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="bloodType">Blood Type:</label>
        <input
          type="text"
          id="bloodType"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          required
          placeholder="B positive"
        />

        <label htmlFor="allergies">Allergies:</label>
        <input
          type="text"
          id="allergies"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          required
          placeholder="Pollen allergy"
        />

        <label htmlFor="diagnosis">Diagnosis:</label>
        <input
          type="text"
          id="diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          required
          placeholder="Osteoporosis"
        />

        <label htmlFor="treatment">Treatment:</label>
        <input
          type="text"
          id="treatment"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          required
          placeholder="Surgery"
        />

        <button type="submit" className="submit-button">Submit</button>
      </form>

      {/* Pop-Up Notification */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Please connect your account to submit records.</h2>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Social Media Share Options */}
      <div className="social-share">
        <h3>Share on Social Media</h3>
        <div className="social-icons">
          <a href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} color="#3b5998" />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} color="#1DA1F2" />
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} color="#0077B5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Form;
