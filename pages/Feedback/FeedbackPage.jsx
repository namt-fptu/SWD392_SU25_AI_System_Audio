import * as React from 'react';
import { Box, Typography, Paper, Stack, Divider, TextField, Button, Snackbar, Alert } from '@mui/material';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import AppNavbar from '../dashboard/components/AppNavbar';
import SideMenu from '../dashboard/components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';

export default function FeedbackPage(props) {
  const [message, setMessage] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    setMessage('');
    setEmail('');
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
                  <HelpRoundedIcon color="primary" fontSize="large" />
                  <Typography variant="h4" fontWeight={700} color="primary">
                    Feedback
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                  We value your feedback! Please let us know your thoughts, suggestions, or issues so we can improve <strong>AI System</strong>.
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      label="Your Email (optional)"
                      variant="outlined"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      label="Your Feedback"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ borderRadius: 2, fontWeight: 700 }}
                      disabled={!message}
                    >
                      Submit Feedback
                    </Button>
                  </Stack>
                </form>
              </Paper>
            </Stack>
            <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
              <Alert severity="success" sx={{ width: '100%' }}>
                Thank you for your feedback!
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}