from amadeus import Client, ResponseError
from dotenv import load_dotenv
import os
import csv
from datetime import datetime, timedelta
import random


# First step : Load API credentials
load_dotenv()
API_KEY = os.getenv("AMADEUS_API_KEY")
API_SECRET = os.getenv("AMADEUS_API_SECRET")

if not API_KEY or not API_SECRET:
    raise Exception("Please set your API key and secret in the .env file")

# Second step : Configure Amadeus client
amadeus = Client(client_id=API_KEY, client_secret=API_SECRET)

# Third step : User input
departure_airport = input("Enter your departure airport code (e.g., YVR): ").upper()
destinations = ["YYZ", "JFK", "LAX", "ORD", "LHR", "CDG", "FRA", "NRT", "SYD", "DXB", "HKG", "SFO"]

# 4th step : Departure and return dates
departure_date = datetime.now() + timedelta(weeks=2)
vacation_length = random.randint(3, 7)  # vacation 3–7 days
return_date = departure_date + timedelta(days=vacation_length)

departure_str = departure_date.strftime("%Y-%m-%d")
return_str = return_date.strftime("%Y-%m-%d")

# 5th step : CSV setup
csv_file = "cheapest_roundtrips.csv"

# Create CSV if it doesn't exist
if not os.path.exists(csv_file):
    with open(csv_file, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["Origin", "Destination", "DepartureDate", "ReturnDate", "Price"])

# 6th step : Loop over destinations
for dest in destinations:
    try:
        response = amadeus.shopping.flight_offers_search.get(
            originLocationCode=departure_airport,
            destinationLocationCode=dest,
            departureDate=departure_str,
            returnDate=return_str,
            adults=1,
            max=50
        )

        if response.data:
            cheapest_flight = min(response.data, key=lambda f: float(f["price"]["total"]))
            current_price = float(cheapest_flight["price"]["total"])

            print(f"Cheapest round-trip: {departure_airport} → {dest} → {departure_airport} | Price: {current_price}")

            with open(csv_file, "a", newline="") as f:
                writer = csv.writer(f)
                writer.writerow([departure_airport, dest, departure_str, return_str, current_price])

        else:
            print(f"No flights found for {departure_airport} → {dest}")

    except ResponseError as e:
        print(f"Error searching {departure_airport} → {dest}: {e.response.body}")

print(f"\nAll cheapest round-trip flights saved to {csv_file}")
