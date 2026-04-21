import Navbar from "./Navbar";

function MainContent() {
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  return (
    <div className="main">
      <Navbar />
      <h1>{getGreeting()}</h1>
      </div>
  );
}

export default MainContent;







