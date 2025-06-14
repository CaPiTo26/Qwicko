import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import {
    Box,
    BottomNavigation,
    BottomNavigationAction,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    useMediaQuery,
    AppBar,
    Typography,
    IconButton,
    Divider
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';

// ====== THEME CONFIGURATION ======
const theme = createTheme({
    palette: {
        primary: {
            main: '#D4AF37',          // gold accent
        },
        background: {
            default: '#faf7f2',       // warm off-white
            paper: '#fffdf9',         // ivory for drawers/cards
        },
        text: {
            primary: '#333333',       // dark text
        },
        action: {
            selected: 'rgba(212,175,55,0.1)', // light gold highlight
        }
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#fffdf9',
                }
            }
        },
        MuiBottomNavigationAction: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: '#D4AF37',     // gold when selected
                    }
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(212,175,55,0.1)', // gold background on select
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#D4AF37',       // gold icons
                }
            }
        }
    }
});

// ====== LAYOUT WIDTHS ======
const expandedWidth = 280;
const collapsedWidth = 64;

function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const themeInner = useTheme();

    const isMobile = useMediaQuery(themeInner.breakpoints.down('md'));
    const isDesktop = useMediaQuery(themeInner.breakpoints.up('md'));

    const [value, setValue] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    useEffect(() => {
        const routes = ['/', '/search', '/chat', '/menu'];
        const idx = routes.indexOf(location.pathname);
        setValue(idx > -1 ? idx : 0);
    }, [location]);

    const handleNavigation = (_event, newValue) => {
        setValue(newValue);
        const paths = ['/', '/search', '/chat', '/menu'];
        navigate(paths[newValue] || '/');
        // Fermer le drawer mobile après navigation
        if (isMobile) {
            setMobileDrawerOpen(false);
        }
    };

    const navItems = [
        { label: 'Home', icon: <HomeIcon /> },
        { label: 'Search', icon: <SearchIcon /> },
        { label: 'Chat', icon: <ChatIcon /> },
        { label: 'Menu', icon: <MenuIcon /> }
    ];

    const toggleDrawer = () => {
        if (isMobile) {
            setMobileDrawerOpen(!mobileDrawerOpen);
        } else {
            setSidebarOpen(!sidebarOpen);
        }
    };

    // Contenu du drawer
    const drawerContent = (
        <>
            <Toolbar sx={{
                justifyContent: isDesktop && sidebarOpen ? 'space-between' : 'center',
                px: 1,
                minHeight: 64,
                height: 64
            }}>
                {(!isMobile || mobileDrawerOpen) && (isDesktop ? sidebarOpen : true) && (
                    <Typography variant="h6" sx={{ color: themeInner.palette.primary.main }}>
                        My App
                    </Typography>
                )}
                <IconButton onClick={toggleDrawer}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem
                        key={item.label}
                        disablePadding
                        sx={{
                            justifyContent: isDesktop && sidebarOpen ? 'initial' : 'center'
                        }}
                    >
                        <ListItemButton
                            selected={value === index}
                            onClick={(e) => handleNavigation(e, index)}
                            sx={{ px: 2.5 }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: (isDesktop && sidebarOpen) || isMobile ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: value === index ? themeInner.palette.primary.main : themeInner.palette.text.primary
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {((isDesktop && sidebarOpen) || isMobile) && (
                                <ListItemText
                                    primary={item.label}
                                    sx={{ '& .MuiListItemText-primary': { fontWeight: 500 } }}
                                />
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <Box sx={{
            display: 'flex',
            bgcolor: themeInner.palette.background.default,
            minHeight: '100vh'
        }}>

            {/* Desktop Sidebar */}
            {isDesktop && (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: sidebarOpen ? expandedWidth : collapsedWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: sidebarOpen ? expandedWidth : collapsedWidth,
                            boxSizing: 'border-box',
                            borderRight: '1px solid ' + themeInner.palette.divider,
                            transition: themeInner.transitions.create('width', {
                                easing: themeInner.transitions.easing.sharp,
                                duration: themeInner.transitions.duration.enteringScreen
                            })
                        }
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}

            {/* Mobile Drawer */}
            {isMobile && (
                <Drawer
                    variant="temporary"
                    open={mobileDrawerOpen}
                    onClose={() => setMobileDrawerOpen(false)}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: 280,
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}
            >
                {/* AppBar for Mobile */}
                {isMobile && (
                    <AppBar
                        position="fixed"
                        color="inherit"
                        elevation={1}
                        sx={{
                            bgcolor: '#ffffff',
                            zIndex: themeInner.zIndex.drawer + 1,
                            height: 64
                        }}
                    >
                        <Toolbar sx={{ minHeight: 64, height: 64 }}>
                            <IconButton
                                edge="start"
                                onClick={toggleDrawer}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" sx={{ color: themeInner.palette.text.primary }}>
                                My App
                            </Typography>
                        </Toolbar>
                    </AppBar>
                )}

                {/* Content Container */}
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        pt: isMobile ? '64px' : 3, // Space for AppBar on mobile
                        pb: isMobile ? '64px' : 3, // Space for BottomNavigation on mobile
                        px: { xs: 2, md: 3 },
                        minHeight: isMobile ? 'calc(100vh - 128px)' : 'auto',
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: { xs: '100%', sm: 500, md: 800, lg: 1000 },
                            margin: isMobile ? '5%' : 'auto',

                            mx: 'auto',
                            width: '100%',
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        id={'main-content'}
                    >
                        <Outlet />
                    </Box>
                </Box>

                {/* Bottom Navigation for Mobile */}
                {isMobile && (
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: themeInner.zIndex.appBar
                        }}
                    >
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={handleNavigation}
                            sx={{
                                borderTop: `1px solid ${themeInner.palette.divider}`,
                                bgcolor: '#ffffff',
                                height: 64,
                                minHeight: 64
                            }}
                        >
                            {navItems.map(item => (
                                <BottomNavigationAction
                                    key={item.label}
                                    label={item.label}
                                    icon={item.icon}
                                    sx={{
                                        '&.Mui-selected': {
                                            color: themeInner.palette.primary.main,
                                        }
                                    }}
                                />
                            ))}
                        </BottomNavigation>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

// ====== APP ENTRYPOINT ======
export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Layout />
        </ThemeProvider>
    );
}