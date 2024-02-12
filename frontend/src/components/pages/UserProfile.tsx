import React, { useContext } from 'react';
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
import FormControl from "@material-ui/core/FormControl"
import MenuItem from "@material-ui/core/MenuItem"
import Select, { SelectChangeEvent } from '@mui/material/Select';

// import { secondaryListItems } from './ListItems';
import { ProfileListItems } from './ProfileListItems';
import { Card, CardContent } from '@material-ui/core';
import Button from "@material-ui/core/Button"
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@mui/material/Paper';


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

export default function Dashboard() {

  const classes = useStyles()

  const [open, setOpen] = React.useState(true);
  const { currentUser } = useContext(AuthContext)

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
                    ユーザーネーム
                  </Typography>
                  
                  <Divider/>
                    
                  <h3>現在のポジション</h3>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Box sx={{ minWidth: 240 }}>
                        <FormControl fullWidth>
                            <Select
                              id="demo-simple-select"
                            >
                              <MenuItem value={10}>テックリード</MenuItem>
                              <MenuItem value={20}>バックエンドエンジニア</MenuItem>
                              <MenuItem value={30}>プロダクトマネージャー</MenuItem>
                              <MenuItem value={40}>フロントエンドエンジニア</MenuItem>
                              <MenuItem value={50}>モバイルエンジニア</MenuItem>
                              <MenuItem value={60}>VPoE</MenuItem>
                              <MenuItem value={70}>QAエンジニア</MenuItem>
                              <MenuItem value={80}>CTO</MenuItem>
                              <MenuItem value={90}>DevOpsエンジニア</MenuItem>
                              <MenuItem value={90}>SRE</MenuItem>

                            </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box my={1} flexDirection="row" justifyContent="flex-end" display="flex">
                    <Button
                      color="primary"
                      variant="contained"
                      disableElevation
                      // className={classes}
                    >
                      保存する
                    </Button>
                  </Box>

                  <Divider/>

                  <Box display="flex" flexDirection="row" alignItems="center">
                    <h3>これまで経験してきた技術スタック</h3>
                    <Box flexGrow={1} />
                    <Box>
                      <Button variant="outlined" startIcon={<EditIcon />}>
                        編集
                      </Button>
                    </Box>
                  </Box>

                  <Box className={classes.profileContent}>
                    {
                    currentUser?.portfolioUrl ? (
                      currentUser.portfolioUrl 
                    ) : (
                      'これまで経験してきた技術スタック'
                    )}
                  </Box>

                  <Box my={1} flexDirection="row" justifyContent="flex-end" display="flex">
                    <Button
                      color="primary"
                      variant="contained"
                      disableElevation
                      // className={classes}
                    >
                      保存する
                    </Button>
                  </Box>

                  <Divider/>


                  <Divider/>

                  <Box display="flex" flexDirection="row" alignItems="center">
                    <h3>ポートフォリオリンク</h3>
                    <Box flexGrow={1} />
                    <Box>
                      <Button variant="outlined" startIcon={<EditIcon />}>
                        編集
                      </Button>
                    </Box>
                  </Box>

                  <Box className={classes.profileContent}>
                    {
                    currentUser?.portfolioUrl ? (
                      currentUser.portfolioUrl 
                    ) : (
                      'https://'
                    )}
                  </Box>
                  
                  <Box my={1} flexDirection="row" justifyContent="flex-end" display="flex">
                    <Button
                      color="primary"
                      variant="contained"
                      disableElevation
                      // className={classes}
                    >
                      保存する
                    </Button>
                  </Box>

                  <Divider/>

                  <Box display="flex" flexDirection="row" alignItems="center">
                    <h3>これまでの経歴</h3>
                    <Box flexGrow={1} />
                    <Box>
                      <Button variant="outlined" startIcon={<EditIcon />}>
                        編集
                      </Button>
                    </Box>
                  </Box>
                  <Box className={classes.profileContent}>
                    {
                    currentUser?.portfolioUrl ? (
                      currentUser.portfolioUrl 
                    ) : (
                      'これまでの経歴を入力'
                    )}
                  </Box>
                  <Box my={1} flexDirection="row" justifyContent="flex-end" display="flex">
                    <Button
                      color="primary"
                      variant="contained"
                      disableElevation
                      // className={classes}
                    >
                      保存する
                    </Button>
                  </Box>

                  <Divider/>

                  <Box display="flex" flexDirection="row" alignItems="center">
                    <h3>今後やっていきたいこと</h3>
                    <Box flexGrow={1} />
                    <Box>
                      <Button variant="outlined" startIcon={<EditIcon />}>
                        編集
                      </Button>
                    </Box>
                  </Box>

                  <Box className={classes.profileContent}>
                    {
                    currentUser?.portfolioUrl ? (
                      currentUser.portfolioUrl 
                    ) : (
                      '今後やっていきたいことを入力'
                    )}
                  </Box>
                  <Box my={1} flexDirection="row" justifyContent="flex-end" display="flex">
                    <Button
                      color="primary"
                      variant="contained"
                      disableElevation
                      // className={classes}
                    >
                      保存する
                    </Button>
                  </Box>

                  <Divider/>
                    
                    <h3>株式やSOをインセンティブにしたスカウトへの興味・関心</h3>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Box sx={{ minWidth: 240 }}>
                          <FormControl fullWidth>
                              <Select
                                id="demo-simple-select"
                                
                              >
                                <MenuItem value={10}>積極的にSOや株式が付与される求人を探している</MenuItem>
                                <MenuItem value={20}>SO付与が条件にあった場合、スカウト内容への関心度が上がる</MenuItem>
                                <MenuItem value={30}>興味がある</MenuItem>
                                <MenuItem value={40}>面談時に説明を受けたい</MenuItem>
                                <MenuItem value={50}>興味がない</MenuItem>

                              </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box my={1} flexDirection="row" justifyContent="flex-end" display="flex">
                    <Button
                      color="primary"
                      variant="contained"
                      disableElevation
                      // className={classes}
                    >
                      保存する
                    </Button>
                  </Box>
          
                  </CardContent>
                </Card>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}