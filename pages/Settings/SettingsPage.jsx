import * as React from 'react';
import { Box, Typography, Paper, Stack, Divider, Switch, FormControlLabel, Button } from '@mui/material';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AppNavbar from '../dashboard/components/AppNavbar';
import SideMenu from '../dashboard/components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';

export default function SettingsPage(props) {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  const handleSave = () => {
    // Xử lý lưu cài đặt (demo)
    alert('Settings saved!');
  };

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
            <Stack spacing={3} sx={{ maxWidth: 600, mx: 'auto', mt: { xs: 8, md: 0 } }}>
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
                  <SettingsRoundedIcon color="primary" fontSize="large" />
                  <Typography variant="h4" fontWeight={700} color="primary">
                    Settings
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        color="primary"
                      />
                    }
                    label="Dark Mode"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                        color="primary"
                      />
                    }
                    label="Enable Notifications"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 2, fontWeight: 700, mt: 2 }}
                    onClick={handleSave}
                  >
                    Save Settings
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