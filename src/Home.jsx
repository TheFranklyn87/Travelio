import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import * as THREE from 'three';
import CLOUDS2 from 'vanta/dist/vanta.clouds2.min';

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
    const [hoveredButton, setHoveredButton] = useState(false);
    const carouselRef = useRef(null);
    const vantaRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        let effect;
        if (vantaRef.current) {
            effect = CLOUDS2({
                el: vantaRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200,
                minWidth: 200,
                scale: 1.0,
                texturePath: "/noise.png",
                skyColor: 0x68b4d8,
                cloudColor: 0xd4ecf8,
                lightColor: 0xffffff,
                speed: 1.2,
            });
        }
        return () => {
            if (effect) effect.destroy();
        };
    }, []);

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
        <div className="home-page" ref={vantaRef}>
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
                            <div className="vertical-tabs">
                                <ul className="tab-list">
                                    <li className="tab-item">
                                        <a href="#" className="tab-link tab-active">
                                            <img src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit9696gsm/homenext_dashboard/2025/12/08/51e1837f-035f-469f-958f-650a20297e0e-1765176452417-57315c8faa2efc309e928301be1e6c7d.png" alt="Flights" className="tab-icon" />
                                            <span className="tab-text">Flights</span>
                                        </a>
                                    </li>
                                    <li className="tab-item">
                                        <a href="#" className="tab-link">
                                            <img src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit9696gsm/homenext_dashboard/2025/10/16/80e67ca2-dd0a-4ceb-bead-6579033cdba9-1760625040290-39da4b0debfd4e00ffaf33bd52de6e64.png" alt="Hotels" className="tab-icon" />
                                            <span className="tab-text">Hotels</span>
                                            <div className="tab-badge"><span className="badge-text">-40%</span></div>
                                        </a>
                                    </li>
                                    <li className="tab-item">
                                        <a href="#" className="tab-link">
                                            <img src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit9696gsm/homenext_dashboard/2025/10/16/4cb230dc-bc2f-42c2-bb7e-520d69c2cd37-1760625541713-a8015a2de08f5cb56ec000cdcc66f68b.png" alt="To Dos" className="tab-icon" />
                                            <span className="tab-text">To Dos</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="tab-content">
                                <div className="flight-widget">
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input type="radio" name="tripType" value="oneway" defaultChecked />
                                            <span className="radio-icon"></span>
                                            <span className="radio-text">One way</span>
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="tripType" value="roundtrip" />
                                            <span className="radio-icon"></span>
                                            <span className="radio-text">Round-trip</span>
                                        </label>
                                    </div>

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
                                                            placeholder="Jakarta JKTC"
                                                            onKeyPress={handleKeyPress}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="switch-icon-wrapper">
                                                    <button className="switch-btn">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 24" width="20" height="20"><path fill="#007cff" d="M20.93 12.965a.996.996 0 0 0-1.994 0c0 .565-.14.923-.298 1.158a1.622 1.622 0 0 1-.643.543 2.698 2.698 0 0 1-1.05.267H8.4l1.258-1.256a.994.994 0 0 0 0-1.407.999.999 0 0 0-1.41 0l-2.964 2.957a.994.994 0 0 0-.011 1.396l2.963 3.058a.998.998 0 0 0 1.41.023.994.994 0 0 0 .023-1.407l-1.33-1.374h8.604v-.995.995h.024a3.506 3.506 0 0 0 .175-.008 4.697 4.697 0 0 0 1.739-.466 3.613 3.613 0 0 0 1.412-1.216c.402-.599.636-1.352.636-2.268Z"></path><path fill="#007cff" d="M4.93 11.003a.996.996 0 0 0 1.994 0c0-.565.14-.923.298-1.159.162-.242.387-.416.643-.543a2.7 2.7 0 0 1 1.05-.266h8.544L16.2 10.29a.994.994 0 0 0 0 1.408.999.999 0 0 0 1.41 0l2.963-2.958a.994.994 0 0 0 .012-1.395l-2.964-3.058a.998.998 0 0 0-1.41-.023.994.994 0 0 0-.023 1.407l1.331 1.373H8.916v.996l-.001-.996H8.89a2.442 2.442 0 0 0-.174.009 4.693 4.693 0 0 0-1.739.466 3.613 3.613 0 0 0-1.412 1.216c-.402.598-.636 1.352-.636 2.268Z"></path></svg>
                                                    </button>
                                                </div>
                                                <div className="location-box flex-1">
                                                    <div className="location-icon">
                                                        <span className="flight-icon arrival"></span>
                                                    </div>
                                                    <div className="location-content">
                                                        <div className="location-label">To</div>
                                                        <input
                                                            type="text"
                                                            className="location-input font-bold"
                                                            placeholder="Going Anywhere?"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="search-options">
                                                <div className="option-box flex-1">
                                                    <div className="option-icon calendar-icon"></div>
                                                    <div className="option-content">
                                                        <div className="option-label">Departure</div>
                                                        <div className="option-value font-bold">Wed, 4 Mar 26</div>
                                                    </div>
                                                </div>

                                                <div className="option-box flex-1 return-box">
                                                    <div className="option-icon calendar-icon opacity-50"></div>
                                                    <div className="option-content">
                                                        <div className="option-label">Return - Better deals!</div>
                                                        <div className="option-value return-text font-bold">Book round-trip</div>
                                                    </div>
                                                </div>

                                                <div className="option-box flex-1">
                                                    <div className="option-icon passenger-icon"></div>
                                                    <div className="option-content">
                                                        <div className="option-label">Passenger, Class</div>
                                                        <div className="option-value font-bold">1, Economy</div>
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
                        <h2 className="promo-title">Ready for your next getaway?</h2>
                        <p className="promo-subtitle">Join Travelio today and unlock exclusive member-only discounts on top destinations.</p>
                        <button className="btn-promo">Explore Deals</button>
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
                            <img src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/test-discovery/2024/03/01/ac13e03e-896c-4bbb-ba7c-cdf9b04a68b7-1709290197088-cb26aa8c25b24b1aa5df8bb2edce7ea7.png" alt="tiket.com" className="footer-logo" />
                            <div className="footer-contacts">
                                <div className="footer-contact-item">
                                    <img src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/si/2021/11/29/b577c0a3-1668-40ad-8466-9e85506eb2cb-1638205055824-7846fb685ef8888259ed465c880123d4.png" alt="WhatsApp" className="footer-contact-icon" />
                                    <div>
                                        <div className="contact-title">WhatsApp</div>
                                        <a href="#" className="contact-link">+62 858 1150 0888</a>
                                    </div>
                                </div>
                                <div className="footer-contact-item">
                                    <img src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/si/2021/11/29/a52e793b-c1bb-4ae0-98e3-4cc06b6ff2a8-1638205057397-71ccb1ffdcba11aeed446bf5b0a07fdc.png" alt="Email" className="footer-contact-icon" />
                                    <div>
                                        <div className="contact-title">Email</div>
                                        <a href="#" className="contact-link">cs@tiket.com</a>
                                    </div>
                                </div>
                                <div className="footer-contact-item">
                                    <img src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/si/2021/11/29/b1ef9cb8-582c-474c-9963-f5cf5281e954-1638205060351-f24691bc440c711b5f724f3d48079680.png" alt="Call Center" className="footer-contact-icon" />
                                    <div>
                                        <div className="contact-title">Call Center</div>
                                        <div className="contact-info">Indonesia only<br /><a href="#" className="contact-link">+62 804 1500 878</a></div>
                                        <div className="contact-info mt-2">International<br /><a href="#" className="contact-link">+62 21 3973 0888</a></div>
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
                                <li><a href="#">Blibli Tiket Rewards</a></li>
                                <li><a href="#">Protection</a></li>
                                <li><a href="#">Blibli.com</a></li>
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
                                <li><a href="#">halo tiket Help Center</a></li>
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
                        <span className="copyright-text">© 2011-2026 PT. Global Tiket Network. All Rights Reserved.</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 104 19" className="blibli-tiket-logo"><title>Blibli tiket group</title><path fill="#007CFF" d="M68.9105 15.5861c0 .1749-.0295.3401-.0983.4956-.0688.1555-.1867.2916-.344.4082-.1671.1166-.3931.2138-.6978.2721-.2949.068-.6782.0972-1.1402.0972-.9927 0-1.7495-.243-2.2606-.7386-.5209-.4956-.7765-1.2148-.7765-2.1769V8.37521h-.688c-.344 0-.629-.12634-.8748-.36929-.2359-.24295-.3538-.54422-.3538-.89407 0-.3207.1179-.60253.3538-.83577.2359-.23323.5308-.34985.8748-.34985h.688V4.26442c0-.37901.1376-.70942.4128-.98153.2752-.27211.6192-.40817 1.0321-.40817.3833 0 .7175.13606.9828.40817.2753.27211.4129.60252.4129.98153v1.66181h1.1204c.3244 0 .6094.12634.8453.36929.2359.24296.3539.5345.3539.87464 0 .34013-.118.62196-.3539.86491-.2359.23324-.5209.34986-.8453.34986h-1.1204v4.82017c0 .4276.1081.7289.3243.9038.2162.175.4325.2624.6585.2624h.2458c.4029 0 .7076.1166.9239.3499.2162.2332.3243.5248.3243.8649ZM72.9797 15.3431c0 .379-.1376.7095-.4129.9816-.2752.2721-.6192.4081-1.0123.4081-.3833 0-.7175-.136-.9927-.4081s-.4128-.6026-.4128-.9816V7.17016c0-.37901.1376-.70943.4128-.97182s.6192-.39845 1.0418-.39845c.3833 0 .7175.13606.9829.39845.2654.26239.403.59281.403.97182v8.17294h-.0098ZM84.1551 15.314c0 .3401-.1278.6608-.3932.9621-.2654.3012-.5996.4567-1.0124.4567-.226 0-.4423-.0486-.6585-.1457-.2162-.0972-.3931-.243-.5308-.4568l-2.526-3.6443-1.2974 1.3703v1.4771c0 .379-.1376.7094-.4128.9816-.2752.2721-.6192.4081-1.0124.4081-.3833 0-.7175-.136-.9927-.4081-.2752-.2722-.4128-.6026-.4128-.9816V3.08852c0-.379.1376-.70942.4128-.97181.2752-.26239.6192-.39845 1.0419-.39845.3833 0 .7175.13606.9829.39845.2653.26239.4029.59281.4029.97181v7.58018l3.8235-4.46064c.2555-.29155.57-.43732.9632-.43732.3538 0 .6684.13605.9337.39845.2654.26239.403.57337.403.92322 0 .31098-.1081.59281-.3145.83576l-2.5064 2.82803 2.8406 3.7609c.1769.2527.2654.5248.2654.7969ZM95.3206 10.8728c0 .3401-.1278.6414-.3833.8941-.2555.2623-.5701.3887-.9337.3887h-6.664c.0393.3401.1474.6608.3047.9621.1573.3012.3637.5636.629.7871.2654.2236.5701.3985.9338.5345.3637.1361.7765.1944 1.2384.1944.2949 0 .6389-.0486 1.0124-.136.3833-.0875.7371-.2236 1.0812-.3985.1769-.0874.3636-.136.5602-.136.2949 0 .5701.1069.8256.3109.2556.2041.3834.4762.3834.8164 0 .3693-.1671.6511-.4915.8357-.5406.3207-1.1205.5637-1.7594.7095-.629.1457-1.2777.2235-1.9362.2235-.8158 0-1.5825-.1361-2.2902-.3985-.7076-.2624-1.317-.6414-1.838-1.1273-.5111-.4859-.914-1.0787-1.2089-1.7687-.2949-.69-.4325-1.4674-.4325-2.3226 0-.7678.1376-1.48691.4128-2.1769.2752-.68027.6586-1.27308 1.15-1.77843.4915-.49562 1.0812-.89407 1.7692-1.19533.688-.29155 1.435-.43732 2.2607-.43732.6093 0 1.1794.08746 1.7102.25267.5307.16521 1.0123.40817 1.4448.71915.4325.31098.806.68999 1.1303 1.13703.3145.44703.5799.94266.7667 1.48688.0786.25267.1474.51506.2162.79685.0786.2916.1081.5637.1081.8261Zm-2.7029-.6123c-.0197-.2526-.0786-.51503-.1769-.79686-.1082-.28182-.2654-.5345-.4718-.75801-.2064-.22352-.4816-.41788-.8158-.57337-.3342-.15549-.7372-.23324-1.1991-.23324-.4423 0-.8355.07774-1.15.22352-.3243.14577-.5799.34013-.7961.56365-.2064.23324-.3735.48591-.4915.75802-.1179.28183-.1966.55393-.226.81629h5.3272ZM102.407 15.5861c0 .1749-.029.3401-.098.4956-.069.1555-.187.2916-.344.4082-.167.1166-.393.2138-.688.2721-.295.068-.678.0972-1.14.0972-.993 0-1.7498-.243-2.2609-.7386-.5209-.4956-.7765-1.2148-.7765-2.1769V8.37521h-.688c-.344 0-.629-.12634-.8748-.36929-.2358-.24295-.3538-.54422-.3538-.89407 0-.3207.118-.60253.3538-.83577.2359-.23323.5308-.34985.8748-.34985h.688V4.26442c0-.37901.1376-.70942.4129-.98153.2752-.27211.6192-.40817 1.032-.40817.3833 0 .7175.13606.9829.40817.2752.27211.4128.60252.4128.98153v1.66181h1.1208c.324 0 .609.12634.845.36929.236.24296.354.5345.354.87464 0 .34013-.118.62196-.354.86491-.236.23324-.521.34986-.845.34986h-1.1208v4.82017c0 .4276.1078.7289.3248.9038.216.175.432.2624.658.2624h.246c.403 0 .707.1166.924.3499.206.2332.314.5248.314.8649Z"></path><path fill="#0072FF" d="M33.8707 9.33731c-.2654-.65112-.6192-1.22449-1.0615-1.68125-.4423-.45675-.9731-.82604-1.5726-1.07871-.0099 0-.8551-.40817-1.838-.38873-.5996.00972-.9239.15549-1.1893.30126-.0197.00972-.0492.02916-.0688.03888-.1081.06802-.3833.25267-.6291.54421-.4718.56366-.5307 1.46745-.4324 2.12829l.0393.26239.1966-.16521c.1769-.15549.4914-.36929.9534-.48591.2457-.05831.5012-.06803.7568-.02916.5995.07775 1.1106.34014 1.5234.76774.5013.52479.7569 1.20509.7569 2.02139 0 .8163-.2556 1.4869-.7569 1.9922-.5012.5054-1.1499.7677-1.9264.7677s-1.4252-.2526-1.9265-.7385c-.7961-.7872-.7371-2.3421-.7371-2.3615v-9.174c0-.04859-.0295-.08747-.0787-.09718l-.3243-.09719c-.2752-.08746-.5996-.12633-.9534-.12633-.4816 0-.8649.09718-1.1402.29154-.2457.17493-.3734.48591-.3734.94267v8.09519c0 .865.0884 1.623.2653 2.2449.177.622.4227 1.1468.7372 1.5647.5013.6608 1.1598 1.1661 1.9461 1.5063.7961.3498 1.6906.5248 2.6636.5248.7962 0 1.5431-.1361 2.2213-.3888.6782-.2624 1.268-.6219 1.7594-1.0884.4914-.4568.8846-1.0301 1.1598-1.691.285-.6608.4226-1.3994.4226-2.1963 0-.8066-.1277-1.55487-.3931-2.20599ZM16.5719 1.87375c-.285-.08746-.6094-.12633-.9632-.12633-.4816 0-.8649.09718-1.1401.29154-.2458.17493-.3735.48591-.3735.94266V16.6259h2.8798V1.99037l-.403-.11662ZM20.13 4.91554c.4521 0 .8453-.15549 1.1499-.44704.3047-.30126.462-.68027.462-1.1273 0-.44704-.1573-.82605-.462-1.13703-.3046-.30126-.6978-.45675-1.1499-.45675-.4522 0-.8355.15549-1.1402.45675-.3047.30126-.4521.68999-.4521 1.13703 0 .44703.1573.82604.4521 1.1273.3047.29155.688.44704 1.1402.44704ZM20.2086 6.48017c-.4816 0-.8649.09718-1.1401.29154-.2458.17493-.3735.48591-.3735.94266v8.91153h2.8798V6.72312l-.403-.11662c-.285-.07774-.6094-.12633-.9632-.12633ZM38.0283 1.87375c-.285-.08746-.6094-.12633-.9632-.12633-.4816 0-.865.09718-1.1402.29154-.2457.17493-.3735.48591-.3735.94266V16.6259h2.8799V1.99037l-.403-.11662ZM41.5274 4.91554c.4521 0 .8452-.15549 1.1499-.44704.3047-.30126.462-.68027.462-1.1273 0-.44704-.1573-.82605-.462-1.13703-.3047-.30126-.6978-.45675-1.1499-.45675-.4522 0-.8355.15549-1.1402.45675-.3047.30126-.4521.68999-.4521 1.13703 0 .44703.1573.82604.4521 1.1273.3047.29155.688.44704 1.1402.44704ZM41.606 6.48017c-.4816 0-.8649.09718-1.1402.29154-.2457.17493-.3734.48591-.3734.94266v8.91153h2.8798V6.72312l-.403-.11662c-.285-.07774-.6094-.12633-.9632-.12633ZM12.375 9.33731c-.2654-.65112-.6192-1.22449-1.0615-1.68125-.4423-.45675-.9731-.82604-1.57262-1.07871-.00983 0-.85511-.40817-1.83799-.38873-.59956.00972-.92391.15549-1.18929.30126-.01966.00972-.04914.02916-.0688.03888-.10812.06802-.38333.25267-.62905.54421-.47178.56366-.53076 1.46745-.43247 2.12829l.03932.26239.19658-.16521c.17691-.15549.49144-.36929.95339-.48591.24572-.05831.50127-.06803.75682-.02916.59956.07775 1.11066.34014 1.52347.76774.50127.52479.75682 1.20509.75682 2.02139 0 .8163-.25555 1.4869-.75682 1.9922-.50127.5054-1.14997.7677-1.92645.7677-.77648 0-1.42518-.2526-1.92645-.7385-.79614-.7872-.73716-2.3421-.73716-2.3615v-9.174c0-.04859-.02949-.08747-.07864-.09718l-.32435-.09719c-.2752-.08746-.59956-.12633-.9534-.12633-.48161 0-.86493.09718-1.14014.29154-.24572.17493-.3735.48591-.3735.94267v8.09519c0 .865.08846 1.623.26538 2.2449.17692.622.42264 1.1468.73717 1.5647.50127.6608 1.1598 1.1661 1.94611 1.5063.79613.3498 1.69056.5248 2.66361.5248.79614 0 1.54313-.1361 2.22132-.3888.67824-.2624 1.26794-.6219 1.75934-1.0884.4915-.4568.8846-1.0301 1.1598-1.691.2851-.6608.4227-1.3994.4227-2.1963 0-.8066-.1376-1.55487-.3932-2.20599Z"></path><path fill="#FEDD00" d="M52.7813 15.7319c3.5936 0 6.5067-2.8804 6.5067-6.43346 0-3.55308-2.9131-6.43343-6.5067-6.43343-3.5935 0-6.5066 2.88035-6.5066 6.43343 0 3.55306 2.9131 6.43346 6.5066 6.43346Z"></path></svg>
                    </div>
                </div>
            </footer>
        </div>
    );
}