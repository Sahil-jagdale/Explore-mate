import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Chip,
    Rating,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const PlaceDetails = ({ place, selected, refProp }) => {
    if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    return (
        <Card elevation={6}>
            <CardMedia
                sx={{ height: 350 }}
                image={
                    place.photo?.images?.large?.url ||
                    'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                }
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {place.name}
                </Typography>

                <Box display="flex" justifyContent="space-between" my={2}>
                    <Rating name="read-only" value={Number(place.rating)} readOnly />
                    <Typography component="legend">
                        {place.num_reviews} review{place.num_reviews > 1 && 's'}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography component="legend">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {place.price_level}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography component="legend">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {place.ranking}
                    </Typography>
                </Box>

                {place?.awards?.map((award, i) => (
                    <Box
                        key={i}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        my={1}
                    >
                        <img src={award.images.small} alt={award.display_name} />
                        <Typography variant="subtitle2" color="textSecondary">
                            {award.display_name}
                        </Typography>
                    </Box>
                ))}

                {place?.cuisine?.map(({ name }) => (
                    <Chip
                        key={name}
                        size="small"
                        label={name}
                        sx={{ m: '5px 5px 5px 0' }}
                    />
                ))}

                {place.address && (
                    <Typography
                        gutterBottom
                        variant="body2"
                        color="textSecondary"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mt: 2,
                        }}
                    >
                        <LocationOnIcon sx={{ mr: 1 }} />
                        {place.address}
                    </Typography>
                )}

                {place.phone && (
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mt: 1,
                        }}
                    >
                        <PhoneIcon sx={{ mr: 1 }} />
                        {place.phone}
                    </Typography>
                )}
            </CardContent>

            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => window.open(place.web_url, '_blank')}
                >
                    Trip Advisor
                </Button>
                {place.website ? (
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => window.open(place.website, '_blank')}
                    >
                        Website
                    </Button>
                ) : (
                    <Button size="small" disabled>
                        Not Available
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default PlaceDetails;