import React, { useState, useEffect } from 'react';
import {
    Stack,
    AppBar,
    Box,
    CssBaseline,
    Divider,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Avatar,
    InputBase,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    styled,
    Grid,
    LinearProgress,
    linearProgressClasses,
    Button,
    Grow,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import TvIcon from '@mui/icons-material/Tv';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import UpdateIcon from '@mui/icons-material/Update';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LightModeIcon from '@mui/icons-material/LightMode';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { images } from '../../constants';
import { ThemeProvider } from '@mui/material/styles';
import listItemTheme from '../Sidebar/ListItemTheme';

import movieData from "../../data/jsonData";
import "./Sidebar.css";

const drawerWidth = 275;

/**
 * Custom styled component for Search bar
 */
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 8,
    transition: "0.5s",
    backgroundColor: '#1A2536',
    '&:hover': {
        backgroundColor: '#1A2536',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        fontSize: 21,
        // fontWeight: 600,
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        [theme.breakpoints.up('lg')]: {
            width: '50ch',
        },
    },
}));

/**
 * Custom styled component to display all cards
 */
const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: "11px",
    boxShadow: 'none',
    backgroundColor: '#394B61',
    padding: "10px",
    // [theme.breakpoints.only("sm")]: {
    //     width: 345
    // },
    // [theme.breakpoints.down("md")]: {
    //     width: 290
    // },
    // [theme.breakpoints.up("md")]: {
    //     maxWidth: 178,
    //     width: "178px",
    // },
    // [theme.breakpoints.up("lg")]: {
    //     maxWidth: 178,
    //     width: "178px",
    // },
}));
const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    height: 195,
    minHeight: 195,
    borderRadius: "0.5rem",
    cursor: "pointer"
}));
const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: "10px 0px 0px 2px"
}));
const StyledCardActions = styled(CardActions)(({ theme }) => ({
    color: 'white',
    padding: 0
}));
const StyledCardIconButtons = styled(CardActions)(({ theme }) => ({
    padding: "5px"
}));

/**
 * Custom styled component to display a single card
 */
const StyledFullDetailViewCardMedia = styled(CardMedia)(({ theme }) => ({
    height: 350,
    minHeight: 350,
    borderRadius: "0.5rem",
    [theme.breakpoints.only("sm")]: {
        display: "none"
    },
    [theme.breakpoints.down("md")]: {
        display: "none"
    },
    [theme.breakpoints.up("md")]: {
        width: 350,
    },
    [theme.breakpoints.up("lg")]: {
        width: 350,
    },
}));
const StyledFullDetailViewCardContent = styled(CardContent)(({ theme }) => ({
    margin: "10px 0px",
}));
const StyledBoxForProgress = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        width: '45%'
    },
    [theme.breakpoints.up("md")]: {
        width: '14%'
    },
    [theme.breakpoints.up("lg")]: {
        width: '14%'
    },
}));
const CardButton = styled('div')(({ theme }) => ({
    marginTop: 20,
    display: 'flex',
    gap: '2%',
    [theme.breakpoints.down("md")]: {
        display: 'none',
    },
}));

/**
 * Custom styled component for progress bar
 */
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#283647',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#00E0FF',
    },
}));

/**
 * Custom styled component to show read more information
 */
const StyledReadMoreTypography = styled(Typography)(({ theme }) => ({
    fontSize: 14,
    fontWeight: 400,
    [theme.breakpoints.down("md")]: {
        width: 290
    },
    // [theme.breakpoints.up("md")]: {
    //     maxWidth: 178,
    //     width: "178px",
    // },
    // [theme.breakpoints.up("lg")]: {
    //     maxWidth: 178,
    //     width: "178px",
    // },
}));

var filterSingleData = [];

