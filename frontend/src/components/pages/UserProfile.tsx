import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from "App"
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Avatar from "@material-ui/core/Avatar"
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

// API
import { getUser } from 'api/user'

// Components
import SnsProfile from 'components/features/users/profile/SnsProfile';
import TechSkill from '../features/users/profile/TechSkill';
import Portfolio from 'components/features/users/profile/Portfolio';
import Career from 'components/features/users/profile/Career';
import NextCareer from 'components/features/users/profile/NextCareer';

// import { secondaryListItems } from './ListItems';
import { ProfileListItems } from './ProfileListItems';
import { Card, CardContent } from '@material-ui/core';

// Material Icons
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

// Import Style
import { makeStyles, Theme } from "@material-ui/core/styles"

// Style
const useStyles = makeStyles((theme: Theme) => ({
  profileCard: {
    margin: theme.spacing(4),
    maxWidth: 720
  },
  profileContent: {
    color: 'gray',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    fontWeight: 'bold',
    border: 'solid 1px #dfdfdf',
    borderRadius: 5,
    minHeight: 64
  },
  
}))

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const UserProfile: React.FC = () => {

  // Stateの修正
  const [user, setUser] = useState({
    id: '',
    uuid: '',
    name: '',
    portfolio: '',
    nextCareerts: [] // 適切な初期値を設定してください
  });
  

  const classes = useStyles()

  const [open, setOpen] = React.useState(true);
  const { currentUser } = useContext(AuthContext)

  // idを定義
  const { id } = useParams<{ id: string | undefined }>();

  useEffect(() => {
    showUserProfile(id)
  }, [id]);

  // 求人詳細情報を取得
  const showUserProfile = async (query: string | undefined) => {
    try {
      // queryが存在する場合、求人データをセッティングする
      if (query) {
        const res = await getUser(query);
        console.log(res.data);
        setUser(res.data);
      } else {
        console.error('ユーザー情報を取得できませんでした。');
      }
    } catch(e) {
      console.log(e);
    }
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };


  return (
    <ThemeProvider theme={defaultTheme} >
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              プロフィール
            </Typography>
          </Toolbar>
        </AppBar>
        {/* サイドメニューバー */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {ProfileListItems}
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Card className={classes.profileCard}>
                  <CardContent>
                  <Avatar/>
                  <AddAPhotoIcon />
                  <Typography
                    variant="h6"
                  >
                    {currentUser?.name}
                  </Typography>

                  {/* SNSプロフィール */}
                  <Divider/>
                    {currentUser && <SnsProfile user={currentUser} />}
                  <Divider/>

                  {/* 技術スタック */}
                  <Divider/>
                    {currentUser && <TechSkill user={currentUser} />}
                  <Divider/>

                  {/* ポートフォリオリンク */}
                  <Divider/>
                    {currentUser && <Portfolio user={currentUser} />}
                  <Divider/>

                  {/* これまで取り組んできたプロジェクト */}
                  <Divider/>
                    {currentUser && <Career user={currentUser} />}
                  <Divider/>
                  
                  {/* これからやっていきたいこと */}
                  <Divider/>
                    {currentUser && <NextCareer user={currentUser} />}
                  <Divider/>
                    
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UserProfile;