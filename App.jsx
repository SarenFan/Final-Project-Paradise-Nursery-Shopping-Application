import React, { useState } from 'react';
import './App.css';
// import ProductList from './ProductList'; // You will uncomment this when you build Task 6!

function App() {
  const [started, setStarted] = useState(false);

  const handleGetStarted = () => {
    setStarted(true);
  };

  return (
    <div className="App">
      {!started ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Bring nature indoors with our beautiful houseplant collection.</p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <div className="shop-container">
          {/* Your ProductList component will render here later */}
          <h2>Welcome to the Shop! (Products coming soon)</h2>
        </div>
      )}
    </div>
  );
}

export default App;
