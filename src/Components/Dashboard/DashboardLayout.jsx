// DashboardLayout.js
import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SidebarPage from './SideBar';

export default function DashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <SidebarPage mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Box component="main" sx={{ flexGrow: 1,}}>
        <Outlet />
      </Box>
    </Box>
  );
}
