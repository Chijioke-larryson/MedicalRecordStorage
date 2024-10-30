import React, { useState } from "react";
import "./data.css";
import { dataBookSelector } from "../../store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../store/interactions";

const Data = () => {
  const orderData = useSelector(dataBookSelector);
  const account = useSelector((state) => state.provider.account);
  const provider = useSelector((state) => state.provider.connection);
  const medical = useSelector((state) => state.medical.contract);
  const dispatch = useDispatch();

  // State for search keyword
  const [searchKeyword, setSearchKeyword] = useState("");
  
  // State for sharing department
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const deleteHandler = (e, data) => {
    if (window.confirm("Do you want to delete the record?")) {
      deleteData(medical, data.recordId, dispatch, provider);
    } else {
      console.log("Data not deleted");
    }
  };

  const shareRecordHandler = (data) => {
    if (selectedDepartment) {
      // Logic to share the record
      console.log(`Sharing record ${data.recordId} with ${selectedDepartment}`);
    } else {
      alert("Please select a department to share the record.");
    }
  };

  // Filter records based on the search keyword
  const filteredData = orderData.filter((data) => 
    data.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>
      {account ? (
        <div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button className="search-button">🔍</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Date and Time</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Blood Type</th>
                <th>Allergies</th>
                <th>Diagnosis</th>
                <th>Treatment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData && filteredData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.formattedTimestamp}</td>
                    <td>{data.name}</td>
                    <td>{data.ageNew}</td>
                    <td>{data.gender}</td>
                    <td>{data.bloodType}</td>
                    <td>{data.allergies}</td>
                    <td>{data.diagnosis}</td>
                    <td>{data.treatment}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={(e) => deleteHandler(e, data)}
                      >
                        Delete
                      </button>
                      <div className="share-container">
                        <select
                          value={selectedDepartment}
                          onChange={(e) => setSelectedDepartment(e.target.value)}
                        >
                          <option value="">Share with...</option>
                          <option value="doctor">Doctor</option>
                          <option value="nurse">Nurse</option>
                          <option value="admin">Admin</option>
                          {/* Add more departments as needed */}
                        </select>
                        <button onClick={() => shareRecordHandler(data)}>Share</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="center-message">Connect the account</h1>
      )}
    </div>
  );
};

export default Data;




