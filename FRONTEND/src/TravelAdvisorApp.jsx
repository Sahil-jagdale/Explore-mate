import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import List from './components/List/List';
import Map from './components/Map/Map';
import Header from './components/Header/Header';
import { getPlacesData, getWeatherData } from './api/travelAdvisorAPI';

const TravelAdvisorApp = () => {
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [coords, setCoords] = useState({ lat: 20.5937, lng: 78.9629 }); // Example: Center of India
    const [bounds, setBounds] = useState(null);
    const [weatherData, setWeatherData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [places, setPlaces] = useState([]);
    const [autocomplete, setAutocomplete] = useState(null);
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoords({ lat: latitude, lng: longitude });
        });
    }, []);

    useEffect(() => {
        setBounds({
            sw: { lat: 18.4, lng: 73.7 },
            ne: { lat: 18.7, lng: 74.0 },
        });
    }, []);


    useEffect(() => {
        if (Array.isArray(places)) {
            const filtered = places.filter(
                (place) => Number(place.rating) > Number(rating)
            );

            setFilteredPlaces(filtered);
        } else {
            setFilteredPlaces([]);
        }
    }, [rating, places]);

    useEffect(() => {
        if (bounds) {
            setIsLoading(true);
            getWeatherData(coords.lat, coords.lng)
                .then((data) => setWeatherData(data));
            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    setPlaces(Array.isArray(data) ? data.filter((place) => place.name && place.num_reviews > 0) : []);
                    console.log("API places data:", data);
                    setFilteredPlaces([]);
                    setRating('');
                    setIsLoading(false);
                });
        }
    }, [bounds, type]);

    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoords({ lat, lng });
    };

    return (
        <>
            <CssBaseline />
            <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
            <Grid spacing={3} container sx={{ flexGrow: 1 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <List
                        isLoading={isLoading}
                        childClicked={childClicked}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }} py={5} px={5}>
                    <Map
                        setChildClicked={setChildClicked}
                        setBounds={setBounds}
                        setCoords={setCoords}
                        coords={coords}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default TravelAdvisorApp;