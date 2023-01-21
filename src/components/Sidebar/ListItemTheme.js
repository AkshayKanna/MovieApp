import { createTheme } from '@mui/material/styles';

export const ListItemTheme = createTheme({
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
        MuiListItem: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    "&.Mui-selected": {
                        color: '#00E0FF'
                    }
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
                    "&.Mui-selected": {
                        color: '#00E0FF'
                    }
                },
            }
        },
    },
});

export default ListItemTheme;