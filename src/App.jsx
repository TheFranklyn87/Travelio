import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Results from "./Results";
import Itinerary from './Itinerary';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/results/:origin" element={<Results />} />
      <Route path="/itinerary/:destination/:startDate/:endDate" element={<Itinerary />} />
    </Routes>
  );
}