const Sidebar = () => {
    const [allMoviesData, setAllMoviesData] = useState([]);
    const [singleMoviesData, setSingleMoviesData] = useState([]);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [fadeTimeout, setFadeTimeout] = useState(0);
    const [isReadMore, setIsReadMore] = useState(true);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    /**
     * Custom styled component to display a single card
     */
    const StyledFullDetailViewCard = styled(Card)(({ theme }) => ({
        borderRadius: "11px",
        boxShadow: 'none',
        backgroundColor: '#394B61',
        height: 350,
        [theme.breakpoints.only("sm")]: {
            width: 300
        },
        [theme.breakpoints.down("md")]: {
            minHeight: singleMoviesData.length && singleMoviesData[0].Plot.length < 150 ? 300 : 400
        },
        [theme.breakpoints.up("md")]: {
            minHeight: 350
        },
    }));

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    /**
     * Handle change function for the toggle button of the navigation menu 
     */
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    /**
     * Handle change function for the search 
     */
    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    }

    useEffect(() => {
        if (movieData.length) {
            setAllMoviesData(movieData);
        }
    }, []);

    /**
     * Function to render the component of the side bar
     */
    const drawer = (
        <div>
            <Stack
                sx={{ width: "100%" }}
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{
                    margin: "3rem 0rem 1rem"
                }}
            >
                <Avatar
                    alt="Remy Sharp"
                    src={images.profile}
                    sx={{ width: 100, height: 100 }}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSingleMoviesData([])}
                />
            </Stack>
            <Stack
                sx={{ width: "100%" }}
                direction="row"
                justifyContent="center"
            >
                <Typography variant="h6" gutterBottom style={{
                    color: "white"
                }}>
                    Eric Hoffman
                </Typography>
            </Stack>
            <Divider style={{ borderColor: "#394B61" }} />
            <ThemeProvider theme={listItemTheme}>
                <List>
                    {['Discover', 'Playlist', 'Movie', 'TV Shows', 'My List'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(event, index)}>
                                <ListItemIcon style={{
                                    color: selectedIndex === index ? '#00E0FF' : "white"
                                }}>
                                    {
                                        text === "Discover" ? (
                                            <SearchIcon />
                                        ) : text === "Playlist" ? (
                                            <PlaylistPlayIcon />
                                        ) : text === "Movie" ? (
                                            <LiveTvIcon />
                                        ) : text === "TV Shows" ? (
                                            <TvIcon />
                                        ) : (
                                            <FormatListBulletedIcon />
                                        )
                                    }
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </ThemeProvider>
            <Divider style={{ borderColor: "#394B61" }} />
            <List>
                {['Watch Later', 'Recommended'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {text === "Watch Later" ? <UpdateIcon /> : <FavoriteBorderIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider style={{ borderColor: "#394B61" }} />
            <List>
                {['Settings', 'Logout'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {text === "Settings" ? <SettingsIcon /> : <LogoutIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    useEffect(() => {
        if (searchValue !== '') {
            let arr = (allMoviesData || []).filter(u =>
                u.Title.toString().trim().toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
                u.Year.toString().trim().toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
                u.Rated.toString().trim().toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
                u.Runtime.toString().trim().toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
                u.Genre.toString().trim().toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
                u.Director.toString().trim().toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
                u.Actors.toString().trim().toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
                u.Language.toString().trim().toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
                u.Metascore.toString().trim().toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
                u.imdbRating.toString().trim().toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
                u.Type.toString().trim().toLowerCase().indexOf(searchValue.toLowerCase()) > -1
            );
            setAllMoviesData(arr);
        } else if (searchValue === "" || searchValue === null || searchValue === undefined) {
            setAllMoviesData(movieData);
        }
    }, [searchValue, allMoviesData]);

    const filterParticularMovieData = (title) => {
        setFadeTimeout(2000);
        filterSingleData = allMoviesData.filter(item => item.Title === title);
        setSingleMoviesData([...filterSingleData]);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon style={{
                                width: 23, height: 23
                            }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Title, Movie"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearch}
                            value={searchValue}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton size="large" aria-label="search" color="inherit">
                        <LightModeIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="display more actions"
                        edge="end"
                        color="inherit"
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <div style={{
                    margin: "3rem 0rem",
                }}>
                    {
                        allMoviesData.length === 0 && (
                            <Typography variant='h6' style={{
                                fontSize: 15,
                                fontWeight: 600
                            }}>No results found for your search.</Typography>
                        )
                    }
                    {
                        singleMoviesData.length ? (
                            (singleMoviesData || []).map((data, i) => {
                                return (
                                    <Grow
                                        in
                                        timeout={fadeTimeout}
                                    >
                                        <Grid container style={{
                                            margin: "1rem 0rem"
                                        }}>
                                            <Grid key={i} item xs={12} sm={12} md={12} lg={12}>
                                                <StyledFullDetailViewCard sx={{ display: 'flex' }}>
                                                    <StyledFullDetailViewCardMedia
                                                        component="img"
                                                        sx={{ width: 151 }}
                                                        image={data.Poster}
                                                        alt={data.Title}
                                                    />
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                                                        <StyledFullDetailViewCardContent sx={{ flex: '1 0 auto' }}>
                                                            <Typography component="div" variant="h4" style={{
                                                                fontWeight: 700,
                                                                marginBottom: "8px"
                                                            }}>
                                                                {data.Title}
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 15 }} style={{
                                                                marginBottom: 20
                                                            }}>
                                                                <StyledBoxForProgress sx={{ width: '100%', mr: 1 }}>
                                                                    <BorderLinearProgress variant="determinate" value={data.Metascore} />
                                                                </StyledBoxForProgress>
                                                                <Box sx={{ minWidth: 35 }}>
                                                                    <Typography variant="h6" style={{
                                                                        fontSize: "16px",
                                                                        fontWeight: 600
                                                                    }}>{data.imdbRating}/10</Typography>
                                                                </Box>
                                                            </Box>
                                                            <Grid container spacing={2}>
                                                                <Grid style={{ paddingTop: 5 }} item xs={6} lg={3} md={3} sm={12}>
                                                                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                                                                        Year:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid style={{ paddingTop: 5 }} item xs={6} lg={9} md={6} sm={12}>
                                                                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                                                                        {data.Year}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid style={{ paddingTop: 5 }} item xs={6} lg={3} md={6} sm={12}>
                                                                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                                                                        Running Time:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid style={{ paddingTop: 5 }} item xs={6} lg={9} md={6} sm={12}>
                                                                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                                                                        {data.Runtime}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid style={{ paddingTop: 5 }} item xs={6} lg={3} md={6} sm={12}>
                                                                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                                                                        Directed By:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid style={{ paddingTop: 5 }} item xs={6} lg={9} md={6} sm={12}>
                                                                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                                                                        {data.Director}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid style={{ paddingTop: 5 }} item xs={6} lg={3} md={6} sm={12}>
                                                                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                                                                        Language:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid style={{ paddingTop: 5 }} item xs={6} lg={9} md={6} sm={12}>
                                                                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                                                                        {data.Language}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid style={{ paddingTop: 15 }} item xs={12} lg={12} md={12} sm={12}>
                                                                    <StyledReadMoreTypography>
                                                                        {isReadMore ? data.Plot.slice(0, 150) : data.Plot}
                                                                        {
                                                                            data.Plot.length > 150 && (
                                                                                <span onClick={toggleReadMore} className="read-or-hide" style={{
                                                                                    cursor: "pointer",
                                                                                }}>
                                                                                    {isReadMore ? "  (  Read more . . . ) " : "  ( . . . See less )"}
                                                                                </span>
                                                                            )
                                                                        }
                                                                    </StyledReadMoreTypography>
                                                                </Grid>
                                                            </Grid>
                                                            <CardButton>
                                                                <Button variant="contained">Play Movie</Button>
                                                                <Button variant="outlined">Watch Trailer</Button>
                                                            </CardButton>
                                                        </StyledFullDetailViewCardContent>
                                                    </Box>
                                                </StyledFullDetailViewCard>
                                            </Grid>
                                        </Grid>
                                    </Grow>
                                )
                            })
                        ) : null
                    }

                    <Grid container spacing={2} key='grid_movie'>
                        {
                            (allMoviesData || []).map((item, i) => {
                                return (
                                    <Grid key={i} item xs={12} sm={12} md={4} lg={3}>
                                        <StyledCard sx={{ maxWidth: 345 }}>
                                            <StyledCardMedia
                                                sx={{ height: 150 }}
                                                image={item.Poster}
                                                title={item.Title}
                                                onClick={() => { filterParticularMovieData(item.Title) }}
                                            />
                                            <StyledCardContent>
                                                <Typography gutterBottom component="div" style={{
                                                    fontSize: 15,
                                                    fontWeight: 600
                                                }}>
                                                    {item.Title}
                                                </Typography>
                                            </StyledCardContent>
                                            <StyledCardActions>
                                                <StyledCardIconButtons size="large" aria-label="search" color="inherit">
                                                    <PlayCircleOutlineIcon />
                                                </StyledCardIconButtons>
                                                <StyledCardIconButtons size="large" aria-label="search" color="inherit">
                                                    <AddCircleOutlineIcon />
                                                </StyledCardIconButtons>
                                            </StyledCardActions>
                                        </StyledCard>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
            </Box>
        </Box>
    );
}
export default Sidebar;