import React, { useState, useContext, useCallback} from "react"
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
// api
import { updateUser } from "api/user";
import Toolbar from '@material-ui/core/Toolbar';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button"
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import EditIcon from '@material-ui/icons/Edit';
import { AuthContext } from "App"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField"
import Avatar from "@material-ui/core/Avatar"
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import { UpdateFormData } from "interfaces/user";
// Components
import { ProfileListItems } from './ProfileListItems';

const drawerWidth = 240;

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
    minHeight: 300
  },
}))

const UserProfile: React.FC = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext)

  const [techSkill, SetTechSkill] = useState<string>("")

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  const createFormData = (): UpdateFormData => {
    const formData = new FormData()

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
      const res = await updateUser(data)
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        histroy.push("/home")

        setName("")
        setEmail("")
        setPassword("")
        setPasswordConfirmation("")
        setGender(undefined)
        setPrefecture(undefined)
        setBirthday(null)

        console.log("Signed in successfully!")
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
        <h3>プロフィール</h3>
        <Card className={classes.profile}>
        <CardContent>
          <a href={currentUser?.githubUrl}>
            <GitHubIcon/>
          </a>
          <a href={currentUser?.facebookUrl}>
            <FacebookIcon color="primary"/>
          </a>
          <Button variant="outlined" startIcon={<EditIcon/>} onClick={handleOpen}>
            プロフィール編集
          </Button>
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
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Facebook URL"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Portfolio URL"
            type="email"
            fullWidth
            variant="standard"
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
          />
          <div className={classes.imageUploadBtn}>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  uploadImage(e)
                  previewImage(e)
                }}
              />
              <label htmlFor="icon-button-file">
                
              </label>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleSubmit}>更新する</Button>
        </DialogActions>
      </Dialog>
      

          <span>
            お名前：{currentUser?.name}
          </span>
          <Typography>
            使用技術：{currentUser?.techSkill}
          </Typography>
          <Typography
        >
          
        </Typography>
        <Divider/>
          <Typography>
            ポートフォリオサイト：{currentUser?.portfolioUrl}
          </Typography>
          <Typography>
            経歴：{currentUser?.career}
          </Typography>
          
          <Typography>
            今後やっていきたいこと：{currentUser?.nextCareer}
          </Typography>
        </CardContent>
        </Card>

      </Box>
    </Box>


    </>
  );
}

export default UserProfile