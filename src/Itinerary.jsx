import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Itinerary.css";

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

export default function Itinerary() {
  const { destination, startDate, endDate } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:3001/api/itinerary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city: CITY_NAMES[destination] || destination,
            startDate,
            endDate,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate itinerary");
        }

        const data = await response.json();
        setItinerary(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [destination, startDate, endDate]);

  if (loading) {
    return (
      <div className="itinerary-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">
            Creating your perfect itinerary for {CITY_NAMES[destination] || destination}...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="itinerary-page">
        <div className="error-container">
          <div className="error-icon">❌</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <Link to="/" className="back-button">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="itinerary-page">
      <div className="itinerary-header">
        <Link to="/" className="back-button">
          ← Back to Search
        </Link>
        <h1>
          Your Trip to {CITY_NAMES[destination] || destination}
        </h1>
        <p className="trip-dates">
          {new Date(startDate).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          })} - {new Date(endDate).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>

      <div className="itinerary-content">
        <div className="itinerary-text">
          {itinerary?.itinerary.split('\n').map((line, index) => {
            // Check if line is a header (starts with ###, ##, or #)
            if (line.startsWith('### ')) {
              return <h3 key={index}>{line.replace('### ', '')}</h3>;
            } else if (line.startsWith('## ')) {
              return <h2 key={index}>{line.replace('## ', '')}</h2>;
            } else if (line.startsWith('# ')) {
              return <h1 key={index}>{line.replace('# ', '')}</h1>;
            } else if (line.startsWith('**') && line.endsWith('**')) {
              return <h4 key={index}>{line.replace(/\*\*/g, '')}</h4>;
            } else if (line.startsWith('*   ')) {
              return <li key={index}>{line.replace('*   ', '')}</li>;
            } else if (line.startsWith('---')) {
              return <hr key={index} />;
            } else if (line.trim() === '') {
              return <br key={index} />;
            } else {
              return <p key={index}>{line}</p>;
            }
          })}
        </div>

        <div className="itinerary-actions">
          <button className="print-button" onClick={() => window.print()}>
            🖨️ Print Itinerary
          </button>
          <button 
            className="copy-button" 
            onClick={() => {
              navigator.clipboard.writeText(itinerary?.itinerary);
              alert('Itinerary copied to clipboard!');
            }}
          >
            📋 Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}