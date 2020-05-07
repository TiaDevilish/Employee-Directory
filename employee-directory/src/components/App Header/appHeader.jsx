import React from "react";
function AppHeader() {
  return (
    <div
      style={{
        backgroundColor: "#02082E",
        borderBottom: "10px solid #BB190F",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        padding: "1%",
      }}
      className="container-fluid"
    >
    
      <h1 className="display-4" style={{ color: "white" }}>
        Employee Directory
      </h1>
      <p className="lead" style={{ color: "white" }}>
        Quickly navigate employee data
      </p>
    </div>
  );
}
export default AppHeader;