import React, { useState } from 'react';
import {
    Drawer,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Button,
    Divider,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    useMediaQuery,
    useTheme,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import {
    DashboardOutlined,
    LocalOfferOutlined,
    EmailOutlined,
    CalendarTodayOutlined,
    DescriptionOutlined,
    GroupOutlined,
    ContactsOutlined,
    ShoppingCartOutlined,
    NotificationsNoneOutlined,
    BarChartOutlined,
    Logout
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const location = useLocation();

    const [tab, setTab] = useState('general');
    const [logoutOpen, setLogoutOpen] = useState(false);

    const handleTabChange = (_, newTab) => {
        if (newTab) setTab(newTab);
    };

    const handleLogout = () => {
        setLogoutOpen(true);
    };

    const confirmLogout = () => {
        setLogoutOpen(false);
        navigate('/');
    };

    const isActive = (path) => location.pathname.includes(path);

    const menuItems = [
        { icon: <DashboardOutlined />, label: 'Dashboard', path: '/dashboardmenu/dashboard' },
        { icon: <LocalOfferOutlined />, label: 'Offers' },
        { icon: <EmailOutlined />, label: 'Email Inbox' },
        { icon: <CalendarTodayOutlined />, label: 'Calendar' },
        { icon: <DescriptionOutlined />, label: 'Templates' },
        { icon: <GroupOutlined />, label: 'Team' },
        { icon: <ContactsOutlined />, label: 'Contacts' },
    ];

    const secondaryItems = [
        { icon: <ShoppingCartOutlined />, label: 'Sales Pipeline' },
        { icon: <NotificationsNoneOutlined />, label: 'Notifications' },
        { icon: <BarChartOutlined />, label: 'Reports' },
    ];

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'persistent'}
            open
            onClose={() => { }}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 225,
                    borderRight: '1px solid #ddd',
                    backgroundColor: '#E3E3E1',
                    padding: 1,
                },
            }}
        >
            <Box sx={{ px: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, mt: 2, }}>
                    Grohair & Glohair
                </Typography>
            </Box>

            <List>
                {menuItems.map(({ icon, label, path }) => (
                    <ListItem
                        key={label}
                        button
                        onClick={() => path && navigate(path)}
                        sx={{
                            color: isActive(path) ? '#1976d2' : '#333',
                            backgroundColor: isActive(path) ? '#fff' : 'transparent',
                            '&:hover': { backgroundColor: '#f0f0f0' },
                            borderRadius: 1,
                        }}
                    >
                        <ListItemIcon sx={{ color: isActive(path) ? '#000' : '#666' }}>
                            {icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={label}
                            primaryTypographyProps={{
                                sx: {
                                    color: isActive(path) ? '#000' : '#666',
                                    fontWeight: isActive(path) ? 600 : 500,
                                },
                            }}
                        />

                    </ListItem>
                ))}
            </List>

            <Divider sx={{ my: 1 }} />

            <List>
                {secondaryItems.map(({ icon, label }) => (
                    <ListItem
                        key={label}
                        button
                        sx={{
                            borderRadius: 1,
                            '&:hover': { backgroundColor: '#f0f0f0' },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#666' }}>{icon}</ListItemIcon>
                        <ListItemText primary={label}  
                        primaryTypographyProps={{
                                sx: {
                                    color: '#666',
                                },
                            }} />
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ my: 1 }} />

            <List>
                <ListItem button sx={{ mx: 1, borderRadius: 1 }} onClick={handleLogout}>
                    <ListItemIcon sx={{ color: '#d32f2f' }}>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Logout" sx={{ color: '#d32f2f' }} />
                </ListItem>
            </List>

            <Dialog open={logoutOpen} onClose={() => setLogoutOpen(false)}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to logout?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLogoutOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={confirmLogout}>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </Drawer>
    );
};

export default SidebarPage;
