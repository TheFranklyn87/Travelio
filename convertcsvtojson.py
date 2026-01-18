import csv
import json

csv_file = "cheapest_roundtrips.csv"
json_file = "cheapest_roundtrips.json"

with open(csv_file, newline="") as f:
    reader = csv.DictReader(f)
    data = list(reader)

for d in data:
    d["Price"] = float(d["Price"])
    d["AveragePrice"] = float(d["AveragePrice"])

with open(json_file, "w") as f:
    json.dump(data, f, indent=2)

print(f"Converted {csv_file} → {json_file}")
