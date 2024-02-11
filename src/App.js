import React, { useState } from 'react';
import './App.css';

function App() {
  const [startDiagnosis, setStartDiagnosis] = useState(false);

  const gradientStyle = {
    background: 'linear-gradient(to right, #081F2F, #0E4648, #081F2F)',
  };

  const handleStartClick = () => {
    setStartDiagnosis(true);
  };

  const handleExitClick = () => {
    setStartDiagnosis(false);
  };

  if (startDiagnosis) {
    return (
      <div style={gradientStyle} className="flex flex-col h-screen text-white">
        {/* Header with centered text and exit button */}
        <div className="flex justify-between items-center w-full p-4">
          <div className="w-40" /> {/* Invisible spacer to balance the exit button */}
          <span className="text-center font-Raleway font-light text-xl mt-4">Initiate conversation...</span>
          <button onClick={handleExitClick} className="font-Raleway text-xl mt-4 mr-4">
            Exit diagnosis ✖
          </button>
        </div>
        
        {/* Main content */}
        <div className="flex-grow flex flex-col items-center justify-center space-y-4 p-4">
          {/* Flex container for microphone and input */}
          <div className="flex items-center space-x-4">
            {/* Microphone icon */}
            <button className="text-xl mb-6">🎤</button>

            {/* Input field */}
            <input
              type="text"
              placeholder="Ask a question..."
              className="w-full mx-4 px-2 py-2 rounded-xl text-md mb-6 font-Raleway text-white"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            />
          </div>

          {/* Finish conversation button */}
          <button
            className="bg-[#15C99B] text-[#0A2735] font-Raleway font-bold text-lg py-4 px-8 rounded-xl hover:bg-teal-700 transition-colors duration-300"
          >
            Finish Conversation
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div style={gradientStyle} className="flex flex-col h-screen text-white p-4">
        {/* Header at the top but centered horizontally */}
        <header className="flex justify-center items-center w-full py-4">
          <h1 className="font-Raleway text-2xl font-bold">
            DiagnoSys
          </h1>
        </header>
  
        {/* Rest of the content centered vertically and horizontally */}
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <p className="font-Raleway mb-12 text-2xl">
            Diagnose with Precision: Engage with Lifelike AI Patients
            <br />
            and Gain In-depth Feedback for Expert Training.
          </p>
          <button
          onClick={handleStartClick}
          className="font-Raleway text-[#0A2735] font-bold text-lg py-4 px-8 rounded-xl hover:bg-teal-700 transition-colors duration-300"
          style={{ backgroundColor: '#15C99B' }}
        >
          Begin patient diagnosis
        </button>
        </div>
      </div>
    );
  }
}

export default App;
