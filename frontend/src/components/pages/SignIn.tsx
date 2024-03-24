import React, { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "App"
import Cookies from "js-cookie"
// API
import { signIn } from "api/auth"
// Interfaces
import { SignInParams } from "interfaces/user"
// Material UI
import { 
  Typography, 
  TextField, 
  Card, 
  CardContent, 
  CardHeader, 
  Button, 
  Box, 
  Container, 
  Grid 
} from "@material-ui/core"
import IconButton from '@mui/material/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
// Import Style
import { makeStyles, Theme } from "@material-ui/core/styles"
// Component
import AlertMessage from "components/utils/AlertMessage"
import SuccessMessage from "components/utils/SuccessMessage"
import Header from "components/layouts/Header"
import Footer from "components/layouts/Footer"

// Style
const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400
  },
  box: {
    marginTop: "2rem"
  },
  link: {
    textDecoration: "none",
    color: "blue",
    "&:hover, &:active, &:focus": {
      color: "blue",
      textDecoration: "none", 
    }
  },
  snsIcon: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  switchText: {
    textAlign: "center",
    marginTop: theme.spacing(2),
    fontSize: 10,
    color: '#AFAFAF'
  },
  signinBtn: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
    textTransform: "none",
    backgroundColor: "#186aff",
    fontWeight: 600
  },
  wrapper: {
    height: '100%',
    minHeight: '100vh',
    position: 'relative',
    paddingBottom: 120,
    boxSizing: "border-box",
  },
  container: {
    marginTop: "3rem",
    marginBottom: "6rem"
  },
}))

// サインイン用ページ
const SignIn: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const [successMessageOpen, setSuccessMessageOpen] = useState<boolean>(false)

  // パスワードの表示・非表示
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };  

  // メールアドレスログイン処理
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignInParams = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(params)
      console.log(res)

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        navigate("/home")
        console.log("ログインに成功しました！")
        setSuccessMessageOpen(true)
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }
  
  return (
    <>
      <div className={classes.wrapper}>
      <header>
        <Header/>
      </header>
      <Container className={classes.container}>
        <Grid container alignItems="center" justify="center" spacing={4}>
        <form noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="ログイン" />
            <CardContent>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="メールアドレス"
                value={email}
                margin="dense"
                onChange={event => setEmail(event.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="パスワード"
                type={showPassword ? 'text' : 'password'}
                value={password}
                margin="dense"
                autoComplete="current-password"
                onChange={event => setPassword(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disableElevation
                fullWidth
                color="primary"
                disabled={!email || !password ? true : false} // 空欄があった場合はボタンを押せないように
                className={classes.signinBtn}
                onClick={handleSubmit}
              >
                ログイン
              </Button>

              <Box textAlign="center" className={classes.box}>
                <Typography variant="body2">
                  アカウント登録はまだですか? &nbsp;
                  <Link to="/signup" className={classes.link}>
                    新規登録はこちらから
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </form>
        </Grid>
      </Container>
      <footer>
        <Footer/>
      </footer>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="メールアドレスかパスワードが違います"
      />
      <SuccessMessage
        open={successMessageOpen}
        setOpen={setSuccessMessageOpen}
        severity="success"
        message="ログインに成功しました"
      />
      </div>
    </>
  )
}

export default SignIn