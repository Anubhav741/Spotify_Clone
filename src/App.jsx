import Sidebar from "./Components/Sidebar";
import MainContent from "./Components/MainContent";


function App() {
  return (
    <div className="app-container" id="app">
      
      <div className="premium-banner" id="premium-banner">
        <div className="premium-banner__text">
          <span className="premium-banner__label">Preview of Spotify</span>
          <span className="premium-banner__title">
            Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
          </span>
        </div>
        <button className="premium-banner__cta" id="signup-free-btn">Sign up free</button>
      </div>

      <div className="app-body">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

export default App;