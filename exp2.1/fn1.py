import os
from dotenv import load_dotenv
import requests
from requests.adapters import HTTPAdapter
load_dotenv()

url = "https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete"
# querystring = {"query":location,"budget":budget,"lang":"en_US","units":"km"}

headers = {
	"X-RapidAPI-Key": os.getenv("RAPIDAPI_KEY"),
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com"
}

def recommend_attractions(location):
    print("Searching for recommendations locations")
    querystring = {"query":location,"lang":"en_US","units":"km"}
    response_act = requests.get(url, headers=headers, params=querystring)
    # print(type(response))
    # if response.status_code == 200:
    #     attractions_data = response.json()
    #     attractions = attractions_data['attractions']
    #     for i in range(min(5, len(attractions))):
    #         print(attractions[i])
    # else:
    #     print("Failed to fetch attractions data:", response.status_code)
    # print(response_act.json())

    return (response_act.json())

def recommend_hotels(location, budget, num_days):
    print("Searching for recommendations hotel")
    querystring = {"query":location,"budget":budget,"num_days":num_days,"lang":"en_US","units":"km"}
    response_hotel = requests.get(url, headers=headers, params=querystring)
    # print(type(response))
    # if response.status_code == 200:
    #     attractions_data = response.json()
    #     attractions = attractions_data['attractions']
    #     for i in range(min(5, len(attractions))):
    #         print(attractions[i])
    # else:
    #     print("Failed to fetch attractions data:", response.status_code)
    # print(response_hotel.json())

    return (response_hotel.json())


def recommend_restaurants(location, budget):
    print("Searching for recommendations food")
    querystring = {"query":location,"budget":budget,"lang":"en_US","units":"km"}
    response_food = requests.get(url, headers=headers, params=querystring)
    # print(type(response))
    # if response.status_code == 200:
    #     attractions_data = response.json()
    #     attractions = attractions_data['attractions']
    #     for i in range(min(5, len(attractions))):
    #         print(attractions[i])
    # else:
    #     print("Failed to fetch attractions data:", response.status_code)
    # print(response_food.json())

    return (response_food.json())
# # Example usage
# location = 'Mumbai'
# budget = 'medium'
# num_days = 3