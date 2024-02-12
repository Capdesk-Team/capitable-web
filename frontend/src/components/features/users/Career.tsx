// Hooks API
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router';
import { AuthContext } from "App"
import { useNavigate } from "react-router-dom";
// API
import {getUser, updateUser} from "api/user"

// Material UI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from "@material-ui/core/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// Material Icons
import EditIcon from '@material-ui/icons/Edit';

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

const Career:React.FC = () => {

  const [career, setCareer] = useState("");

  // paramを定義
  const query = useParams();
  const navigate = useNavigate()

  const { currentUser } = useContext(AuthContext)

  const classes = useStyles()

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // プロフィール情報の初期値を取得
  useEffect(() => {
    const getUser = async () => {
      try {
        // idを元にTodoを取得する
        const res = await getUser();

        // フォームの初期値を設定する
        const { career } = res.data;
        setCareer(career);
      } catch (err) {
        console.log(err);
      }
    };

    // idが存在する場合は、Todoを取得する
    if (id) {
      getUser();
    }
  }, [id]);
  

  // フォームの入力値を更新する関数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // APIを呼び出して、Todoを更新する
      await updateUser( { user: { career } });

      // 
      navigate("`/user/${uid}`")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <h3>これまでの経歴</h3>
        <Box flexGrow={1} />
        <Box>
          <Button variant="outlined" startIcon={<EditIcon />} onClick={handleClickOpen}>
            編集
          </Button>
        </Box>
      </Box>


      <Box className={classes.profileContent}>
        {
        currentUser?.career ? (
          currentUser.career 
        ) : (
          'これまでの経歴'
        )}
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>経歴を入力</DialogTitle>
        <DialogContent>
          <DialogContentText>
            以下のフォームから、経歴を入力することができます。
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="techStack"
            label="これまでの経歴"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={6}
            onChange={(e) => setCareer(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleSubmit} type="submit">保存する</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Career