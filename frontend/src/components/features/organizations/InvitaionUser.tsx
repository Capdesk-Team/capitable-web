import React, { useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router';
import { AuthContext } from "App"
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// ログインユーザーが所属している法人を取得するAPI
import { showOrganization } from 'api/organization'
// 組織への新規招待API
import { newInvitationUsers } from 'api/invitation'
// Interfaces
import { Invitation } from 'interfaces/invitaion';

const InvitaionUser: React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  // Stateを定義
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState<string>("")
  const [invitaion, setInvitaion] = useState<Invitation[]>([]) 

  // 組織詳細を取得
  const [data, setData] = useState({
    id: 0,
  });

  // idを定義
  const { id } = useParams<{ id: string | undefined }>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    OrganizationDashboard(id)
  }, [id]);

  // 組織データの詳細を取得
  const OrganizationDashboard = async (query: string | undefined) => {
    try {
      // queryが存在する場合、プロジェクトデータをセッティングする
      if (query) {
        const res = await showOrganization(parseInt(query));
        setData(res.data);
        console.log(res.data)
      } else {
        console.error('組織IDが取得できませんでした');
      }
    } catch(e) {
      console.log(e);
    }
  }

  const handleClick = async () => {
    if (!id) {
      console.error('組織IDが取得できませんでした');
      return;
    }
  
    const organizationId = parseInt(id);
    const invitationData: Invitation = {
      email: email,
      userId: currentUser?.id,
      organizationId: organizationId
    }
    try {
      const res = await newInvitationUsers(organizationId, { invitation: invitationData });
      if (res?.status === 200) {
        setInvitaion([res.data.invitation, ...invitaion])
        console.log(res?.data)
        handleClose();
      } else {
        console.log("ユーザーの招待に失敗しました")
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <>
      <ListItemButton onClick={handleClickOpen}>
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="メンバーを招待する" />
      </ListItemButton>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>メンバーを招待する</DialogTitle>
        <DialogContent>
          <DialogContentText>
            以下のフォームから招待したいメンバーのメールアドレスを入力してください
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="メールアドレス"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />    
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button 
            onClick={() => handleClick()}
          >
            メンバーを招待する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InvitaionUser;