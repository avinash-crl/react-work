import React, { useEffect, useState } from "react";
import "./App.css";

const Avinash = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        const users = await response.json();
        setData(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h2>Loading user details...</h2>;
  }

  return (
    <div className="page-container">
      {data.map((item, index) => (
        <div className="a4-sheet" key={item.id}>
          <h1>PERSONAL INFORMATION FORM</h1>
          <p className="form-subtitle">
            User Registration Details
          </p>

          <hr />

          <div className="section-title">PERSONAL DETAILS</div>

          <div className="field">
            <label>Serial Number:</label>
            <span>{index + 1}</span>
          </div>

          <div className="field">
            <label>Full Name:</label>
            <span>{item.name}</span>
          </div>

          <div className="field">
            <label>Username:</label>
            <span>{item.username}</span>
          </div>

          <div className="field">
            <label>Email Address:</label>
            <span>{item.email}</span>
          </div>

          <div className="field">
            <label>Phone Number:</label>
            <span>{item.phone}</span>
          </div>

          <div className="field">
            <label>Website:</label>
            <span>{item.website}</span>
          </div>

          <div className="section-title">ADDRESS DETAILS</div>

          <div className="field">
            <label>Street:</label>
            <span>{item.address.street}</span>
          </div>

          <div className="field">
            <label>Suite:</label>
            <span>{item.address.suite}</span>
          </div>

          <div className="field">
            <label>City:</label>
            <span>{item.address.city}</span>
          </div>

          <div className="field">
            <label>Zip Code:</label>
            <span>{item.address.zipcode}</span>
          </div>

          <div className="section-title">COMPANY DETAILS</div>

          <div className="field">
            <label>Company Name:</label>
            <span>{item.company.name}</span>
          </div>

          <div className="field">
            <label>Business:</label>
            <span>{item.company.catchPhrase}</span>
          </div>

          <div className="field">
            <label>Business Strategy:</label>
            <span>{item.company.bs}</span>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Avinash;