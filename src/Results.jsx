import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Results.css";
import cheapestRoundtrips from "./cheapest_roundtrips.json";

const CITY_NAMES = {
  SEA: "Seattle",
  SFO: "San Francisco",
  YYZ: "Toronto",
  YYC: "Calgary",
  YUL: "Montreal",
  JFK: "New York",
  LAX: "Los Angeles",
  LAS: "Las Vegas",
  HND: "Tokyo",
  LHR: "London",
  CDG: "Paris",
  DXB: "Dubai",
  YQB: "Quebec City",
  YYJ: "Victoria",
  YOW: "Ottawa",
};

const GRADIENT_COLORS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  "linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)",
];

export default function Results() {
  const { origin } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const filtered = cheapestRoundtrips.filter(
        (flight) => flight.Origin.toUpperCase() === origin.toUpperCase()
      );

      filtered.sort((a, b) => a.Price / a.AveragePrice - b.Price / b.AveragePrice);

      setResults(filtered);
      setLoading(false);
    }, 800);
  }, [origin]);

  const getGradient = (index) => {
    return GRADIENT_COLORS[index % GRADIENT_COLORS.length];
  };

  if (loading) {
    return (
      <div className="results-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Finding the best deals from {origin}...</p>
        </div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="results-page">
        <div className="results-header">
          <Link to="/" className="back-button">
            ← Back to Home
          </Link>
        </div>
        <div className="no-results">
          <div className="no-results-icon">✈️</div>
          <h2>No flights found from {origin}</h2>
          <p>Try searching from a different city or check back later for new deals.</p>
          <Link to="/" className="back-button">
            Search Again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="results-page">
      <div className="results-header">
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
        <h2>Best destinations from {CITY_NAMES[origin] || origin}</h2>
        <p className="results-subtitle">
          Discover amazing deals on flights from your city
        </p>
        <div className="results-count">
          ✨ {results.length} incredible {results.length === 1 ? 'deal' : 'deals'} found
        </div>
      </div>

      <div className="results-grid">
        {results.map((item, index) => {
          const cheaperPercent = Math.round(
            ((item.AveragePrice - item.Price) / item.AveragePrice) * 100
          );
          const savings = item.AveragePrice - item.Price;

          return (
            <div className="result-card" key={item.Destination}>
              {cheaperPercent >= 40 && (
                <div className="savings-badge">
                  🔥 Hot Deal!
                </div>
              )}

              <div className="result-info">
                <h3>
                  {CITY_NAMES[item.Destination] || item.Destination}
                  <span className="airport-code">{item.Destination}</span>
                </h3>

                <p className="dates">
                  {new Date(item.DepartureDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })} → {new Date(item.ReturnDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>

                <div className="price-container">
                  <div className="price">${item.Price.toFixed(0)}</div>
                  <div className="avg">was ${item.AveragePrice.toFixed(0)}</div>
                </div>

                <div className="deal">
                  {cheaperPercent}% cheaper · Save ${savings.toFixed(0)}
                </div>

                <button className="book-button">
                    <Link 
                        to={`/itinerary/${item.Destination}/${item.DepartureDate}/${item.ReturnDate}`}
                        className="book-button"
                        style={{ textDecoration: 'none' }}
                        >
                        Generate Itinerary
                    </Link>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}