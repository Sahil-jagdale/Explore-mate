/* eslint-disable consistent-return */
import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
    try {
        const response = await axios.get(
            `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
            {
                params: {
                    bl_latitude: sw.lat,
                    bl_longitude: sw.lng,
                    tr_longitude: ne.lng,
                    tr_latitude: ne.lat,
                },
                headers: {
                    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_TRAVEL_API_KEY,
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
                },
            }
        );

        console.log("Raw API response:", response); // <---- ADD THIS

        const places = response?.data?.data || [];
        return places;
    } catch (error) {
        console.error('Failed to fetch places data:', error);
        return [];
    }
};




const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // or process.env.REACT_APP_WEATHER_API_KEY for CRA

export const getWeatherData = async (lat, lng) => {
    try {
        if (lat && lng) {
            const { data } = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lng}`
            );
            return data;
        }
    } catch (error) {
        console.log('WeatherAPI error:', error);
    }
};