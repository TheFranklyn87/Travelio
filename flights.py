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

DESTINATIONS = ["YQB", "SFO", "LAS", "HND", "LHR", "CDG", "JFK", "LAX", "DXB"]
MIN_TRIP_DAYS = 5
MAX_TRIP_DAYS = 7

# Third step : User input
departure_airport = input("Departure airport (e.g., YVR): ").upper()
start_date = datetime.strptime(input("Enter start date of search (YYYY-MM-DD): "), "%Y-%m-%d")

# 4th step : Departure and return dates
end_date = start_date + timedelta(days=29)
week_dates = [start_date + timedelta(days=i) for i in range(30)]

# 5th step : CSV setup
csv_file = "cheapest_roundtrips.csv"

# Create CSV if it doesn't exist
if not os.path.exists(csv_file):
    with open(csv_file, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["Origin", "Destination", "DepartureDate", "ReturnDate", "Price"])


# 6th step : Loop over destinations
for dest in DESTINATIONS:
    print(f"\n🔍 Scanning {departure_airport} → {dest}")

    cheapest_for_dest = None
    all_prices = []

    for depart_date in week_dates:
        for trip_len in range(MIN_TRIP_DAYS, MAX_TRIP_DAYS + 1):
            return_date = depart_date + timedelta(days=trip_len)
            if return_date > end_date:
                continue

            try:
                response = amadeus.shopping.flight_offers_search.get(
                    originLocationCode=departure_airport,
                    destinationLocationCode=dest,
                    departureDate=depart_date.strftime("%Y-%m-%d"),
                    returnDate=return_date.strftime("%Y-%m-%d"),
                    adults=1,
                    max=1
                )

                if response.data:
                    offer = min(response.data, key=lambda f: float(f["price"]["total"]))
                    price = float(offer["price"]["total"])
                    airline = offer["validatingAirlineCodes"][0]

                    all_prices.append(price)

                    if (cheapest_for_dest is None) or (price < cheapest_for_dest["price"]):
                        cheapest_for_dest = {
                            "depart": depart_date,
                            "return": return_date,
                            "price": price,
                            "airline": airline
                        }

            except ResponseError:
                print(f"⚠️ No data found")
                continue

    avg_price = sum(all_prices) / len(all_prices) if all_prices else 0

    # 7th step : Print the cheapest flight for this destination
    if cheapest_for_dest:
        print(f" Cheapest {departure_airport} → {dest}:")
        print(f"   ✈️ Airline: {cheapest_for_dest['airline']}")
        print(f"   📅 Depart: {cheapest_for_dest['depart'].strftime('%Y-%m-%d')}")
        print(f"   📅 Return: {cheapest_for_dest['return'].strftime('%Y-%m-%d')}")
        print(f"   ⏱ Stay: {(cheapest_for_dest['return'] - cheapest_for_dest['depart']).days} days")
        print(f"   💵 Price: ${cheapest_for_dest['price']:.2f}")
        print(f"   📊 Average price for all trips in search: ${avg_price:.2f}")

        with open(csv_file, "a", newline="") as f:
            writer = csv.writer(f)
            writer.writerow([
                departure_airport,
                dest,
                cheapest_for_dest['depart'].strftime('%Y-%m-%d'),
                cheapest_for_dest['return'].strftime('%Y-%m-%d'),
                cheapest_for_dest['price'],
                round(avg_price, 2)
            ])
    else:
        print(f"No flights found for {departure_airport} → {dest}")