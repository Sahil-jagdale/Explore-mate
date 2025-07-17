from flask import Flask, render_template, request, jsonify
import pandas as pd
from datetime import datetime
import time
from fn1 import recommend_attractions, recommend_hotels, recommend_restaurants
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://explore-mate-theta.vercel.app/"])

# Define routes for different recommendations
@app.route('/')
def home():
    return "Hello!! Welcome to ExploreMate....."

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    # Get user preferences from the form
    # Example: duration, budget, travel dates, etc.
    user_preferences = request.json

    answer = None

    if request.method == 'POST':
        user_location = user_preferences['location']
        user_start_date = user_preferences['Start_date']
        user_end_date = user_preferences['end_date']
        user_budget = user_preferences['budget']

    # Calculate the number of days between the start and end dates
    start_date = datetime.strptime(user_start_date, "%Y-%m-%d")
    end_date = datetime.strptime(user_end_date, "%Y-%m-%d")
    num_days = (end_date - start_date).days

    # Use the recommendation systems to get tailored recommendations
    attractions_recommendations = recommend_attractions(user_location)
    time.sleep(1)
    hotels_recommendations = recommend_hotels(user_location, budget=user_budget, num_days=num_days)
    time.sleep(1)
    restaurants_recommendations = recommend_restaurants(user_location, budget=user_budget)

    recomm=[attractions_recommendations,hotels_recommendations, restaurants_recommendations]
    # Pass the recommendations to the template for display
    return jsonify({'answer': recomm})

if __name__ == '__main__':
    app.run(debug=True)