import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
    useTheme,
    AppBar,
    Typography,
    IconButton,
    Divider
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';

const expandedWidth = 240;
const collapsedWidth = 56;

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const routes = ['/', '/search', '/chat', '/menu'];
        const idx = routes.indexOf(location.pathname);
        setValue(idx > -1 ? idx : 0);
    }, [location]);

    const handleNavigation = (_event, newValue) => {
        setValue(newValue);
        const paths = ['/', '/search', '/chat', '/menu'];
        navigate(paths[newValue] || '/');
    };

    const navItems = [
        { label: 'Home', icon: <HomeIcon /> },
        { label: 'Search', icon: <SearchIcon /> },
        { label: 'Chat', icon: <ChatIcon /> },
        { label: 'Menu', icon: <MenuIcon /> }
    ];

    return (
        <Box sx={{ display: 'flex', bgcolor: '#fafafa', minHeight: '100vh' }}>

            {/* Desktop Sidebar */}
            {isDesktop && (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: open ? expandedWidth : collapsedWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: open ? expandedWidth : collapsedWidth,
                            boxSizing: 'border-box',
                            borderRight: '1px solid ' + theme.palette.divider,
                            bgcolor: theme.palette.background.paper,
                            transition: theme.transitions.create('width', {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen
                            })
                        }
                    }}
                >
                    <Toolbar sx={{ justifyContent: open ? 'space-between' : 'center', px: 1 }}>
                        {open && <Typography variant="h6">My App</Typography>}
                        <IconButton onClick={() => setOpen(!open)}>
                            <MenuIcon sx={{ color: theme.palette.text.secondary }} />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List>
                        {navItems.map((item, index) => (
                            <ListItem key={item.label} disablePadding sx={{ justifyContent: open ? 'initial' : 'center' }}>
                                <ListItemButton
                                    selected={value === index}
                                    onClick={(e) => handleNavigation(e, index)}
                                    sx={{
                                        px: 2.5,
                                        ...(value === index && { bgcolor: theme.palette.action.selected })
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: theme.palette.text.primary }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    {open && <ListItemText primary={item.label} sx={{ '& .MuiListItemText-primary': { fontWeight: 500 } }} />}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            )}

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#ffffff',
                    p: isMobile ? 1 : 3,
                    pt: (isMobile || isTablet) ? (theme.mixins.toolbar.minHeight + theme.spacing(1)) : theme.spacing(3)
                }}
            >
                {/* AppBar for Tablet & Mobile */}
                {(isMobile || isTablet) && (
                    <AppBar position="fixed" color="inherit" elevation={1} sx={{ bgcolor: '#ffffff' }}>
                        <Toolbar>
                            <IconButton edge="start" onClick={() => setOpen(!open)} sx={{ mr: 2 }}>
                                <MenuIcon sx={{ color: theme.palette.text.primary }} />
                            </IconButton>
                            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                                My App
                            </Typography>
                        </Toolbar>
                    </AppBar>
                )}

                {/* Spacer for AppBar */}
                {(isMobile || isTablet) && <Toolbar />}

                <Box sx={{ maxWidth: { xs: '100%', sm: 500, md: 800, lg: 1000 }, mx: 'auto', mt: 2 }}>
                    <Outlet />
                </Box>

                {/* Bottom Navigation for Tablet & Mobile */}
                {(isMobile || isTablet) && (
                    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
                        <BottomNavigation showLabels value={value} onChange={handleNavigation} elevation={8}>
                            {navItems.map(item => (
                                <BottomNavigationAction key={item.label} label={item.label} icon={item.icon} />
                            ))}
                        </BottomNavigation>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
