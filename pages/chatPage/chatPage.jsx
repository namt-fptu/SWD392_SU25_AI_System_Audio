import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider
} from '@mui/material';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ChatHistory() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:8080/api/chats/history', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setChats(res.data))
    .catch(err => console.error('Failed to load chat history', err));
  }, []);

  return (
    <List>
      {chats.map((chat, index) => (
        <React.Fragment key={chat.id}>
          <ListItem button onClick={() => navigate(`/chats/${chat.id}`)}>
            <ListItemAvatar>
              <Avatar>
                <ChatBubbleOutlineRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={chat.title}
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {chat.lastMessage}
                </Typography>
              }
            />
          </ListItem>
          {index < chats.length - 1 && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
}
