import React from "react";

function Footer() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        color: "white",
      }}
      className="footer"
    >
      <br />
      <p>
        <span style={{ color: "blue" }}>Privacy Policy</span> | © 2022
        Highradius Corporation. All Rights Reserved.
      </p>
      <br />
    </div>
  );
}

export default Footer;
