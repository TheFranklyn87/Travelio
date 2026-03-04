import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Results.css";
import cheapestRoundtrips from "./cheapest_roundtrips.json";

const CITY_NAMES = {
    SEA: "Seattle", SFO: "San Francisco", YYZ: "Toronto", YYC: "Calgary",
    YUL: "Montreal", JFK: "New York", LAX: "Los Angeles", LAS: "Las Vegas",
    HND: "Tokyo", LHR: "London", CDG: "Paris", DXB: "Dubai",
    YQB: "Quebec City", YYJ: "Victoria", YOW: "Ottawa", YVR: "Vancouver", YLW: "Kelowna",
};

const AIRLINE_INFO = {
    WS: { name: "WestJet", url: "https://www.westjet.com", initials: "WS" },
    AC: { name: "Air Canada", url: "https://www.aircanada.com", initials: "AC" },
    UA: { name: "United Airlines", url: "https://www.united.com", initials: "UA" },
    F8: { name: "Flair Airlines", url: "https://www.flyflair.com", initials: "F8" },
    AA: { name: "American Airlines", url: "https://www.aa.com", initials: "AA" },
    NH: { name: "ANA", url: "https://www.ana.co.jp", initials: "NH" },
};

// Generate a fake departure time for display purposes
const fakeTimes = ["06:15", "08:40", "10:20", "13:05", "15:30", "17:50", "19:10", "21:35"];
const fakeDurations = ["5h 10m", "6h 25m", "4h 50m", "7h 00m", "5h 40m", "6h 05m", "8h 20m", "4h 35m"];

function addMinutes(time, minsStr) {
    const [h, m] = time.split(":").map(Number);
    const match = minsStr.match(/(\d+)h\s*(\d+)m/);
    if (!match) return time;
    const total = h * 60 + m + parseInt(match[1]) * 60 + parseInt(match[2]);
    const rh = String(Math.floor(total / 60) % 24).padStart(2, "0");
    const rm = String(total % 60).padStart(2, "0");
    return `${rh}:${rm}`;
}

export default function Results() {
    const { origin } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const filtered = cheapestRoundtrips.filter(
                (flight) => flight.Origin.toUpperCase() === origin.toUpperCase()
            );
            filtered.sort((a, b) => a.Price / a.AveragePrice - b.Price / b.AveragePrice);
            setResults(filtered);
            setLoading(false);
        }, 800);
    }, [origin]);

    if (loading) {
        return (
            <div className="results-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Searching flights from {CITY_NAMES[origin] || origin}...</p>
                </div>
            </div>
        );
    }

    if (!results.length) {
        return (
            <div className="results-page">
                <div className="results-topbar">
                    <Link to="/" className="back-button">← Back</Link>
                </div>
                <div className="no-results">
                    <div className="no-results-icon">✈️</div>
                    <h2>No flights found from {CITY_NAMES[origin] || origin}</h2>
                    <p>Try searching from a different city or check back later.</p>
                    <Link to="/" className="back-button">Search Again</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="results-page">
            {/* Top bar */}
            <div className="results-topbar">
                <Link to="/" className="back-button">← Back</Link>
                <div className="results-route">
                    <span className="route-origin">{CITY_NAMES[origin] || origin}</span>
                    <span className="route-arrow">→</span>
                    <span className="route-dest">All Destinations</span>
                </div>
                <div className="results-count-pill">{results.length} flights found</div>
            </div>

            {/* Cheapest notice */}
            <div className="results-notice">
                Showing cheapest available fares · Prices per person, round-trip
            </div>

            {/* Flight list */}
            <div className="flight-list">
                {results.map((item, index) => {
                    const cheaperPercent = Math.round(
                        ((item.AveragePrice - item.Price) / item.AveragePrice) * 100
                    );
                    const airline = AIRLINE_INFO[item.Airline] || { name: item.Airline, url: "#", initials: item.Airline };
                    const depTime = fakeTimes[index % fakeTimes.length];
                    const duration = fakeDurations[index % fakeDurations.length];
                    const arrTime = addMinutes(depTime, duration);
                    const depDate = new Date(item.DepartureDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    const retDate = new Date(item.ReturnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                    return (
                        <div className="flight-row" key={`${item.Destination}-${index}`}>
                            {cheaperPercent >= 15 && (
                                <div className="flight-badge">
                                    {cheaperPercent}% cheaper than average
                                </div>
                            )}
                            <div className="flight-row-main">
                                {/* Airline */}
                                <div className="flight-airline">
                                    <div className="airline-logo">{airline.initials}</div>
                                    <span className="airline-name">{airline.name}</span>
                                </div>

                                {/* Times */}
                                <div className="flight-times">
                                    <div className="flight-time-block">
                                        <span className="flight-time">{depTime}</span>
                                        <span className="flight-code">{origin}</span>
                                    </div>
                                    <div className="flight-duration-block">
                                        <span className="flight-duration">{duration}</span>
                                        <div className="flight-line"><div className="flight-dot left"></div><div className="flight-dot right"></div></div>
                                        <span className="flight-stops">Direct</span>
                                    </div>
                                    <div className="flight-time-block">
                                        <span className="flight-time">{arrTime}</span>
                                        <span className="flight-code">{item.Destination}</span>
                                    </div>
                                </div>

                                {/* Destination */}
                                <div className="flight-dest">
                                    <span className="dest-city">{CITY_NAMES[item.Destination] || item.Destination}</span>
                                    <span className="dest-dates">{depDate} → {retDate}</span>
                                </div>

                                {/* Price + actions */}
                                <div className="flight-price-block">
                                    <div className="flight-price">CAD {item.Price.toFixed(0)}<span className="per-pax">/pax</span></div>
                                    {item.AveragePrice > item.Price && (
                                        <div className="flight-was">was CAD {item.AveragePrice.toFixed(0)}</div>
                                    )}
                                    <div className="flight-actions">
                                        <Link
                                            to={`/itinerary/${item.Destination}/${item.DepartureDate}/${item.ReturnDate}`}
                                            className="btn-itinerary"
                                        >
                                            Itinerary
                                        </Link>
                                        <a
                                            href={airline.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-book"
                                        >
                                            Book →
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flight-row-footer">
                                <span className="refund-tag">Refund allowed</span>
                                <span className="flight-class">Economy · Round-trip</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}