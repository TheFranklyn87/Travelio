from amadeus import Client, ResponseError
from dotenv import load_dotenv
import os
import csv

# ========== 1. Load environment variables ==========
load_dotenv()
API_KEY = os.getenv("AMADEUS_API_KEY")
API_SECRET = os.getenv("AMADEUS_API_SECRET")

if not API_KEY or not API_SECRET:
    raise Exception("Please set your API key and secret in the .env file")

# ========== 2. Configure Amadeus client ==========
amadeus = Client(
    client_id=API_KEY,
    client_secret=API_SECRET
)

# ========== 3. Set search parameters ==========
origin = "YYZ"  # Your city (Toronto)
destinations = ["JFK", "LAX", "MIA"]  # List of destinations
departure_date = "2026-06-01"
adults = 1

# Prepare CSV file
csv_file = "flights.csv"
with open(csv_file, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["Origin", "Destination", "Airline", "Flight Number", "Departure", "Arrival", "Price"])

    # ========== 3. Loop over destinations ==========
    for dest in destinations:
        try:
            response = amadeus.shopping.flight_offers_search.get(
                originLocationCode=origin,
                destinationLocationCode=dest,
                departureDate=departure_date,
                adults=adults
            )

            # Sort flights by price (cheapest first)
            offers = sorted(response.data, key=lambda x: float(x["price"]["total"]))

            # Print and save each flight
            for flight in offers:
                itinerary = flight["itineraries"][0]["segments"][0]
                airline = itinerary["carrierCode"]
                flight_number = itinerary["number"]
                departure = itinerary["departure"]["at"]
                arrival = itinerary["arrival"]["at"]
                price = flight["price"]["total"]

                print(f"{origin} → {dest} | {airline} {flight_number}: {departure} → {arrival} | Price: {price}")

                # Write to CSV
                writer.writerow([origin, dest, airline, flight_number, departure, arrival, price])

        except ResponseError as error:
            print(f"Error searching {origin} → {dest}: {error.response.body}")

print(f"\nAll flight data saved to {csv_file}")