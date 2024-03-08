import React from 'react';
import { Link } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export const ProfileListItems = (
  <>
    <ListItemButton component={Link} to="/home">
      <ListItemIcon>
        <HomeIcon  />
      </ListItemIcon>
      <ListItemText primary="ホーム" />
    </ListItemButton>
    <ListItemButton component={Link} to="/chatrooms">
      <ListItemIcon>
        <MailOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="企業とのメッセージ" />
    </ListItemButton>
  </>
);
