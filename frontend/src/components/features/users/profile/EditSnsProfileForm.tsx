import React, { useState, useContext } from 'react';
import { AuthContext } from "App"
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { 
  Button, 
  Typography 
} from '@material-ui/core';
import { updateUser } from 'api/user';

type User = {
  id: number;
  uuid: string;
  githubUrl: string;
  facebookUrl: string;  
}

type UserEditFormProps = {
  user: User;
  onEdit: () => void;
}

const EditSnsProfileForm: React.FC<UserEditFormProps> = ({ user, onEdit }) => {
  const { currentUser } = useContext(AuthContext)
  const id: string | undefined = currentUser!.uuid; // uuid
  const [githubUrl, setGithubUrl] = useState<string>(user?.githubUrl || ''); // デフォルト値として空文字列を設定
  const [facebookUrl, setFacebookUrl] = useState<string>(user?.facebookUrl || ''); // デフォルト値として空文字列を設定

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = {
        githubUrl,
        facebookUrl
      };
      if (id !== undefined) { // idがundefinedでないことを確認
        await updateUser(id, userData);
        onEdit();
      } else {
        console.error('idがundefinedです。');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>SNS連携</h3>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            
            <Box sx={{ minWidth: 240, marginBottom: '10px' }}>
              <Typography>GitHub URL</Typography>
              <TextField
                fullWidth
                placeholder="https://github.com/username"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </Box>
            <Box sx={{ minWidth: 240 }}>
              <Typography>Facebook URL</Typography>
              <TextField
                fullWidth
                placeholder="https://facebook.com/username"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
              />
            </Box>
          </Grid>
        </Grid>
        <Box my={1} flexDirection="row" justifyContent="flex-end" display="flex">
          <Button
            type="submit"
            variant="contained"
            disableElevation
          >
            キャンセル
          </Button>
        </Box>
        <Box my={1} flexDirection="row" justifyContent="flex-end" display="flex">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disableElevation
          >
            保存する
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EditSnsProfileForm;