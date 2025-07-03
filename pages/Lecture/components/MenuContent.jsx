import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, to: '/lecturerPage' }, // Sửa lại đường dẫn
  { text: 'Library', icon: <LibraryBooksRoundedIcon />, to: '/library' },
  { text: 'Chats', icon: <HistoryRoundedIcon />, to: '/chatPage' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, to: '/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, to: '/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, to: '/feedback' },
];

export default function MenuContent() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  return (
    <Stack
      sx={{
        height: '100vh',
        p: 2,
        bgcolor: theme.palette.background.default, // Sử dụng màu nền theo theme
        color: theme.palette.text.primary,         // Sử dụng màu chữ theo theme
        transition: 'background-color 0.3s',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo và tên app */}
      <Stack alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <img src="/logo192.png" alt="Logo" style={{ width: 48, height: 48 }} />
        <Typography variant="h6" fontWeight={700} color="primary">
          AI System
        </Typography>
      </Stack>

      {/* Menu chính */}
      <List>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ mb: 1, borderRadius: 2 }}>
            <ListItemButton
              component={RouterLink}
              to={item.to}
              sx={{
                borderRadius: 2,
                '&.Mui-selected, &.Mui-selected:hover': {
                  bgcolor: theme.palette.action.selected, // dùng màu selected mặc định của theme
                },
              }}
              selected={window.location.pathname === item.to}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Menu phụ và Log out */}
      <List>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ mb: 1, borderRadius: 2 }}>
            <ListItemButton
              component={RouterLink}
              to={item.to}
              sx={{ borderRadius: 2 }}
              selected={window.location.pathname === item.to}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* Log out button */}
        <ListItem disablePadding sx={{ borderRadius: 2 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              color: theme.palette.error.main,
              '&:hover': {
                bgcolor: theme.palette.error.light,
                color: theme.palette.error.contrastText,
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}
