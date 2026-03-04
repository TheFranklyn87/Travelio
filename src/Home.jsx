import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const PAST_DEALS = [
    {
        name: "Tokyo",
        stars: 5,
        location: "Japan",
        rating: 4.8,
        reviews: "4,120",
        originalPrice: 1444,
        price: 520,
        currency: "CAD",
        img: "/src/assets/images/tokyo.jpg",
        badges: ["POPULAR"]
    },
    {
        name: "Paris",
        stars: 5,
        location: "France",
        rating: 4.9,
        reviews: "3,892",
        originalPrice: 720,
        price: 108,
        currency: "CAD",
        img: "/src/assets/images/paris.jpg",
        badges: ["SPECIAL DISCOUNT"]
    },
    {
        name: "Mexico City",
        stars: 4,
        location: "Mexico",
        rating: 4.5,
        reviews: "2,100",
        originalPrice: 450,
        price: 180,
        currency: "CAD",
        img: "/src/assets/images/mexico.jpg",
        badges: []
    },
    {
        name: "London",
        stars: 5,
        location: "United Kingdom",
        rating: 4.7,
        reviews: "5,210",
        originalPrice: 933,
        price: 420,
        currency: "CAD",
        img: "/src/assets/images/london.webp",
        badges: []
    },
    {
        name: "Sydney",
        stars: 4,
        location: "Australia",
        rating: 4.6,
        reviews: "1,840",
        originalPrice: 2125,
        price: 680,
        currency: "CAD",
        img: "/src/assets/images/sydney.avif",
        badges: ["SAVER"]
    },
    {
        name: "Honolulu",
        stars: 5,
        location: "Hawaii",
        rating: 4.8,
        reviews: "3,150",
        originalPrice: 879,
        price: 510,
        currency: "CAD",
        img: "/src/assets/images/honolulu.jpg",
        badges: []
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
    const [passengers, setPassengers] = useState(1);
    const [hoveredButton, setHoveredButton] = useState(false);
    const carouselRef = useRef(null);
    const navigate = useNavigate();

    const scrollLeft = () => carouselRef.current.scrollBy({ left: -350, behavior: "smooth" });
    const scrollRight = () => carouselRef.current.scrollBy({ left: 350, behavior: "smooth" });

    const handleSubmit = () => {
        if (!origin) {
            return;
        }

        const normalizedInput = origin.trim().toLowerCase();

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
                <div className="hero-background"></div>
                <div className="hero-content">
                    <div className="greeting-container">
                        <h2 className="greeting-title">
                            <span className="greeting-first">Hey there, </span>
                            going anywhere?
                        </h2>
                        <p className="greeting-subtitle">Travelio - One app for your holiday needs.</p>
                    </div>

                    <div className="search-widget">
                        <div className="search-widget-container">
                            <div className="tab-content">
                                <div className="flight-widget">
                                    <div className="search-card-main">
                                        <div className="search-form">
                                            <div className="search-location">
                                                <div className="location-box flex-1">
                                                    <div className="location-icon">
                                                        <span className="flight-icon departure"></span>
                                                    </div>
                                                    <div className="location-content">
                                                        <div className="location-label">From</div>
                                                        <input
                                                            type="text"
                                                            className="location-input font-bold"
                                                            value={origin}
                                                            onChange={e => setOrigin(e.target.value)}
                                                            placeholder="City or airport"
                                                            onKeyPress={handleKeyPress}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="location-box" style={{ width: '160px', flexShrink: 0 }}>
                                                    <div className="option-icon passenger-icon"></div>
                                                    <div className="location-content">
                                                        <div className="location-label">Passengers</div>
                                                        <input
                                                            type="number"
                                                            className="location-input font-bold"
                                                            value={passengers}
                                                            onChange={e => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
                                                            min="1"
                                                            max="9"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn-search" onClick={handleSubmit}>Let's Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Promotional Banner Section */}
            <section className="promo-section">
                <div className="promo-container">
                    <div className="promo-content">
                        <h2 className="promo-title">The seat next to yours is filling up.</h2>
                        <p className="promo-subtitle">Members get first pick — better prices on flights and hotels before they're gone.</p>
                        <button className="btn-promo">Find My Flight</button>
                    </div>
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
                        {PAST_DEALS.map((deal, index) => (
                            <div className="deal-card" key={index}>
                                <div className="deal-image-container">
                                    <img src={deal.img} alt={deal.name} />
                                    {deal.badges && deal.badges.length > 0 && (
                                        <div className="badge-container">
                                            {deal.badges.map(badge => (
                                                <span key={badge} className={`hotel-badge ${badge.toLowerCase().includes('member') ? 'member-badge' : 'promo-badge'}`}>
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="deal-info">
                                    <h3 className="hotel-name">{deal.name}</h3>
                                    <div className="hotel-stars">
                                        {"★".repeat(deal.stars)}
                                    </div>
                                    <p className="hotel-location">{deal.location}</p>
                                    <p className="hotel-rating">
                                        <span className="hotel-rating-score">{deal.rating}/5</span> <span className="hotel-reviews">({deal.reviews})</span>
                                    </p>

                                    <div className="hotel-price-section">
                                        {deal.originalPrice && (
                                            <div className="original-price">{deal.currency} {deal.originalPrice}</div>
                                        )}
                                        <div className="current-price">{deal.currency} {deal.price}</div>
                                        <div className="tax-info">Excluding taxes</div>
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
                <div className="footer-container">
                    <div className="footer-top">
                        <div className="footer-col-1">
                            <div className="footer-logo-text">Travelio</div>
                            <div className="footer-contacts">
                                <div className="footer-contact-item">
                                    <img src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/si/2021/11/29/b577c0a3-1668-40ad-8466-9e85506eb2cb-1638205055824-7846fb685ef8888259ed465c880123d4.png" alt="WhatsApp" className="footer-contact-icon" />
                                    <div>
                                        <div className="contact-title">WhatsApp</div>
                                        <a href="#" className="contact-link">+1 647 382 9154</a>
                                    </div>
                                </div>
                                <div className="footer-contact-item">
                                    <img src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/si/2021/11/29/a52e793b-c1bb-4ae0-98e3-4cc06b6ff2a8-1638205057397-71ccb1ffdcba11aeed446bf5b0a07fdc.png" alt="Email" className="footer-contact-icon" />
                                    <div>
                                        <div className="contact-title">Email</div>
                                        <a href="#" className="contact-link">support@travelio.com</a>
                                    </div>
                                </div>
                                <div className="footer-contact-item">
                                    <img src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/si/2021/11/29/b1ef9cb8-582c-474c-9963-f5cf5281e954-1638205060351-f24691bc440c711b5f724f3d48079680.png" alt="Call Center" className="footer-contact-icon" />
                                    <div>
                                        <div className="contact-title">Call Center</div>
                                        <div className="contact-info">Canada only<br /><a href="#" className="contact-link">+1 833 472 6548</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="footer-col-2 footer-links-col">
                            <h3>Company</h3>
                            <ul>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Newsroom</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Corporate</a></li>
                                <li><a href="#">Affiliate</a></li>
                                <li><a href="#">Travelio Rewards</a></li>
                                <li><a href="#">Protection</a></li>
                            </ul>
                        </div>

                        <div className="footer-col-3 footer-links-col">
                            <h3>Products</h3>
                            <ul>
                                <li><a href="#">Flights</a></li>
                                <li><a href="#">Hotels</a></li>
                                <li><a href="#">Villas & Apt.</a></li>
                                <li><a href="#">To Dos</a></li>
                            </ul>
                        </div>

                        <div className="footer-col-4 footer-links-col">
                            <h3>Support</h3>
                            <ul>
                                <li><a href="#">Travelio Help Center</a></li>
                                <li><a href="#">Group Booking</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms & Conditions</a></li>
                                <li><a href="#">Register Your Hotel</a></li>
                                <li><a href="#">Register Your Activity/Event</a></li>
                            </ul>
                        </div>

                        <div className="footer-col-5 footer-apps-col">
                            <h3>Cheaper on the app</h3>
                            <div className="app-badges">
                                <a href="#"><img src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/core-fe/2023/10/02/1fb1b9f7-d1c1-4f4a-b3d0-fbc4bf650d46-1696218535267-2e77104dddb49130433a2fa22f28a1ff.png" alt="Download on the App Store" /></a>
                                <a href="#"><img src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/core-fe/2023/10/02/02f04be0-f138-40ba-8029-a903ca5e8f7c-1696218550137-4101e40f1d4d7099144a3f1ccd37d22c.png" alt="Get it on Google Play" /></a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-divider-dashed"></div>

                    <div className="footer-bottom">
                        <span className="copyright-text">© 2020-2026 Travelio Inc. All Rights Reserved.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}