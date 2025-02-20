import React, { useState } from "react";
import "./App.css";
import ParadiseNursery from "./ParadiseNursery";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutUs from "./AboutUs";

function App() {
  const [showPlants, setShowPlants] = useState(false);

  const handleGetStarted = () => {
    setShowPlants(true);
  };

  return (
    <>
      <header className="first_page">
        <div className="main_event">
          <div className="first_page_name_btn">
            <h1 className="budget_heading">Welcome to CWB Houseplants</h1>
            <p className="budget_sentence">Transform your home with plants!</p>
            <div className="getstarted_btn">
              <button onClick={() => handleGetStarted()} className="get-started-btn">
                Get Started
              </button>
            </div>
          </div>
          <div className="aboutus_main">
            <AboutUs />
          </div>
        </div>
      </header>

      <div className={`event-list-container ${showPlants ? 'visible' : ''}`}>
        <ParadiseNursery />
      </div>
    </>
  );
}

export default App;
