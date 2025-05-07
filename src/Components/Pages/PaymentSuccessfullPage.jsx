import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    ThemeProvider,
    createTheme,
    Divider,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useLocation, useNavigate } from 'react-router-dom';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { postGrowAndGlowAppointment } from '../../API/Api';
import Loader from '../Loader';
import axios from 'axios';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4caf50',
        },
        text: {
            primary: '#333',
            secondary: '#666',
        },
    },
    typography: {
        fontFamily: `'Poppins', sans-serif`,
        h5: {
            fontWeight: 600,
            fontSize: '1.4rem',
        },
        body1: {
            fontSize: '0.875rem',
            color: '#666',
        },
    },
});

export default function PaymentSuccessfullPage() {
    const token = "123";
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const location = useLocation();
    const paymentId = location.state?.paymentId;
    const mobile = localStorage.getItem("phone")
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const [isLoading, setIsLoading] = useState('');
    const [details, setDetails] = useState('');

    const handleCopy = () => {
        navigator.clipboard.writeText(paymentId);
        setCopied(true);
    };
    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);


    const handleGoHome = () => {
        navigate('/');
    };

    useEffect(() => {
        if (!paymentId) {
            navigate('/');
            return;
        }
        fetchDetails();
    }, [paymentId, navigate]);

    const fetchDetails = async () => {
        setIsLoading(true);

        try {
            const sendData = {
                name: userDetails?.name || '',
                mobile: mobile,
                email: userDetails?.email || '',
                date: userDetails?.formattedDate || '',
                time: userDetails?.time || '',
                transactionID: paymentId,
            };

            const res = await axios.post(postGrowAndGlowAppointment, sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDetails(res.data.data)
            console.log("Response:", res.data);
        } catch (error) {
            console.error("Error while inserting news data:", error);
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
                    backgroundColor: '#ec20241A',
                    px: 2,
                }}
            >
                <Card
                    elevation={6}
                    sx={{
                        maxWidth: 420,
                        width: '100%',
                        textAlign: 'center',
                        borderRadius: 4,
                        p: 3,
                        bgcolor: 'white',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <CardContent>
                        <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 80, mb: 2 }} />

                        <Typography variant="h5" gutterBottom color="text.primary">
                            Payment Successful!
                        </Typography>

                        <Typography variant="body1" color="text.secondary" mb={3}>
                            Thank you! Your transaction has been completed successfully.
                        </Typography>
                        <Box
                            onClick={handleCopy}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                                border: '1px solid #ddd',
                                borderRadius: 2,
                                px: 2,
                                py: 1,
                                mb: 2,
                                backgroundColor: '#f9f9f9',
                                cursor: 'pointer',
                                position: 'relative',
                                '&:hover': {
                                    backgroundColor: '#f1f1f1',
                                },
                            }}
                        >
                            <ReceiptLongIcon color="primary" />
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 600,
                                    color: '#4caf50',
                                }}
                            >
                                {paymentId}
                            </Typography>

                            {copied && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '-24px',
                                        backgroundColor: '#4caf50',
                                        color: '#fff',
                                        fontSize: '0.75rem',
                                        px: 1,
                                        py: 0.2,
                                        borderRadius: 1,
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                    }}
                                >
                                    Copied!
                                </Box>
                            )}
                        </Box>



                        <Divider sx={{ my: 2, borderColor: '#ddd' }} />

                        <Box sx={{ mb: 2 }}>
                            {[{ label: 'Name', value: userDetails.name },
                            { label: 'Email', value: userDetails.email },
                            { label: 'Mobile', value: mobile },
                            { label: 'Date', value: userDetails.formattedDate },
                            { label: 'Time Slot', value: userDetails.time },
                            { label: 'Transaction ID', value: details.transactionID },
                            ].map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        py: 0.5,
                                    }}
                                >
                                    <Typography variant="body1" color="text.primary">
                                        <strong>{item.label}:</strong>
                                    </Typography>
                                    <Typography variant="body1" color="text.primary">
                                        {item.value}
                                    </Typography>
                                </Box>
                            ))}

                            <Divider sx={{ my: 2, borderColor: '#ddd' }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                                <Typography variant="body1" color="text.primary">
                                    <strong>Credited Amount:</strong>
                                </Typography>
                                <Typography variant="body1" color="text.primary">
                                    ₹1
                                </Typography>
                            </Box>
                        </Box>


                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleGoHome}
                            sx={{
                                mt: 3,
                                py: 1.3,
                                fontWeight: 600,
                                borderRadius: 3,
                                fontSize: '1rem',
                                backgroundColor: '#4caf50',
                                color: "#fff",
                                '&:hover': {
                                    backgroundColor: '#45a049',
                                },
                            }}
                        >
                            Go to Home
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider>
    );
}
