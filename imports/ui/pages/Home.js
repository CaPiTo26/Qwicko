import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardMedia,
    Typography,
    Button,
    List,
    ListItem,
    useMediaQuery,
    useTheme
} from '@mui/material';

const Home = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleContinue = () => {
        // Logique pour continuer l'enchère
        console.log('Continuer l\'enchère');
    };

    const handleChatClick = () => {
        navigate('/chat');
    };

    return (
        <Box>
            {/* Main image card */}
            <Card sx={{ mb: 2, borderRadius: 2 }}>
                <CardMedia
                    component="img"
                    image="/headphones.jpg"
                    alt="Appareil"
                    sx={{
                        height: isMobile ? 200 : 300,
                        objectFit: 'contain',
                        backgroundColor: '#f5f5f5'
                    }}
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
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
                onClick={handleContinue}
            >
                Continuer
            </Button>

            {/* Chat section */}
            <List>
                <ListItem button onClick={handleChatClick}>
                    <Typography variant="body1">Chat</Typography>
                </ListItem>
            </List>
        </Box>
    );
};

export default Home;