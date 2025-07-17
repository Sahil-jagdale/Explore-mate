import GoogleMapReact from 'google-map-react';
import { makeStyles, styled, Typography, useMediaQuery } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Rating from '@mui/material/Rating';
import mapStyles from '../../mapStyles.js';
import {
    MapContainer,
    MarkerWrapper,
    PaperStyle,
    ImageBox,
} from './styles';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
    const isDesktop = useMediaQuery('(min-width:600px)');

    return (
        <MapContainer>
            <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
                center={coords}
                defaultCenter={coords}
                zoom={14}
                margin={[50, 50, 50, 50]}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: makeStyles,
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
                            <PaperStyle elevation={3}>
                                <Typography variant="subtitle2" gutterBottom noWrap>
                                    {place.name}
                                </Typography>
                                <ImageBox
                                    component="img"
                                    alt={place.name}
                                    src={
                                        place.photo?.images?.large?.url ||
                                        'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                                    }
                                />
                                <Rating size="small" value={Number(place.rating)} readOnly />
                            </PaperStyle>
                        ) : (
                            <LocationOnOutlinedIcon color="primary" fontSize="large" />
                        )}
                    </MarkerWrapper>
                ))}

                {weatherData?.list?.map((data, i) => (
                    <MarkerWrapper key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <ImageBox
                            component="img"
                            alt="weather icon"
                            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                        />
                    </MarkerWrapper>
                ))}
            </GoogleMapReact>
        </MapContainer>
    );
};

export default Map;