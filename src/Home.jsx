import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const PAST_DEALS = [
  { destination: "Tokyo", price: 520, percentCheaper: 64, img: "/src/assets/images/tokyo.jpg", desc: "A vibrant blend of futuristic city life and ancient traditions." },
  { destination: "Paris", price: 108, percentCheaper: 85, img: "/src/assets/images/paris.jpg", desc: "Romantic streets, iconic landmarks, and world-class cuisine." },
  { destination: "Mexico City", price: 180, percentCheaper: 60, img: "/src/assets/images/mexico.jpg", desc: "Colorful culture, historic architecture, and unforgettable food." },
  { 
    destination: "London",
    price: 420,
    percentCheaper: 55,
    img: "/src/assets/images/london.webp",
    desc: "Historic landmarks, vibrant neighborhoods, and world-class museums."
  },
  { 
    destination: "Sydney",
    price: 680,
    percentCheaper: 68,
    img: "/src/assets/images/sydney.avif",
    desc: "Iconic beaches, stunning harbor views, and laid-back city life."
  },
  { 
    destination: "Honolulu",
    price: 510,
    percentCheaper: 42,
    img: "/src/assets/images/honolulu.jpg",
    desc: "Tropical beaches, crystal-clear waters, and unforgettable sunsets."
  }  
];

const CITY_TO_AIRPORT = {
  // Vancouver area
  "vancouver": "YVR",
  "yvr": "YVR",
  
  // Seattle area
  "seattle": "SEA",
  "sea": "SEA",
  
  // San Francisco area
  "san francisco": "SFO",
  "sf": "SFO",
  "sfo": "SFO",
  
  // Toronto area
  "toronto": "YYZ",
  "yyz": "YYZ",
  
  // Calgary
  "calgary": "YYC",
  "yyc": "YYC",
  
  // Montreal
  "montreal": "YUL",
  "yul": "YUL",
  
  // New York area
  "new york": "JFK",
  "nyc": "JFK",
  "jfk": "JFK",
  
  // Los Angeles
  "los angeles": "LAX",
  "la": "LAX",
  "lax": "LAX",
  
  // Las Vegas
  "las vegas": "LAS",
  "vegas": "LAS",
  "las": "LAS",
  
  // Tokyo
  "tokyo": "HND",
  "hnd": "HND",
  
  // London
  "london": "LHR",
  "lhr": "LHR",
  
  // Paris
  "paris": "CDG",
  "cdg": "CDG",
  
  // Dubai
  "dubai": "DXB",
  "dxb": "DXB",
  
  // Quebec City
  "quebec city": "YQB",
  "quebec": "YQB",
  "yqb": "YQB",
  
  // Victoria
  "victoria": "YYJ",
  "yyj": "YYJ",
  
  // Ottawa
  "ottawa": "YOW",
  "yow": "YOW"
};

export default function Home() {
  const [origin, setOrigin] = useState("");
  const [hoveredButton, setHoveredButton] = useState(false);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => carouselRef.current.scrollBy({ left: -350, behavior: "smooth" });
  const scrollRight = () => carouselRef.current.scrollBy({ left: 350, behavior: "smooth" });

  const handleSubmit = () => {
    if (!origin) { 
      alert("Please enter your departing city!"); 
      return; 
    }
    
    // Normalize input: trim and lowercase
    const normalizedInput = origin.trim().toLowerCase();
    
    // Check if input matches a city name or is already an airport code
    const airportCode = CITY_TO_AIRPORT[normalizedInput] || origin.toUpperCase();
    
    navigate(`/results/${airportCode}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
        <div className="hero-icon">
        <img 
            src="/src/assets/images/icon.png" 
            alt="Airplane icon" 
        />
        </div>
          <h1 className="hero-title">Travelio</h1>
          <p className="hero-subtitle">Our next adventure is closer than you think</p>
          
          <div className="search-card">
            <div className="input-wrapper">
              <span className="input-icon">📍</span>
              <input
                type="text"
                placeholder="Departing city (e.g. YVR, Vancouver)"
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                onKeyPress={handleKeyPress}
                className="search-input"
              />
            </div>
            <button 
              onClick={handleSubmit}
              className="search-button"
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
              style={{
                background: hoveredButton 
                  ? "linear-gradient(135deg, #2563EB 0%, #4338CA 100%)"
                  : "linear-gradient(135deg, #3B82F6 0%, #4F46E5 100%)",
                transform: hoveredButton ? "scale(1.02)" : "scale(1)"
              }}
            >
              🔍 Search Deals
            </button>
          </div>
        </div>
      </section>

      {/* Why Book Section */}
      <section className="why-book-section">
        <h2 className="section-title">Why Book with Travelio</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Plan Your Way</h3>
            <p>Customize your trips with flexible planning tools, suggested itineraries, and personal recommendations.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Stay Flexible</h3>
            <p>Free cancellation and reserve now, pay later at no additional cost.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Get the most competitive flight deals, daily updates, and price alerts.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>We're here to help anytime with your bookings, changes, or questions.</p>
          </div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
        <section className="quote-section">
            <div className="quote-container">
                <blockquote className="quote-text">
                    "One day your life will flash before your eyes. Make sure it's worth watching."
                </blockquote>
                <p className="quote-author">- Gerard Way</p>
            </div>
        </section>

      {/* Past Deals Section */}
      <section className="past-deals-section">
        <h2 className="section-title">Best Past Deals</h2>
        <p className="section-subtitle">Discover amazing destinations at unbeatable prices</p>
        
        <div className="carousel-container">
          <button className="carousel-button carousel-left" onClick={scrollLeft}>
            ‹
          </button>
          <div className="deals-carousel" ref={carouselRef}>
            {PAST_DEALS.map(deal => (
              <div className="deal-card" key={deal.destination}>
                <div className="deal-image-container">
                  <img src={deal.img} alt={deal.destination} />
                  <div className="deal-overlay">
                    <h3>{deal.destination}</h3>
                    <p>{deal.desc}</p>
                  </div>
                </div>
                <div className="deal-info">
                  <div className="deal-price-row">
                    <span className="deal-price">${deal.price}</span>
                    <span className="deal-badge">
                      📉 {deal.percentCheaper}% off
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-button carousel-right" onClick={scrollRight}>
            ›
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Travelio</h3>
            <p>Find the best flight deals worldwide. Compare, book, and travel with confidence.</p>
          </div>
          <div className="footer-column">
            <h4>Help Center</h4>
            <ul>
              <li>Customer Support</li>
              <li>Cancellation Options</li>
              <li>Refund Policy</li>
              <li>Travel Alerts</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Explore</h4>
            <ul>
              <li>Cheap Flights</li>
              <li>Popular Destinations</li>
              <li>Last-Minute Deals</li>
              <li>Travel Guides</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Partnerships</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} Travelio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}