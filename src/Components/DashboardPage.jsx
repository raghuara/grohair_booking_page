import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllGrowAndGlowAppointments } from "../API/Api";
import axios from "axios";
import Loader from "./Loader";

export default function DashBoardPage() {
    const token = "123";
    const [ clientsData, setClientsData] = useState([])
    const [isLoading, setIsLoading] = useState('');
    
    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(getAllGrowAndGlowAppointments,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setClientsData(res.data.data)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ ml: { sm: '240px' }, p: 3, backgroundColor: "#eee", minHeight: "93.3vh" }}>
            {isLoading && <Loader />}
            <Typography variant="h4" fontWeight={600} gutterBottom>
                Dashboard
            </Typography>
            <hr />

            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Mobile</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Time</strong></TableCell>
                            <TableCell><strong>Transaction ID</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientsData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.mobile}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.time}</TableCell>
                                <TableCell>{row.transactionID}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
