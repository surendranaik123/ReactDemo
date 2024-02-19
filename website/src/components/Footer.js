import React from 'react';
/* src/index.css or src/App.css */
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faGithub, faDribbble } from '@fortawesome/free-brands-svg-icons';

// const iconStyle = {
//   fontSize: "2px", // Adjust the font size as needed
//   marginRight: "10px", // Add some spacing between icons
//   textDecoration: "none",
//   color: "#fff" // Set the icon color to white
// };

const footerTextStyle = {
  marginBottom: "15px",
  fontFamily: "Arial",
  fontSize: "18px" // Adjust the font size as needed
};
const footerText = {
  textDecoration: "none",
  fontFamily: "Arial",
  fontSize: "15px",
  borderRadius: "8px",
  marginBottom: "10px", // You can adjust the value as needed
};
 
const Footer = () => {
  return (
    <footer className="bg-dark text-light">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-2">
            <h3 className="text-uppercase" style={footerTextStyle}>SHOP</h3>
            <ul className="list-unstyled">
              <li style={{ marginBottom: "10px" }}>
                <a href="/" className="text-green" style={footerText}> By Category</a>
              </li>

              <li style={{ marginBottom: "10px" }}>
                <a href="/" className="text-light" style={footerText}>Mens</a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="/" className="text-light" style={footerText}>Womens</a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="/" className="text-light" style={footerText}>Kids</a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="/" className="text-light" style={footerText}>Classics</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h3 className="text-uppercase" style={footerTextStyle}>Company</h3>
            <ul className="list-unstyled">
              <li style={{ marginBottom: "10px" }}>
                <a href="/" className="text-light" style={footerText}>Customer Service </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="/" className="text-light" style={footerText}>Terms of Use</a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="/" className="text-light" style={footerText}>Priveacy</a>
              </li >
              <li style={{ marginBottom: "10px" }}>
                <a href="/" className="text-light" style={footerText}>Careers</a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="/" className="text-light" style={footerText}>About</a>
              </li>

              <li style={{ marginBottom: "10px" }}>
                <a href="/" className="text-light" style={footerText}>CA Supply Chains Act</a>
              </li >
              <li style={{ marginBottom: "10px" }}>
                <a href="/" className="text-light" style={footerText}>Sustainabillity</a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a href="/" className="text-light" style={footerText}>Affillites</a>
              </li>
              <li>
                <a href="/" className="text-light" style={footerText}>Recall Info</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h3 className="text-uppercase" style={footerTextStyle}>CONTACT</h3>
            <ul className="list-unstyled">
              <li style={{ marginBottom: "10px" }}>
                <div>
                <a href="/" className="text-blue" style={footerText}>Email</a>
                </div>
                <div>
                <a href="/" className="text-light" style={footerText}>Contact us</a>
                </div>
              </li>
            

              <li style={{ marginBottom: "10px" }}>
              <div>
                <a href="/" className="text-blue" style={footerText}>TelePhone</a>
                </div>
                <div> <a href="/" className="text-light" style={footerText}>9652497327</a></div>
              </li>
             

              <li style={{ marginBottom: "10px" }}>
              <div>
                <a href="/" className="text-blue" style={footerText}>Address</a>
                </div>
                <div><a href="/" className="text-light" style={footerText}>3/31/1, M.m.t ,Knl,A.p,Pincode:518380</a></div>
              </li>
              

              <li style={{ marginBottom: "10px" }}>
              <div>
                <a href="/" className="text-blue" style={footerText}>Hours</a>
                </div>
                <div><a href="/" className="text-light" style={footerText}>M-F:6.00am -8.00pm</a></div>
              </li>
              
            </ul>
          </div>
          <div className="col-md-4">
            <h3 className="text-uppercase" style={footerTextStyle}>Subscribe to our newsletter</h3>
            <p style={footerText}>The latest news, articles, and resources, sent to your inbox weekly.</p>
            <form className="form-inline">
              <input type="email" name="emailAddress" id="emailAddress" autoComplete="email" required
                style={{ fontFamily: "Arial", fontSize: "14px", padding: "10px", borderRadius: "8px", }}
                placeholder="Enter your email" />
              <button type="submit" className="btn btn-primary" style={{ fontFamily: "Arial", fontSize: "14px", marginLeft: "200px",marginTop:"-40px",border:"2px solid white" ,color:"white",width:"90px",height:"40px"}}>Subscribe</button>
            </form>


          </div>

        </div>
      </div>


      <div className="container mt-0 border-top border-light" style={{ marginTop: "-3000px" }}>
  <div className="row" style={{ paddingBottom: "50px" }}>

    {/* Copyright text */}
    <div className="col-md-6 col-12 text-center text-md-left mb-3">
      <p style={{ fontFamily: "Arial", fontSize: "20px", margin: 0 }}>
        &copy; 2023 Training, Inc. All rights reserved.
      </p>
    </div>

    {/* Social icons */}
    <div className="col-md-6 col-12 d-flex justify-content-center justify-content-md-end">
      <div className="social-icons">
        <a href="https://www.facebook.com/" className="text-light mr-3">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://www.instagram.com/accounts/login/?hl=en" className="text-light mr-3">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://twitter.com/" className="text-light mr-3">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://github.com/Akash-Traveller/Training-Proj" className="text-light mr-3">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        <a href="https://www.google.com/" className="text-light mr-3">
          <FontAwesomeIcon icon={faDribbble} size="2x" />
        </a>
      </div>
    </div>

  </div>
</div>

    
    </footer>
  );
}

export default Footer