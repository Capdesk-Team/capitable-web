import React, { useState, useEffect, useContext } from "react"
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie"
// API
import { getOrganizations } from "api/organization";
import { signOut } from "api/auth"
// Interfaces
import { getOrganizationsList } from "interfaces/organization";
// Import Style
import { makeStyles, Theme } from "@material-ui/core/styles"

// Material UI
import {
  Toolbar,
  Grid
} from "@material-ui/core"
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

// Material Icons
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
    margin: 4,
    fontWeight: 600
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
  },
  linkSignUp: {
    textTransform: "none",
    margin: 4,
    fontWeight: 600,
    backgroundColor: '#186aff'
  },
}))

const Header: React.FC = () => {
  const { loading, isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext)

  const [organizations, setOrganizations] = useState<getOrganizationsList[]>([]);

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
  
  // ログアウトの処理
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

  // ログインユーザーが所属している法人を取得
  useEffect(() => {
    if (isSignedIn && currentUser) {
      handleGetUserOrganizations(); // ログインユーザーが所属している組織のみを取得
    }
  }, [isSignedIn, currentUser]); 

  const handleGetUserOrganizations = async () => {
    try {
      const res = await getOrganizations();
      setOrganizations(res.data); // 取得した組織をstateに設定
    } catch(e) {
      console.error("ログインユーザーの組織取得に失敗しました", e);
    }
  }


  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示

    console.log("organizations:", organizations);
    console.log("currentUser:", currentUser);
    if (!loading) {
      if (isSignedIn) {
        return (
            <>
              <Button
                color="inherit"
                className={classes.linkBtn}
                component={Link}
                to="/company/register-form"  
              >
                法人登録をおこなう
              </Button>

              {organizations.map((organization: getOrganizationsList, index) => (
                <Grid item key={index}>
                  {/* organization.users が undefined でない場合のみ処理を実行 */}
                  {organization.users !== undefined &&
                    organization.users.find(user => user.id === currentUser?.id) && ( // user.idがcurrentUserのidと一致する場合
                      <Button
                        component={Link}
                        to={`/organizations/${organization.id}/dashboard`}
                        className={classes.linkBtn}
                      >
                        法人ダッシュボードへ
                      </Button>
                    )}
                </Grid>
              ))}

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
                <Avatar src={`${currentUser?.image.url}`} className={classes.avatar}/>
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
                to={`/user/${currentUser?.uuid}`}
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
              to="https://forms.gle/H65NorqmpAKfR8y17"
              target="_blank"
              className={classes.linkBtn}
            >
              法人の方はこちらから
            </Button>
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
              variant="contained"
              disableElevation
              className={classes.linkSignUp}
            >
              無料で新規登録
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
            to="/home"
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