import React, { useState, useContext } from 'react';
import { AuthContext } from "App"
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
import { updateUser } from 'api/user';

type User = {
  id: number;
  uuid: string;
  techSkill: string
}

type UserEditFormProps = {
  user: User;
  onEdit: () => void;
}

const EditTechSkillForm: React.FC<UserEditFormProps> = ({ user, onEdit }) => {
  const { currentUser } = useContext(AuthContext)
  const id: string | undefined = currentUser!.uuid; // uuid
  const [techSkill, setTechSkill] = useState<string>(user?.techSkill || ''); // デフォルト値として空文字列を設定

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = {
        techSkill
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
        <h3>これまで経験してきた技術スタック・業務内容</h3>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ minWidth: 240 }}>
              <TextField
                fullWidth
                placeholder="(例) React/Next.js・プロダクトマネジャー"
                value={techSkill}
                onChange={(e) => setTechSkill(e.target.value)}
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

export default EditTechSkillForm;
