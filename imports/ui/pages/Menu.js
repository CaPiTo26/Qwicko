// Menu.js (imports/ui/pages/Menu.js) - ATTENTION: Nom de fichier avec majuscule
import React from 'react';
import { Box, Typography } from '@mui/material';

const Menu = () => {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Page de Menu
            </Typography>
            <Typography variant="body1">
                Options du menu à venir...
            </Typography>
        </Box>
    );
};

export default Menu;