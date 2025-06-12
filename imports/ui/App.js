import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Card, CardMedia, Typography, Button, BottomNavigation, BottomNavigationAction, List, ListItem, Divider, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#f44336' }
    }
});

const App = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ maxWidth: 500, mx: 'auto', p: 2, pb: isMobile ? 7 : 2 }}>
                {/* Main image card */}
                <Card sx={{ mb: 2, borderRadius: 2 }}>
                    <CardMedia
                        component="img"
                        image="/headphones.jpg"
                        alt="Appareil"
                        sx={{ height: isMobile ? 200 : 300, objectFit: 'contain', backgroundColor: '#f5f5f5' }}
                    />
                </Card>

                {/* Title and price */}
                <Typography variant="h6" align="center" gutterBottom>
                    Enchérir sur cet appareil
                </Typography>
                <Typography variant="h3" align="center" gutterBottom>
                    CHF 30
                </Typography>

                {/* Countdown timer */}
                <Typography variant="h4" align="center" color="secondary" gutterBottom>
                    03:55
                </Typography>

                {/* Continue button */}
                <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
                    Continuer
                </Button>

                {/* Chat section */}
                <List>
                    <ListItem button>
                        <Typography variant="body1">Chat</Typography>
                    </ListItem>
                </List>
            </Box>

            {/* Bottom navigation bar */}
            <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
                <BottomNavigation showLabels value={0}>
                    <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                    <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                    <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
                    <BottomNavigationAction label="Menu" icon={<MenuIcon />} />
                </BottomNavigation>
            </Box>
        </ThemeProvider>
    );
};

export default App;
