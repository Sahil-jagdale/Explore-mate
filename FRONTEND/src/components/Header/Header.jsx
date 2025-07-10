import { Autocomplete } from '@react-google-maps/api';
import {
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = ({ onPlaceChanged, onLoad }) => {
    return (
        <></>
        // <AppBar position="static" sx={{ background: '#0a3570' }}>
        //     <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        //         <Typography variant="h5" sx={{ fontWeight: 700 }}>
        //             ExploreMate
        //         </Typography>
        //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        //             <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 400 }}>
        //                 Explore new places
        //             </Typography>
        //             <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        //                 <Box
        //                     sx={{
        //                         display: 'flex',
        //                         alignItems: 'center',
        //                         background: '#fff',
        //                         borderRadius: 1,
        //                         pl: 1,
        //                         boxShadow: 1,
        //                         minWidth: 220,
        //                     }}
        //                 >
        //                     <SearchIcon sx={{ color: '#0a3570', mr: 1 }} />
        //                     <InputBase
        //                         placeholder="Search…"
        //                         sx={{
        //                             flex: 1,
        //                             color: '#0a3570',
        //                             fontWeight: 500,
        //                             '& input': { p: 1 },
        //                         }}
        //                     />
        //                 </Box>
        //             </Autocomplete>
        //         </Box>
        //     </Toolbar>
        // </AppBar>
    );
};

export default Header;