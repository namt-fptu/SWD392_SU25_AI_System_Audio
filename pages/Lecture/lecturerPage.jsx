import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../dashboard/components/AppNavbar';
import Header from '../dashboard/components/Header';
import SideMenu from '../dashboard/components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../dashboard/theme/customizations';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';


const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  const [prompt, setPrompt] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [generatedLesson, setGeneratedLesson] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/lecturerPage');
      return;
    }
    axios.get('http://localhost:8080/api/auth/user', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.data.role !== 'Lecturer') {
          navigate('/unauthorized');
        }
      })
      .catch(() => navigate('/lecturerPage'));
  }, [navigate]);

  const handlePromptSubmit = async () => {
    if (!prompt && !file) {
      setSnackbarMessage('Please enter a prompt or upload a file.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const formData = new FormData();
      if (prompt) formData.append('prompt', prompt);
      if (file) formData.append('file', file);

      const response = await axios.post('http://localhost:8080/api/lessons/generate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setGeneratedLesson(response.data.lesson || 'Lesson generated successfully!');
      setPrompt('');
      setFile(null);
      setSnackbarMessage(response.data.message || 'Lesson generated successfully!');
      setDialogOpen(true);
      setTimeout(() => {
        setDialogOpen(false);
        // navigate('/lecturerPage'); // Nếu muốn chuyển trang, bỏ comment dòng này
      }, 1500);
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || 'Error generating lesson');
      setSnackbarOpen(true);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  // Render the main dashboard layout with the lesson generation form
  // and the generated lesson display

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <SideMenu />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <AppNavbar />
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                : alpha(theme.palette.background.default, 1),
              overflow: 'auto',
              p: 3,
            })}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                maxWidth: '800px',
                mx: 'auto',
                mt: { xs: 8, md: 0 },
              }}
            >
              <Header title="Generate Lesson" />
              <Paper
                elevation={3}
                sx={{ p: 3, width: '100%', borderRadius: 2 }}
              >
                <Box
                component={'form'} 
                sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
                noValidate
                autoComplete="off">
                  <Typography variant="h6" gutterBottom sx={{ display: 'block' }}>
                    Create a Lesson with AI
                  </Typography>
                  <TextField  id="standard-basic" label="Enter your lesson prompt" value={prompt}
                    onChange={(e) => setPrompt(e.target.value)} variant="standard" />
                 
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mb: 1 }}
                  >
                    Upload File
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {file && <Typography variant="body2" sx={{ mt: 1 }}>{file.name}</Typography>}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePromptSubmit}
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Generate Lesson
                </Button>
              </Paper>
              {generatedLesson && (
                <Paper
                  elevation={3}
                  sx={{ p: 3, width: '100%', borderRadius: 2, mt: 2 }}
                >
                  <Typography variant="h6">Generated Lesson</Typography>
                  <Typography>{generatedLesson}</Typography>
                </Paper>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            textAlign: 'center',
            py: 6,
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ fontSize: 28, fontWeight: 700, pb: 2 }}>
          {snackbarMessage}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ fontSize: 18 }}>
            You will be redirected shortly...
          </Typography>
        </DialogContent>
      </Dialog>
    </AppTheme>
  );
}
