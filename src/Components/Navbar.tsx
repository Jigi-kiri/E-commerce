import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import LocalPhoneSharpIcon from '@mui/icons-material/LocalPhoneSharp';
import LocalShippingSharpIcon from '@mui/icons-material/LocalShippingSharp';

const Navbar: React.FC = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: "white" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                        fontSize="large"
                        color='success' />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        CINDERELLA FASHION
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" color="inherit">
                            <LocalPhoneSharpIcon color='success' style={{ padding: 5 }} />
                            <Typography variant='h6' color="black">
                                Customer Care
                            </Typography>
                        </IconButton>
                        <IconButton
                            size="large"
                            color="inherit"
                        >
                            <LocalShippingSharpIcon color='success' style={{ padding: 5 }} />
                            <Typography variant='h6' color="black">
                                Shipping
                            </Typography>
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar