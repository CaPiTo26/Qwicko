// Layout.js (imports/ui/Layout.js)
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, BottomNavigation, BottomNavigationAction, useMediaQuery, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = useState(0);

    // Sync navigation value with current route
    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setValue(0);
                break;
            case '/search':
                setValue(1);
                break;
            case '/chat':
                setValue(2);
                break;
            case '/menu':
                setValue(3);
                break;
            default:
                setValue(0);
        }
    }, [location]);

    const handleNavigation = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate('/');
                break;
            case 1:
                navigate('/search');
                break;
            case 2:
                navigate('/chat');
                break;
            case 3:
                navigate('/menu');
                break;
            default:
                navigate('/');
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', pb: isMobile ? 7 : 0 }}>
            {/* Main content area */}
            <Box sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
                <Outlet />
            </Box>

            {/* Bottom navigation bar */}
            <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={handleNavigation}
                    sx={{ borderTop: 1, borderColor: 'divider' }}
                >
                    <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                    <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                    <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
                    <BottomNavigationAction label="Menu" icon={<MenuIcon />} />
                </BottomNavigation>
            </Box>
        </Box>
    );
};

export default Layout;