import React, { useState, useContext } from 'react';
import { AuthContext } from "App"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
import { updateUser } from 'api/user';
import TextField from '@mui/material/TextField';

type User = {
  id: number;
  uuid: string;
  nextCareer: string
}

type UserEditFormProps = {
  user: User;
  onEdit: () => void;
}

const EditNextCareerForm: React.FC<UserEditFormProps> = ({ user, onEdit }) => {
  const { currentUser } = useContext(AuthContext)
  const id: string | undefined = currentUser!.uuid; // uuid
  const [nextCareer, setNextCareer] = useState<string>(user?.nextCareer || ''); // デフォルト値として空文字列を設定

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = {
        nextCareer
      };
      await updateUser(id, userData);
      onEdit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>今後挑戦してみたい業務内容・業界</h3>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ minWidth: 240 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="(例)アーキテクチャー設計・HR業界"
                value={nextCareer}
                onChange={(e) => setNextCareer(e.target.value)}
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

export default EditNextCareerForm;
