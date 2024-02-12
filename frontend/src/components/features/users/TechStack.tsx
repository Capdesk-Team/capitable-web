import React from 'react'
// Material UI
import Box from '@mui/material/Box';
import Button from "@material-ui/core/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

const TechStack = () => {
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
        <h3>これまでの経歴</h3>
        <Box flexGrow={1} />
        <Box>
          <Button variant="outlined" startIcon={<EditIcon />} onClick={handleClickOpen}>
            編集
          </Button>
        </Box>
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
            name="techStack"
            label="これまでの経歴"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={6}
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

export default TechStack