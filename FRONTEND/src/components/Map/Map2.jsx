import { useEffect, useState } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { isPointWithinRadius } from 'geolib';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';

function Map2() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [distance, setDistance] = useState();
    const [focus, setFocus] = useState(false);

    const { speak } = useSpeechSynthesis();
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setDistance(result);
        },
    });

    useEffect(() => {
        getCurrentLocation();
    }, []);

    function voice(e) {
        if (e.keyCode === 45) {
            listen();
        } else if (e.keyCode === 27) {
            stop();
        } else if (e.keyCode === 46) {
            setDistance(0);
        }
    }

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) {
        return <div>Couldn't load Google Maps</div>;
    }

    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }

    const center = { lat: latitude, lng: longitude };

    const arr = [
        { lat: 10.99689, lng: 76.84891 },
        { lat: 11.1562, lng: 76.94184 },
        { lat: 10.98228, lng: 76.96913 },
        { lat: 11.03465, lng: 76.92852 },
        { lat: 11.00089, lng: 77.26264 },
        { lat: 11.10498, lng: 77.17504 },
        { lat: 10.86597, lng: 76.94056 },
        { lat: 11.05786, lng: 76.96552 },
        { lat: 11.0085, lng: 76.9562 },
        { lat: 11.0212, lng: 76.96424 },
        { lat: 11.01258, lng: 76.95065 },
        { lat: 12.96896, lng: 77.50196 },
        { lat: 11.66636, lng: 78.15791 },
        { lat: 11.41171, lng: 76.70387 },
        { lat: 11.34158, lng: 77.7251 },
    ];

    const nearbyUsers = arr.filter((loc) =>
        isPointWithinRadius(
            { latitude: loc.lat, longitude: loc.lng },
            { latitude: center.lat, longitude: center.lng },
            distance * 1000
        )
    );

    return (
        <div>
            <form>
                <div className="md:grid md:grid-cols-4 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="m-3 text-3xl font-medium text-gray-900 dark:text-white">Search Jobs</h3>
                            <label htmlFor="visitors" className="m-3 block text-sm font-medium text-gray-900 dark:text-gray-300">
                                Distance from your location (in Km's):
                            </label>
                            <input
                                type="number"
                                id="visitors"
                                className="m-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                value={distance}
                                min="0"
                                onChange={(e) => setDistance(e.target.value)}
                                onFocus={() => setFocus(true)}
                                onKeyDown={voice}
                                required
                            />
                        </div>
                        <div className="slidecontainer">
                            <input
                                type="range"
                                min="0"
                                max="150"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                                className="slider"
                                style={{ margin: '10px', width: '200px' }}
                                id="myRange"
                            />
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-3">
                        <div style={{ padding: '10px', width: '100%', height: '700px' }}>
                            <GoogleMap
                                center={center}
                                zoom={15}
                                mapContainerStyle={{ width: '100%', borderRadius: '10px', height: '100%' }}
                                options={{ streetViewControl: false }}
                                onClick={(ev) => {
                                    console.log('Latitude = ', ev.latLng.lat());
                                    console.log('Longitude = ', ev.latLng.lng());
                                }}
                            >
                                {nearbyUsers.map((item, index) => (
                                    <Marker key={index} position={item} />
                                ))}
                            </GoogleMap>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Map2;
