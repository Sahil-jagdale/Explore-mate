import { useState, useEffect, createRef } from 'react';
import {
    CircularProgress,
    Grid,
    Typography,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';

import PlaceDetails from '../PlaceDetails/PlaceDetails.jsx';
import {
    Container,
    LoaderBox,
    StyledFormControl,
    ListWrapper,
} from './styles';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }) => {
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) =>
            Array(places.length)
                .fill()
                .map((_, i) => refs[i] || createRef())
        );
    }, [places]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {type.charAt(0).toUpperCase() + type.slice(1)} around you.
            </Typography>

            {isLoading ? (
                <LoaderBox>
                    <CircularProgress size="5rem" />
                </LoaderBox>
            ) : (
                <>
                    <StyledFormControl variant="standard">
                        <InputLabel id="type">Type</InputLabel>
                        <Select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </StyledFormControl>

                    <StyledFormControl variant="standard">
                        <InputLabel id="rating">Rating</InputLabel>
                        <Select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="3">Above 3.0</MenuItem>
                            <MenuItem value="4">Above 4.0</MenuItem>
                            <MenuItem value="4.5">Above 4.5</MenuItem>
                        </Select>
                    </StyledFormControl>

                    <ListWrapper container spacing={3}>
                        {places?.map((place, i) => (
                            <Grid item key={i} sx={{ width: '100%' }} ref={elRefs[i]}>
                                <PlaceDetails
                                    selected={Number(childClicked) === i}
                                    refProp={elRefs[i]}
                                    place={place}
                                />
                            </Grid>
                        ))}
                    </ListWrapper>
                </>
            )}
        </Container>
    );
};

export default List;