import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from '../Loader';
import {
    Box,
    createTheme,
    Avatar,
    Divider,
    Grid,
    Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { getGrowAndGlowAppointments } from '../../API/Api';

export default function DetailsPage() {
    const token = "123";
    const navigate = useNavigate();
    const location = useLocation();
    const phoneNumber = location.state?.phoneNumber;

    const [isLoading, setIsLoading] = useState(true);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        if (!phoneNumber) {
            navigate('/');
            return;
        }
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
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

            setDetails(res.data.data || []);
        } catch (error) {
            console.error("Error while fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const [datePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('-');
        const date = new Date(`${year}-${month}-${day}`);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <Box>
            <Box sx={{ minHeight: '100vh', backgroundColor: "#ec20241A", overflowY: 'auto' }}>
                <Box sx={{
                    position: 'sticky',
                    top: 0,
                    bgcolor:"#ec2024",
                    py: 2,
                    px: 3,
                    zIndex: 1000,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}>
                    <Typography variant="h5" fontWeight={600} color="#fff">
                        Previous Transactions
                    </Typography>
                </Box>

                <Box sx={{ mt: 3, p: 2 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Appointments
                    </Typography>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <Grid container spacing={2}>
                            {details.map((tx) => (
                                <Grid item sx={{
                                    borderRadius: 1.5,
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                                    backgroundColor: '#fff',
                                    p:3
                                }} key={tx.id}>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Avatar
                                                sx={{
                                                    bgcolor: "#ec2024",
                                                    width: 40,
                                                    height: 40,
                                                    marginRight: 2,
                                                }}
                                            >
                                                {tx.name?.[0] || 'U'}
                                            </Avatar>
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {tx.name}
                                            </Typography>
                                        </Box>

                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            {tx.email}
                                        </Typography>
                                        <Divider sx={{ my: 1 }} />
                                        <Typography variant="body2" color="text.primary">
                                            <strong>Date:</strong> <span style={{color:"#777"}}>{formatDate(tx.date)}</span>
                                        </Typography>
                                        <Typography variant="body2" color="text.primary">
                                            <strong>Time:</strong> <span style={{color:"#777"}}> {tx.time}</span>
                                        </Typography>
                                        <Typography variant="body2" color="text.primary">
                                            <strong>Mobile:</strong> <span style={{color:"#777"}}>{tx.mobile}</span>
                                        </Typography>
                                        <Typography variant="body2" color="text.primary">
                                            <strong>transactionID:</strong> <span style={{color:"#777"}}>{tx.transactionID}</span>
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </Box>
        </Box>
    );
}