import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PostAddIcon from '@material-ui/icons/PostAdd';
import HelpIcon from '@material-ui/icons/Help';
// import Component
import InvitaionUser from 'components/features/organizations/InvitaionUser';
import SidebarMenu from 'components/features/organizations/dashboards/SidebarMenu'

export const dashboardListItems = (
  <>
    <ListItemButton component={Link} to="/home">
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
    <ListItemButton component={Link} to="/company/new-job">
      <ListItemIcon>
        <PostAddIcon />
      </ListItemIcon>
      <ListItemText primary="募集作成" />
    </ListItemButton>
    {/* ユーザー招待 */}
    <ListItemButton component={SidebarMenu} />
    <ListItemButton component={InvitaionUser} />
    <ListItemButton component={Link} to="/notion-page">
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="ヘルプページ" />
    </ListItemButton>
  </>
);