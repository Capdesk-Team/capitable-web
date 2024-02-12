import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BusinessIcon from '@material-ui/icons/Business';

export const dashboardListItems = (
  <>
    <ListItemButton component={Link} to="/home">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="ホーム" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboards">
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="メンバー一覧" />
    </ListItemButton>
    <ListItemButton component={Link} to="/chatrooms">
      <ListItemIcon>
        <MailOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="メッセージ一覧" />
    </ListItemButton>
    <ListItemButton component={Link} to="/company/new-job">
      <ListItemIcon>
        <PostAddIcon />
      </ListItemIcon>
      <ListItemText primary="募集作成" />
    </ListItemButton>
    <ListItemButton component={Link} to="">
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <ListItemText primary="メンバーを招待する" />
    </ListItemButton>
    <ListItemButton component={Link} to="">
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText primary="法人情報管理" />
    </ListItemButton>
  </>
);