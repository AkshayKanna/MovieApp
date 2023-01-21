import { createTheme } from '@mui/material/styles';

export const newTheme = createTheme({
    palette: {
        primary: {
            main: '#273244',
        },
        secondary: {
            main: '#00ccc2',
        },
        danger: {
            main: 'red',
        },
    },
    typography: {
        button: {
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 16,
            color: "#000000",
            fontWeight: 700,
            textTransform: 'none',
        },
        fontFamily: 'Open Sans, sans-serif',
        fontSize: 12,
        color: "white"
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "white"
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1F2A3C',
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    // "&.Mui-selected": {
                    //     color: '#00E0FF'
                    // }
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    minWidth: "40px"
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    paddingLeft: "45px",
                    paddingRight: "45px",
                    // "&.Mui-selected": {
                    //     color: '#00E0FF'
                    // }
                },
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 5,
                    background: '#00E0FF',
                    color: '#000000',
                    padding: '2px 20px',
                    outline: 'none !important',
                    boxShadow: "none",
                    '&:hover': {
                        background: '#00E0FF',
                        boxShadow: "none",
                    }
                },
                outlined: {
                    boxShadow: "none",
                    background: '#394B61',
                    color: "#00E0FF",
                    borderRadius: 5,
                    padding: '2px 20px',
                    outline: 'none !important',
                    borderColor: "#00E0FF",
                    '&:hover': {
                        borderColor: "#00E0FF",
                        background: '#394B61',
                        boxShadow: "none",
                    }
                },
            }
        },
    },
});

export default newTheme;