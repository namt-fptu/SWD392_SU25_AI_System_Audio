import * as React from 'react';
import { Box, Typography, Paper, Stack, Divider, Button, Link, Avatar } from '@mui/material';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import AppNavbar from '../dashboard/components/AppNavbar';
import SideMenu from '../dashboard/components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';

export default function AboutPage(props) {
  return (
    <AppTheme {...props}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <SideMenu />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <AppNavbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.vars
                  ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                  : theme.palette.background.default,
              overflow: 'auto',
              p: 3,
            }}
          >
            <Stack spacing={3} sx={{ maxWidth: 700, mx: 'auto', mt: { xs: 8, md: 0 } }}>
              <Paper
                elevation={6}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  bgcolor: (theme) => theme.palette.mode === 'light' ? '#f5f7fb' : theme.palette.background.paper,
                  boxShadow: 8,
                }}
              >
                <Stack alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <Avatar src="/logo192.png" sx={{ width: 72, height: 72, mb: 1 }} />
                  <Typography variant="h4" fontWeight={700} color="primary">
                    About AI System
                  </Typography>
                  <InfoRoundedIcon color="primary" fontSize="large" />
                </Stack>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                  <strong>AI System</strong> is a modern platform for managing and generating educational content using Artificial Intelligence.<br />
                  Our mission is to empower educators and learners with smart tools for creating, sharing, and interacting with lessons, libraries, and chatbots.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                  Version: <strong>1.0.0</strong><br />
                  Developed by <strong>SWD392_SU25 Team</strong>
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
                  For feedback or support, please use the <strong>Feedback</strong> section in the sidebar.
                </Typography>
                <Stack direction="row" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component={Link}
                    href="mailto:support@example.com"
                    sx={{ borderRadius: 2, textTransform: 'none' }}
                  >
                    Contact Support
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}