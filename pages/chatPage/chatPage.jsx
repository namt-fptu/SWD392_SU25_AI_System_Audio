import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  CssBaseline,
  Stack,
  CardActionArea,
} from '@mui/material';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { useNavigate } from 'react-router-dom';
import SideMenu from '../dashboard/components/SideMenu';
import AppNavbar from '../dashboard/components/AppNavbar';
import AppTheme from '../shared-theme/AppTheme';
import Header from '../dashboard/components/Header';

export default function ChatHistory() {
  const demoChats = [
    { id: 1, title: 'AI Assistant', lastMessage: 'How can I help you today?' },
    { id: 2, title: 'Project Discussion', lastMessage: 'Let’s review the requirements.' },
    { id: 3, title: 'Team Chat', lastMessage: 'Meeting at 10AM tomorrow.' },
    { id: 4, title: 'Support', lastMessage: 'Your ticket has been resolved.' },
  ];

  const [chats] = useState(demoChats);
  const navigate = useNavigate();

  return (
    <AppTheme>
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
              <Header title="Chat History" />
              <Grid container spacing={3} sx={{ mt: 2 }}>
                {chats.length === 0 ? (
                  <Grid item xs={12}>
                    <Typography variant="body1" color="text.secondary" align="center">
                      No chat history available.
                    </Typography>
                  </Grid>
                ) : (
                  chats.map((chat) => (
                    <Grid item key={chat.id} xs={12} sm={6} md={4}>
                      <Card
                        elevation={4}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.2s',
                          '&:hover': { transform: 'scale(1.03)', boxShadow: 8, bgcolor: 'action.hover' },
                          bgcolor: 'background.paper',
                        }}
                      >
                        <CardActionArea onClick={() => navigate(`/chats/${chat.id}`)}>
                          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                              <ChatBubbleOutlineRoundedIcon fontSize="large" />
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                                {chat.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                sx={{ maxWidth: '220px' }}
                              >
                                {chat.lastMessage}
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
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
