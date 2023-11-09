import React, { useContext } from "react"
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie"

import { makeStyles, Theme } from "@material-ui/core/styles"

import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

import { signOut } from "api/auth"

import { AuthContext } from "App"

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: '#'
  },
  logo: {
    margin: theme.spacing(2),
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
  }
}))

const Header: React.FC = () => {
  const { loading, isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext)
  const classes = useStyles()
  const navigate = useNavigate()

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
            プロジェクトダッシュボードへ
          </Button>
          <Button
            color="inherit"
            className={classes.linkBtn}
            onClick={handleSignOut}
          >
            ログアウト
          </Button>
          <Typography>
            お名前：{currentUser?.name}
          </Typography>
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
      <div className={classes.header}>
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
          >
            <img src="/Equity_Logo.png" width="100" height="30" alt="ホームアイコン" className={classes.logo} />
          </Typography>
          <AuthButtons />
        </Toolbar>
      </div>
    </>
  )
}

export default Header
