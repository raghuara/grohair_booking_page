import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    ThemeProvider,
    createTheme,
    InputAdornment,
} from '@mui/material';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { useNavigate } from 'react-router-dom';
import { getGrowAndGlowAppointments } from '../../API/Api';
import axios from "axios";
import Loader from '../Loader';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ec2024',
            light: '#f87a7c',
            contrastText: '#fff',
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: `'Poppins', sans-serif`,
    },
});

export default function MobileNumberPage() {
    const token = "123"
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState('');

    useEffect(() => {
        localStorage.removeItem('phone');
        localStorage.removeItem('userDetails');
    }, []);

    const handleNext = async (status) => {
        if (!/^\d{10}$/.test(phoneNumber)) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            const res = await axios.get(getGrowAndGlowAppointments, {
                params: {
                    Mobile: phoneNumber,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.setItem("phone", phoneNumber )
            const { error, message } = res.data;

            if (error && message === "New Enquiry") {
                navigate('/book');
            } else {
                navigate('/details', { state: { phoneNumber } });
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            {isLoading && <Loader />}
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    px: 2,
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #f87a7c 0%, #ec2024 100%)',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0,
                        pointerEvents: 'none',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '10%',
                            left: '20%',
                            width: '200px',
                            height: '200px',
                            background: 'rgba(236, 32, 36, 0.2)',
                            borderRadius: '8px',
                            zIndex: 0,
                            transform: 'rotate(45deg)',
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            width: '250px',
                            height: '250px',
                            background: 'rgba(236, 32, 36, 0.3)',
                            borderRadius: '8px',
                            zIndex: 0,
                            transform: 'rotate(45deg)',
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '70%',
                            left: '10%',
                            width: '150px',
                            height: '100px',
                            background: 'rgba(236, 32, 36, 0.2)',
                            borderRadius: '8px',
                            zIndex: 0,
                            transform: 'rotate(25deg)',
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '80%',
                            width: '180px',
                            height: '120px',
                            background: 'rgba(236, 32, 36, 0.25)',
                            borderRadius: '8px',
                            zIndex: 0,
                            transform: 'rotate(25deg)',
                        }}
                    />
                </Box>

                <Card
                    elevation={3}
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        bgcolor: 'rgba(255, 255, 255, 1)',
                        borderRadius: 4,
                        p: 3,
                        zIndex: 1,
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
                            Let's Get Started
                        </Typography>
                        <Typography variant="body1" align="center" color="text.secondary" mb={3}>
                            Enter your mobile number to continue
                        </Typography>

                        <TextField
                            fullWidth
                            label="Mobile Number"
                            variant="outlined"
                            type="tel"
                            inputProps={{ maxLength: 10 }}
                            value={phoneNumber}
                            onChange={(e) =>
                                setPhoneNumber(e.target.value.replace(/\D/g, ''))
                            }
                            error={!!error}
                            helperText={error}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SmartphoneIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 3 }}
                        />

                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            size="large"
                            onClick={handleNext}
                            sx={{
                                py: 1.5,
                                fontWeight: 600,
                                fontSize: '1rem',
                                borderRadius: 3,
                                position: 'relative',
                                overflow: 'hidden',
                                border: 'none',
                                color: 'rgba(255, 255, 255, 0.8)',
                                backgroundColor: '#ec2024',
                                transition: 'color 0.3s ease, background-color 0.3s ease',
                                '&:hover': {
                                    color: '#fff',
                                },
                                '&:before': {
                                    content: "''",
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '50%',
                                    width: '0%',
                                    height: '2px',
                                    backgroundColor: '#fff',
                                    transition: 'width 0.3s ease, left 0.3s ease',
                                },
                                '&:hover:before': {
                                    width: '100%',
                                    left: '0%',
                                },
                            }}
                        >
                            Next
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider>
    );
}
