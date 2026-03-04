# ✈️ Travelio

Discover your next spontaneous adventure with the best flight deals from your city.

## 🌟 Inspiration

Ever wanted to travel somewhere new but didn't know where to go? Travelio was born from the desire to help spontaneous travelers find unusually cheap flight tickets and embark on unexpected adventures. Instead of searching for flights to a specific destination, Travelio finds the best deals departing from your city and surprises you with exciting possibilities.

## 🚀 What it does

- **Smart Flight Discovery**: Displays the best flight deals relative to average monthly prices from your origin city
- **AI-Powered Itineraries**: Generates personalized travel itineraries using Gemini AI
- **Deal Comparison**: Shows you unusually cheap tickets compared to typical pricing

## 🛠️ Built With

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Python
- **APIs**: 
  - Amadeus Travel API (flight data)
  - Gemini API (itinerary generation)

## 📋 Prerequisites

Before running Travelio, make sure you have:

- Git
- Node.js
- Python 3.x
- Amadeus API credentials ([Get them here](https://developers.amadeus.com/))
- Gemini API key ([Get it here](https://ai.google.dev/))

## ⚙️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/travelio.git
   cd travelio
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Create environment file in main directory**
   
   Create a `.env` file in the root directory:
   ```env
   AMADEUS_API_KEY=your_amadeus_key
   AMADEUS_API_SECRET=your_amadeus_secret
   ```

4. **Create environment file in travel-itinerary directory**
   
   Create a `.env` file in the `travel-itinerary` directory:
   ```env
   GEMINI_API_KEY=your_gemini_key
   ```

5. **Install Node.js dependencies**
   ```bash
   npm install
   ```

## 🏃 Running the Application

1. **Start the frontend**
   ```bash
   npm run dev
   ```
   Click the localhost link that appears in your terminal.

2. **Start the backend server** (in a new terminal)
   ```bash
   cd travel-itinerary
   node server.js
   ```

3. **Start exploring!** 
   
   Visit the localhost URL and search for the best flight deals from your city.

## 💡 How to Use

1. Enter your origin city
2. Browse through the best flight deals displayed
3. Select a destination that interests you
4. Get an AI-generated itinerary for your trip

## 🏆 Accomplishments

- Built a functional tool that solves a real travel planning challenge
- Successfully integrated multiple APIs (Amadeus and Gemini)
- Learned effective team collaboration and new development tools

## 🚧 Challenges We Overcame

- Optimized flight data requests that initially took too long to load
- Integrated multiple APIs seamlessly
- Learned and implemented new technologies on a tight timeline

## 🔮 What's Next

- Deploy the site for public use
- Reduce API request load times
- Add more filtering and customization options
- Implement user accounts to save favorite destinations
- Expand to include hotel and activity recommendations

## 👥 Team

Built with ❤️ by the Travelio team

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Traveling! 🌍**
