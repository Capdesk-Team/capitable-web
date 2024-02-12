import React from 'react'
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

const SocialAccount = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <IconButton>
          <img src="/github-icon.svg" width="36" height="36" alt="GitHubアイコン"/>
        </IconButton>
        <IconButton>
          <img src="/facebook-icon.svg" width="36" height="36" alt="Facebookアイコン"/>
        </IconButton>
        <IconButton>
          <img src="/x-icon.svg" width="30" height="30" alt="X(Twitter)アイコン"/>
          {/* 条件付きレンダー or 三項演算子 */}
        </IconButton>
        <Box flexGrow={1} />
        <Button variant="outlined" onClick={handleClickOpen}>
          SNS連携
        </Button>
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
        <DialogTitle>SNS連携</DialogTitle>
        <DialogContent>
          <DialogContentText>
            以下のフォームから、SNSをプロフィールに連携することができます。
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="GitHub URL"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="Facebook URL"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="X(Twitter) URL"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button type="submit">保存する</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SocialAccount