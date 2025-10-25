import React from "react";

const Offices = () => {
  const officeLocations = [
    { city: "New York", address: "123 Main St, NY 10001" },
    { city: "London", address: "456 Baker St, London W1" },
    { city: "Srebrenica", address: "Ulica Republike Srpske" },
    { city: "Beograd", address: "Žarkovo" },
    { city: "Novi Sad", address: "Ulica Ćirila i Metodija" },
  ];
  return (
    <div className="company">
      <div className="container">
        <h1>Offices</h1>
        <p>
          We operate globally with offices in major cities. Our international
          network enables us to provide localized support and maintain strong
          relationships with clients worldwide. Each office serves as a hub for
          collaboration, innovation, and community engagement. Our teams work
          across time zones to ensure projects are delivered on schedule while
          maintaining the highest quality standards. By fostering a connected
          and inclusive work environment, we empower our employees to contribute
          their best ideas and drive meaningful impact.
        </p>

        <h2
          style={{
            fontSize: "30px",
            fontWeight: "400",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          Our Locations:
        </h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            fontWeight: "200",
            color: "black",
            fontSize: "18px",
          }}
        >
          {officeLocations.map((office, index) => (
            <li key={index} style={{ marginBottom: "15px" }}>
              <strong>{office.city}:</strong> {office.address}
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "30px", width: "100%", height: "400px" }}>
          <iframe
            title="office-locations"
            src="https://www.google.com/maps/d/u/0/embed?mid=1T4PoAMHaDdhph8pYsEtYlx0epFE39kg&ehbc=2E312F&noprof=1"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Offices;
