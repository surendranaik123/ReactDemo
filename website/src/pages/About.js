import Navbar from "../components/Navbar";
import  '../css/about.css';
import Team1 from "../assets/team1.jpg";
import Team2 from "../assets/team2.jpg";
import Team3 from "../assets/team3.jpg";

const About = () => {
  return (
    <>
    <Navbar/>
      <div className="about-section">
        <h1 style={{fontSize:"2rem",textAlign:"center",marginBottom:"10px"}}>About Us Page</h1>
        <h2 style={{fontSize:"1.2rem",textAlign:"center",marginBottom:"10px"}}>Some text about who we are and what we do.</h2>
        <h2  style={{fontSize:"1.2rem",textAlign:"center",marginBottom:"10px"}}>Resize the browser window to see that this page is responsive by the way.</h2>
      </div>
      <div className="row">
        <div className="column">
          <div className="card">
            <img src={Team1} alt="Jane" className="images" />
            <div className="container">
              <h2  style={{fontSize:"1.6rem",textAlign:"center",marginBottom:"10px",marginTop:"10px"}}>Jane Doe</h2>
              <p className="title"  style={{fontSize:"1.3rem",textAlign:"center",marginBottom:"10px"}}>CEO & Founder</p>
              <p  style={{fontSize:"1.2rem",textAlign:"center",marginBottom:"10px"}}>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p  style={{fontSize:"1.2rem",textAlign:"center",marginBottom:"10px"}}>jane@example.com</p>
              <p  style={{fontSize:"1.2rem",textAlign:"center"}}><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={Team2} alt="Mike" className="images" />
            <div className="container">
              <h2 style={{fontSize:"1.6rem",textAlign:"center",marginBottom:"10px",marginTop:"10px"}}>Mike Ross</h2>
              <p className="title" style={{fontSize:"1.3rem",textAlign:"center",marginBottom:"10px"}}>Art Director</p>
              <p style={{fontSize:"1.2rem",textAlign:"center",marginBottom:"10px"}}> Some text that describes me lorem ipsum ipsum lorem.</p>
              <p style={{fontSize:"1.2rem",textAlign:"center",marginBottom:"10px"}}>mike@example.com</p>
              <p style={{fontSize:"1.2rem",textAlign:"center"}}><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={Team3} alt="John" className="images" />
            <div className="container">
              <h2 style={{fontSize:"1.6rem",textAlign:"center",marginBottom:"10px",marginTop:"10px"}}>John Doe</h2>
              <p className="title" style={{fontSize:"1.3rem",textAlign:"center",marginBottom:"10px"}}>Designer</p>
              <p style={{fontSize:"1.2rem",textAlign:"center",marginBottom:"10px"}}>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p style={{fontSize:"1.2rem",textAlign:"center",marginBottom:"10px"}}>john@example.com</p>
              <p style={{fontSize:"1.2rem",textAlign:"center",marginBottom:"10px"}}><button className="button">Contact</button></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;  