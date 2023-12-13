import React, { useContext } from "react"
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie"

import { signOut } from "api/auth"
import { makeStyles, Theme } from "@material-ui/core/styles"

import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Avatar from "@material-ui/core/Avatar"
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from "@material-ui/core/IconButton"
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { AuthContext } from "App"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit"
  },
  linkBtn: {
    textTransform: "none",
    margin: 4
  },
  avatar: {
    width: 50,
    height: 50
  },
  customPaper: {
    elevation: 0,
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      '& .MuiMenu-paper': {
        marginLeft: '82%',
        marginTop: theme.spacing(4)
      },
      '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      horizontal: 'right',
      top: 0,
      right: 0,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    },
  }
}))

const Header: React.FC = () => {
  const { loading, isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext)
  const classes = useStyles()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigate("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
            <>
              <Button
                color="inherit"
                className={classes.linkBtn}
                component={Link}
                to="/dashboards"  
              >
                プロジェクト管理画面へ
              </Button>
              <IconButton
                component={Link}
                to="/chatrooms"  
              >
                <MailOutlineIcon/>
              </IconButton>
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar src={`http://localhost:3001/${currentUser?.image.url}`} className={classes.avatar}/>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                className={classes.customPaper}
              >
              <MenuItem 
                onClick={handleClose}
                component={Link}
                to={`/user/${currentUser?.id}`}
                //ログインユーザーのidを取得
              >
                <ListItemIcon>
                  <Avatar />
                </ListItemIcon>
                プロフィール
              </MenuItem>
              <Divider />
                <Button onClick={handleSignOut}>
                  <MenuItem>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    ログアウト
                  </MenuItem>
                </Button>
              </Menu>
            <Divider/>
          </>
        )
      } else {
        return (
          <>
            <Button
              component={Link}
              to="/signin"
              color="primary"
              variant="outlined"
              className={classes.linkBtn}
            >
              ログイン
            </Button>
            <Button
              component={Link}
              to="/signup"
              color="primary"
              variant="outlined"
              className={classes.linkBtn}
            >
              新規登録
            </Button>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <div>
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
          >
            <img src="/capitable.png" width="120" height="40" alt="ホームアイコン" className={classes.logo} />
          </Typography>
          <AuthButtons />
        </Toolbar>
        <Divider/>
      </div>
    </>
  )
}

export default Header