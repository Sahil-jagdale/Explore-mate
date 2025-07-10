import GoogleMapReact from 'google-map-react';
import { Box, Paper, Typography, useMediaQuery } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Rating from '@mui/material/Rating';

import mapStyles from '../../mapStyles';

const MarkerWrapper = ({ children, ...props }) => {
    const {
        $hover, $geoService, $prerender, $dimensionKey, $getDimensions, $onMouseAllow,
        ...cleanProps
    } = props;

    return (
        <Box
            {...cleanProps}
            sx={{ position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 } }}
        >
            {children}
        </Box>
    );
};

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
    const isDesktop = useMediaQuery('(min-width:600px)');

    return (
        <Box sx={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
                center={coords}
                zoom={14}
                margin={[50, 50, 50, 50]}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: mapStyles,
                }}
                onChange={(e) => {
                    setCoords({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                    <MarkerWrapper
                        key={i}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                    >
                        {isDesktop ? (
                            <Paper

                                elevation={3}
                                sx={{ p: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 100 }}
                            >
                                <Typography variant="subtitle2" gutterBottom noWrap>
                                    {place.name}
                                </Typography>
                                <img
                                    alt={place.name}
                                    src={place.photo?.images?.large?.url || 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                    width="100%"
                                    height="70"
                                    style={{ objectFit: 'cover' }}
                                />
                                <Rating size="small" value={Number(place.rating)} readOnly />
                            </Paper>
                        ) : (
                            <LocationOnOutlinedIcon color="primary" fontSize="large" />
                        )}
                    </MarkerWrapper>
                ))}

                {weatherData?.list?.map((data, i) => (
                    <MarkerWrapper key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img
                            alt="weather icon"
                            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                            height="70px"
                        />
                    </MarkerWrapper>
                ))}
            </GoogleMapReact>
        </Box>
    );
};

export default Map;
