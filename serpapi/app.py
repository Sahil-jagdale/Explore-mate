from flask import Flask, request, jsonify
from api_key import my_api_key
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, origins=["https://explore-mate-three.vercel.app"])

def get_flight_details(api_key, from_city, to_city, outbound_date, return_date=None, currency="INR"):
    api_url = "https://serpapi.com/search"
    
    params = {
        "api_key": api_key,
        "engine": "google_flights",
        "departure_id": from_city,
        "arrival_id": to_city,
        "currency": currency
    }
    
    if return_date:
        params["type"] = "1"
        params["outbound_date"] = outbound_date
        params["return_date"] = return_date
    else:
        params["type"] = "2"
        params["outbound_date"] = outbound_date
    
    response = requests.get(api_url, params=params)
    
    if response.status_code == 200:
        flight_data = response.json()
        return flight_data
    else:
        return None

def format_flight_details(flight_details, currency="INR"):
    formatted_details = []
    for best_flight in flight_details.get('best_flights', []):
        for flight in best_flight.get('flights', []):
            departure_airport = flight['departure_airport']['name']
            arrival_airport = flight['arrival_airport']['name']
            departure_time = flight['departure_airport']['time']
            arrival_time = flight['arrival_airport']['time']
            duration = flight['duration']
            price = flight_details['price_insights']['lowest_price']
            booking_token = best_flight.get('booking_token')  # Extracting booking token
            formatted_flight = {
                "Departure Airport": departure_airport,
                "Arrival Airport": arrival_airport,
                "Departure Time": departure_time,
                "Arrival Time": arrival_time,
                "Duration (minutes)": duration,
                "Price (INR)": price,  # Always in INR
                "Booking Token": booking_token  # Adding booking token
            }
            formatted_details.append(formatted_flight)
    return formatted_details


def fetch_flight_prices(api_key, from_city, to_city, outbound_date, return_date=None, currency="INR", booking_token=None):
    api_url = "https://serpapi.com/search.json"
    
    params = {
        "engine": "google_flights",
        "departure_id": from_city,
        "arrival_id": to_city,
        "currency": currency,
        "api_key": api_key
    }

    if return_date:
        params["type"] = "1"
        params["outbound_date"] = outbound_date
        params["return_date"] = return_date
    else:
        params["type"] = "2"
        params["outbound_date"] = outbound_date

    if booking_token:
        params["booking_token"] = booking_token
    
    response = requests.get(api_url, params=params)
    
    if response.status_code == 200:
        return response.json()
    else:
        return None

def format_flight_prices(search_results):
    booking_options = search_results.get("booking_options", [])
    prices = {}
    for option in booking_options:
        together_info = option.get("together", {})
        airline = together_info.get("book_with")
        airline_logo = together_info.get("airline_logos")
        flight_number = together_info.get("marketed_as")
        price = together_info.get("price")
        #url = together_info.get("booking_request", {}).get("url")
        #booking_phone = together_info.get("booking_phone")
        prices[airline] = {
            "airline_name": airline,
            "price": price,
            "airline_logo": airline_logo,
            "flight_number": flight_number
        }
    return prices


@app.route('/flight-details', methods=['POST'])
def get_flight_details_route():
    data = request.json
    api_key = my_api_key
    from_city = data.get("from_city")
    to_city = data.get("to_city")
    trip_type = data.get("trip_type")
    outbound_date = data.get("outbound_date")
    return_date = data.get("return_date")
    currency = "INR"  # Always in INR as per requirement

    if trip_type not in ["1", "2"]:
        return jsonify({"error": "Invalid trip type. Choose 1 or 2."}), 400

    flight_details = get_flight_details(api_key, from_city, to_city, outbound_date, return_date, currency)
    if flight_details:
        formatted_details = format_flight_details(flight_details, currency)
        return jsonify(formatted_details)
    else:
        return jsonify({"error": "Failed to retrieve flight details."}), 500

@app.route('/flight', methods=['POST'])
def get_flight_prices_route():
    data = request.json
    api_key = my_api_key
    from_city = data.get("from_city")
    to_city = data.get("to_city")
    outbound_date = data.get("outbound_date")
    return_date = data.get("return_date")
    currency = "INR"  # Always in INR as per requirement

    # Get flight details
    flight_details = get_flight_details(api_key, from_city, to_city, outbound_date, return_date, currency)
    if not flight_details:
        return jsonify({"error": "Failed to retrieve flight details."}), 500

    # Format flight details and extract booking token
    formatted_details = format_flight_details(flight_details, currency)
    booking_token = formatted_details[0].get("Booking Token")  # Assuming there's only one flight, adjust this logic accordingly
    # Get flight prices using the booking token
    flight_prices = fetch_flight_prices(api_key, from_city, to_city, outbound_date, return_date, currency, booking_token)
    formatted_flight_prices = format_flight_prices(flight_prices)
    if flight_prices:
        return jsonify(formatted_flight_prices)
    else:
        return jsonify({"error": "Failed to retrieve flight prices."}), 500


if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=5001)
