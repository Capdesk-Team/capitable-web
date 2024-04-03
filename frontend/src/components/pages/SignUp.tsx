import React, { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "App"
import Cookies from "js-cookie"
// API
import { signUp } from "api/auth"
// Interfaces
import { SignUpParams } from "interfaces/user"
// Material UI
import { Container, Grid } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import { Typography } from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
// Import Style
import { makeStyles, Theme } from "@material-ui/core/styles"
// Components
import AlertMessage from "components/utils/AlertMessage"
import Header from "components/layouts/Header"
import Footer from "components/layouts/Footer"

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  signupBtn: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
    textTransform: "none",
    fontWeight: 600,
    backgroundColor: "#186aff",
  },
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

// サインアップ用ページ
const SignUp: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  // パスワードの表示・非表示
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }

    try {
      const res = await signUp(params)
      console.log(res)

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        navigate("/home")

        console.log("ログインに成功しました")
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
            <CardHeader className={classes.header} title="無料で新規登録" />
            <Typography  className={classes.header}>※ 現在サービスを一時停止中です。ご迷惑をおかけしますが、ご理解の程よろしくお願いいたします</Typography>
            <CardContent>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="お名前(例：山田太郎)"
                value={name}
                margin="dense"
                onChange={event => setName(event.target.value)}
              />
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
               <TextField
                variant="outlined"
                required
                fullWidth
                label="パスワード(確認用)"
                type={showPassword ? 'text' : 'password'}
                value={passwordConfirmation}
                margin="dense"
                autoComplete="current-password"
                onChange={event => setPasswordConfirmation(event.target.value)}
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
                fullWidth
                disableElevation
                color="primary"
                disabled={!name || !email || !password || !passwordConfirmation ? true : false}
                className={classes.signupBtn}
                onClick={handleSubmit}
              >
                登録する
              </Button>

              <Box textAlign="center" className={classes.box}>
                <Typography variant="body2">
                  会員登録することで、
                  <Link to="/terms" className={classes.link}>
                    利用規約
                  </Link>
                  ・
                  <Link to="/privacy" className={classes.link}>
                    プライバシーポリシー
                  </Link>
                  に同意したものとみなされます。
                </Typography>
              </Box>
              
              <Box textAlign="center" className={classes.box}>
                <Typography variant="body2">
                  アカウントをお持ちですか? &nbsp;
                  <Link to="/signin" className={classes.link}>
                    ログインはこちらから
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
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="パスワードが一致していません"
      />
      </div>
    </>
  )
}

export default SignUp
