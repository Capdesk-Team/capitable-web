import React from 'react';
import { Link } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';

export const ProfileListItems = (
  <>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="ホーム" />
    </ListItemButton>
    <ListItemButton component={Link} to="/chatrooms">
      <ListItemIcon>
        <MailOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="メッセージ一覧" />
    </ListItemButton>
    <ListItemButton component={Link} to="/likes">
      <ListItemIcon>
        <FavoriteIcon />
      </ListItemIcon>
      <ListItemText primary="いいね通知" />
    </ListItemButton>
    <ListItemButton component={Link} to="/user/skills">
      <ListItemIcon>
        <SignalCellularAltIcon />
      </ListItemIcon>
      <ListItemText primary="スキル機能" />
    </ListItemButton>
  </>
);
