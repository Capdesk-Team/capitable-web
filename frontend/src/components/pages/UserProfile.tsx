import React, { useState, useContext, useCallback} from "react"
import { AuthContext } from "App"
import Cookies from "js-cookie"
// API
import { updateUser } from "api/user"
// Interfaces
import { UpdateFormData } from "interfaces/user";
// Material UI
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import EditIcon from '@material-ui/icons/Edit';
import Toolbar from "@material-ui/core/Toolbar"
import { Grid } from "@material-ui/core"
// Material Styles
import { makeStyles, Theme } from "@material-ui/core/styles"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField"
import Avatar from "@material-ui/core/Avatar"
// Components
import { ProfileListItems } from './ProfileListItems';
import AlertMessage from "components/utils/AlertMessage"

const drawerWidth = 240;

// Style
const useStyles = makeStyles((theme: Theme) => ({
  content: {
    margin: theme.spacing(2),
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
  },
  button: {
    margin: theme.spacing(3),
    width: '200px',
    marginLeft: '40%'
  },
  image: {
    border: 'solid 1px #dfdfdf',
    borderRadius: 4
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[24],
    padding: theme.spacing(4),
  },
  avatar: {
    width: 120,
    height: 120
  },
  profile: {
    width: 400,
    minHeight: 600,
    marginBottom: theme.spacing(8)
  },
  profileItem: {
    marginTop: theme.spacing(2)
  },
  profileContent: {
    color: 'gray',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    border: 'solid 1px #dfdfdf',
    borderRadius: 5,
    minHeight: 64
  },
  editButton: {
    textAlign: 'right',
    display: 'block',
    marginBottom: theme.spacing(1)
  }
}))

const UserProfile: React.FC = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isSignedIn, setIsSignedIn, setCurrentUser, currentUser } = useContext(AuthContext)

  const [techSkill, setTechSkill] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [githubUrl, setGithubUrl] = useState<string>("")
  const [portfolioUrl, setPortfolioUrl] = useState<string>("")
  const [facebookUrl, setFacebookUrl] = useState<string>("")
  const [career, setCareer] = useState<string>("")
  const [nextCareer, setNextCareer] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const uploadImage = useCallback((e: any) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  const createFormData = (): UpdateFormData => {
    const formData = new FormData()

    formData.append("userId", currentUser?.id || "")
    formData.append("image", image)
    formData.append("techSkill", techSkill)
    formData.append("githubUrl", githubUrl)
    formData.append("portfolioUrl", portfolioUrl)
    formData.append("facebookUrl", facebookUrl)
    formData.append("career", career)
    formData.append("nextCareer", nextCareer)


    return formData
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = createFormData()

    try {
      const res = await updateUser(currentUser?.id, data)
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.user)


        setTechSkill("")
        setFacebookUrl("")
        setGithubUrl("")
        setCareer("")
        setNextCareer("")
        setPortfolioUrl("")

        console.log("ユーザー情報の更新に成功しました")
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
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* ナビゲーションバー */}
        <AppBar
          position="fixed"
          color="default"
        >
          <Toolbar/>
        </AppBar>

        {/* サイドメニューバー */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            open
          >
            <Toolbar />
            <Divider />
            <List>
              {ProfileListItems}
            </List>
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
        <h2>プロフィール</h2>
        <Card className={classes.profile}>
          <CardContent>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar/>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {currentUser?.name}
              </Typography>
            </Grid>
          </Grid>
      
          <Box className={classes.editButton}>
            <Button variant="outlined" startIcon={<EditIcon/>} onClick={handleOpen}>
              プロフィール編集
            </Button>
          </Box>

          <Divider/>

          <Typography className={classes.profileItem}>
            これまで経験してきた技術スタック
          </Typography>
          <Divider/>
          <Box className={classes.profileContent}>
            {currentUser?.techSkill ? currentUser.techSkill : 
              '(例) Ruby on Rails・Vue・Go'}
          </Box>

          <Typography className={classes.profileItem}>
            ポートフォリオURL
          </Typography>
          <Divider/>
          <Box className={classes.profileContent}>
            {currentUser?.portfolioUrl ? currentUser.portfolioUrl : 
              '(例) https://'}
          </Box>

          <Typography className={classes.profileItem}>
            これまでの経歴
          </Typography>
          <Divider/>
          <Box className={classes.profileContent}>
            {currentUser?.portfolioUrl ? currentUser.portfolioUrl : 
              '(例) これまでの経歴を入力'}
          </Box>

          <Typography className={classes.profileItem}>
            今後やっていきたいこと
          </Typography>
          <Divider/>
          <Box className={classes.profileContent}>
          　{currentUser?.nextCareer ? currentUser.nextCareer : 
              'API設計から実装までをやっていきたい'}
          </Box>
              
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>プロフィール編集</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  プロフィールを最新にアップデートしましょう。以下のフォームから入力できます。
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="GitHub URL"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={githubUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGithubUrl(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Facebook URL"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={facebookUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFacebookUrl(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Portfolio URL"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={portfolioUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPortfolioUrl(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="経験のある技術スタック"
                  type="email"
                  multiline
                  rows={4}
                  fullWidth
                  variant="standard"
                  value={techSkill}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechSkill(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="経歴"
                  type="email"
                  multiline
                  rows={4}
                  fullWidth
                  variant="standard"
                  value={career}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCareer(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="これからやっていきたいこと"
                  type="email"
                  multiline
                  rows={4}
                  fullWidth
                  variant="standard"
                  value={nextCareer}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNextCareer(e.target.value)}
                />
                <Typography>
                  プロフィール画像をアップロード
                </Typography>
                <div>
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      uploadImage(e)
                    }}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>キャンセル</Button>
                <Button 
                  onClick={handleSubmit} 
                  color="primary" 
                  variant="contained" 
                  disableElevation
                >
                  更新する
                </Button>
              </DialogActions>
          </Dialog>
          </CardContent>
        </Card>

      </Box>
    </Box>
    <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="プロフィールの更新に失敗しました"
      />

    </>
  );
}

export default UserProfile