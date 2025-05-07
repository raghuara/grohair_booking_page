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
    Autocomplete,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { displayRazorpay } from '../Razorpay/RazorUI';
import { postGrowAndGlowAppointment } from '../../API/Api';
import SnackBar from '../SnackBar';
import axios from "axios";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format, isAfter, isBefore, startOfDay } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';
import { enGB } from 'date-fns/locale';
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

const timeSlots = [
    '10:00 AM to 10:30 AM',
    '10:30 AM to 11:00 AM',
    '11:00 AM to 11:30 AM',
    '11:30 AM to 12:00 PM',
    '12:00 PM to 12:30 PM',
    '12:30 PM to 1:00 PM',
    '3:00 PM to 3:30 PM',
    '3:30 PM to 4:00 PM',
    '4:00 PM to 4:30 PM',
    '4:30 PM to 5:00 PM',
    '5:00 PM to 5:30 PM',
    '5:30 PM to 6:00 PM'
];


export default function BookingPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(null);
    const [time, setTime] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const token = "123"
    const mobile = localStorage.getItem("phone")
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState('');
    const today = startOfDay(new Date());
    const maxSelectableDate = new Date('2025-05-21');
    const formattedDate = format(date, 'dd-MM-yyyy');

    const isOutOfRange = isAfter(today, maxSelectableDate);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        date: '',
        time: ''
    });
    useEffect(() => {
        const mobile = localStorage.getItem('phone');
        if (!mobile) {
            navigate('/');
        }
    }, [navigate]);

    const handleNext = () => {
        const newErrors = {
            name: '',
            email: '',
            phoneNumber: '',
            date: '',
            time: ''
        };

        if (!name.trim()) newErrors.name = 'Please enter your name';
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email';
        if (!date) newErrors.date = 'Please select a date';
        if (!time) newErrors.time = 'Please select a time slot';

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((msg) => msg !== '');
        if (!hasErrors) {
            
            localStorage.setItem('userDetails', JSON.stringify({ name, email, formattedDate, time }));

            displayRazorpay({
                name,
                email,
                phone:mobile,
                date,
                time,
                amount: 1,
                navigate,
            });
        }
    };


    return (
        <ThemeProvider theme={theme}>
            {isLoading && <Loader />}
            <SnackBar open={open} color={color} setOpen={setOpen} status={status} message={message} />
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
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
                            Let's Get Started
                        </Typography>
                        <Typography variant="body1" align="center" color="text.secondary" mb={3}>
                            Enter your details to continue
                        </Typography>

                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 2 }}
                            error={!!errors.name}
                            helperText={errors.name}
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                            error={!!errors.email}
                            helperText={errors.email}
                        />


                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                            <DatePicker
                            label="Date"
                                sx={{ width: "100%", }}
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                                minDate={today}
                                maxDate={maxSelectableDate}
                                views={['day']}
                                openTo="day"
                                format="dd-MM-yyyy"
                                disabled={isAfter(today, maxSelectableDate)}
                                shouldDisableDate={(day) => {
                                    const year = day.getFullYear();
                                    const month = day.getMonth();
                                    return (
                                        month !== 4 || year !== 2025 ||
                                        isBefore(day, today) ||
                                        isAfter(day, maxSelectableDate)
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      fullWidth
                                      error={!!errors.date}
                                      sx={{
                                        '& .MuiOutlinedInput-root': {
                                          borderRadius: '12px',
                                          '& fieldset': {
                                            borderColor: errors.date ? '#d32f2f' : '#ccc',
                                            borderWidth: errors.date ? 1 : 1,
                                          },
                                          '&:hover fieldset': {
                                            borderColor: errors.date ? '#d32f2f' : '#999',
                                          },
                                          '&.Mui-focused fieldset': {
                                            borderColor: errors.date ? '#d32f2f' : '#1976d2',
                                            borderWidth: '2px',
                                          },
                                        },
                                      }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        <Box sx={{ pt: errors.date ? 0 : 2, pb: errors.date ? 2 : 1 }}>
                            {errors.date &&
                                <Typography variant="caption" color={'error'} sx={{ mt: 0.5, ml: '14px' }}>
                                    {'Please select a date'}
                                </Typography>
                            }
                        </Box>


                        <Autocomplete
                            fullWidth
                            options={timeSlots}
                            value={time || null}
                            onChange={(event, newValue) => setTime(newValue || '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Time"
                                    variant="outlined"
                                    error={!!errors.time}
                                    helperText={errors.time}
                                />
                            )}
                            renderOption={(props, option, { selected }) => (
                                <li
                                    {...props}
                                    style={{
                                        backgroundColor: selected ? '#e3f2fd' : '#fff',
                                        padding: '10px 16px',
                                        m: 0,
                                        fontSize: '0.95rem',
                                        color: '#333',
                                        borderBottom: '1px solid #ccc',
                                    }}
                                >
                                    {option}
                                </li>
                            )}
                            sx={{ mb: 3 }}
                        />


                        <Button
                            fullWidth
                            variant="contained"
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
                                textTransform:"none",
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
                          Pay ₹1
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider>
    );
}
