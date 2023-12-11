import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import SearchIcon from '@material-ui/icons/Search';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PostAddIcon from '@material-ui/icons/PostAdd';

export const dashboardListItems = (
  <>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="ホーム" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboards">
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="応募者確認" />
    </ListItemButton>
    <ListItemButton component={Link} to="/search-users">
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="ユーザー検索" />
    </ListItemButton>
    <ListItemButton component={Link} to="/chatrooms">
      <ListItemIcon>
        <MailOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="メッセージ一覧" />
    </ListItemButton>
    <ListItemButton component={Link} to="/new-project">
      <ListItemIcon>
        <PostAddIcon />
      </ListItemIcon>
      <ListItemText primary="募集作成" />
    </ListItemButton>
  </>
);