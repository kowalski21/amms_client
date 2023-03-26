import React from "react";

const AppContent = ({ children }) => {
  return (
    <main className="main-content">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default AppContent;
