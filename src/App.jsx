import { useState } from "react";

// Mock flight deals
const mockDeals = [
  { destination: "Mexico City", currentPrice: 180, averagePrice: 450, percentCheaper: 60 },
  { destination: "Tokyo", currentPrice: 520, averagePrice: 900, percentCheaper: 42 },
  { destination: "Paris", currentPrice: 610, averagePrice: 880, percentCheaper: 31 },
];

function App() {
  // States
  const [origin, setOrigin] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [deals, setDeals] = useState([]);

  // Handler for scanning deals
  const handleScan = () => {
    if (!origin || !email) {
      alert("Please enter both origin city and email!");
      return;
    }

    setLoading(true);
    setDeals([]); // clear previous results

    console.log("User input:", { origin, email });

    // Simulate async fetch
    setTimeout(() => {
      setDeals(mockDeals); // just show all mock deals
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // vertical centering
    alignItems: "center",     // horizontal centering
    minHeight: "100vh",       // full viewport height
    width: "100vw",            // full viewport width
    boxSizing: "border-box",   // ensures padding doesn’t push it
    fontFamily: "sans-serif",
    padding: "2rem",
  }}>
      {/* Header */}
      <h1>FlightScanner</h1>
      <p>Let cheap flights choose your next adventure.</p>

      {/* Form */}
      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <label>
          Origin City:{" "}
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="e.g. Vancouver"
            style={{ padding: "0.3rem", marginRight: "1rem" }}
          />
        </label>

        <label>
          Email:{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ padding: "0.3rem", marginRight: "1rem" }}
          />
        </label>
      </div>

      {/* Scan Deals Button */}
      <button
        onClick={handleScan}
        style={{ padding: "0.5rem 1rem", fontSize: "1rem", marginTop: "0.5rem" }}
      >
        Scan Deals
      </button>

      {/* Loading State */}
      {loading && <p style={{ marginTop: "1rem" }}>Scanning flight prices… ✈️</p>}

      {/* Deals List */}
      {deals.length > 0 && (
        <div style={{ marginTop: "2rem" , textAlign: "center", width: "75%"}}>
          <h2>Top Deals Today</h2>
          {deals.map((deal) => (
            <div
              key={deal.destination}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <h3>✈️ {deal.destination}</h3>
              <p>
                ${deal.currentPrice} · {deal.percentCheaper}% cheaper than usual
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
