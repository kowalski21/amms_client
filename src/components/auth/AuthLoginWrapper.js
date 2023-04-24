import React from "react";

const AuthLoginWrapper = ({ children }) => {
  return (
    <section className="vh-100" style={{ backgroundColor: "dark" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={`/amms/auth_image_2.jpeg`}
                    // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid h-100 bg_overlay"
                    style={{
                      borderRadius: "1rem 0 0 1rem",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <div className="row">
                      <div className="col text-center">
                        <img
                          src={`/amms/main.jpg`}
                          className="text-center mb-4"
                          alt=""
                          style={{
                            height: "80px",
                            width: "80px",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-3 pb-1">
                      <br />
                      <span className="h3 fw-bold mb-0">
                        AMMS- PENTECOST HOSPITAL - TARKWA
                      </span>
                      {/* <span className="h4 text-center">AMMS</span> */}
                    </div>
                    <h5 className="fw-normal mb-3 text-uppercase text-muted text-center pb-3">
                      Sign into your account
                    </h5>
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLoginWrapper;
