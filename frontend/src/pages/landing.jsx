// import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// import App.css
import '../App.css'

function LandingPage() {

  const router = useNavigate();

  const handleGuestJoin = () => {
    const guestRoomId = `guest-${Date.now()}`;
    router(`/${guestRoomId}`);
  };

  return (
    <div className='landingPageContainer'>
      <nav>
        <div className="navHeader">
          <h2>Apna video call</h2>
        </div>
        <div className="navlist">
          <p onClick={handleGuestJoin}>Join as Guests</p>
          <p onClick={() => { router("/auth") }}>Register</p>
          <div className="button">
            <p onClick={() => { router("/auth") }}>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>
          <p>Cover a distance by Apna Video Call</p>
          <div role='button'>
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div>

          <img src="/mobile.png" alt="" />

        </div>
      </div>
    </div>
  )
}

export default LandingPage