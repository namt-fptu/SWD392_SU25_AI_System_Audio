import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppNavbar from '../dashboard/components/AppNavbar';
import Header from '../dashboard/components/Header';
import AppTheme from '../shared-theme/AppTheme';
import SideMenu from '../dashboard/components/SideMenu';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

const demoLibrary = [
  {
    id: 1,
    title: 'AI Fundamentals',
    description: 'Introduction to Artificial Intelligence concepts.',
    author: 'John Doe',
    created_at: '2025-07-01',
  },
  {
    id: 2,
    title: 'Machine Learning Basics',
    description: 'Learn about supervised and unsupervised learning.',
    author: 'Jane Smith',
    created_at: '2025-07-05',
  },
  {
    id: 3,
    title: 'Deep Learning',
    description: 'Neural networks and deep learning techniques.',
    author: 'Alice Nguyen',
    created_at: '2025-07-10',
  },
  {
    id: 4,
    title: 'Data Science with Python',
    description: 'Explore data analysis and visualization using Python.',
    author: 'David Kim',
    created_at: '2025-06-28',
  },
  {
    id: 5,
    title: 'Natural Language Processing',
    description: 'Understanding human language with machines.',
    author: 'Sarah Lee',
    created_at: '2025-07-03',
  },
  {
    id: 6,
    title: 'Computer Vision',
    description: 'Teaching computers to see and interpret images.',
    author: 'Tom Tran',
    created_at: '2025-07-07',
  },
];

export default function LibraryPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
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
            <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: { xs: 8, md: 0 } }}>
              <Header title="Library" />
              <Grid container spacing={3} sx={{ mt: 2 }}>
                {demoLibrary.length === 0 ? (
                  <Grid item xs={12}>
                    <Typography variant="body1" color="text.secondary" align="center">
                      No library items available.
                    </Typography>
                  </Grid>
                ) : (
                  demoLibrary.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4}>
                      <Card
                        elevation={4}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.2s',
                          '&:hover': { transform: 'scale(1.03)', boxShadow: 8 },
                          bgcolor: 'background.paper',
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" gutterBottom color="primary">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            {item.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Author: {item.author}
                          </Typography>
                          <br />
                          <Typography variant="caption" color="text.secondary">
                            Created: {item.created_at}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ mt: 'auto', pt: 0, px: 2, pb: 2, justifyContent: 'flex-end' }}>
                          <Button size="small" startIcon={<VisibilityRoundedIcon />}>
                            View
                          </Button>
                          <Button size="small" startIcon={<DownloadRoundedIcon />}>
                            Download
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}
