import React, { useState, useContext } from 'react';
import { AuthContext } from "App"

// Material UI
import Box from '@mui/material/Box';
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid'
import IconButton from '@mui/material/IconButton';

// Import Components
import EditSnsProfileForm from './EditSnsProfileForm';

// Userの型を定義
type User = {
  id: number;
  uuid: string
  facebookUrl: string
  githubUrl: string
};
// propsを定義
type UserProps = {
  user: User;
};

const SnsProfile: React.FC<UserProps> = ({ user }) => {

  const { currentUser } = useContext(AuthContext)

  const [isEditing, setIsEditing] = useState(false);

  // 編集中
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 編集をキャンセル
  const handleEditCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {/* 編集中かを判定するフラグ */}
      {!isEditing ? (
        <div>
          <Box display="flex" flexDirection="row" alignItems="center">
            <h3>SNS連携</h3>
            <Box flexGrow={1} />
            <Box>
              <Button 
              variant="outlined" 
              startIcon={<EditIcon />} 
              onClick={handleEditClick} 
              >
                連携する
              </Button>
            </Box>
          </Box>
          {/* currentUserが存在している場合に表示 */}
          {currentUser && (
            <>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <a href={user.githubUrl}>
                    <IconButton>
                      <img src="/github-icon.svg" width="40" height="40" alt="GitHubアイコン" />
                    </IconButton>
                  </a>
                </Grid>
                <Grid item>
                  <a href={user.facebookUrl}>
                    <IconButton>
                      <img src="/facebook-icon.svg" width="40" height="40" alt="Facebookアイコン" />
                    </IconButton>
                  </a>
                </Grid>
              </Grid>
            </>
          )}
        </div>
      ) : (
        <EditSnsProfileForm user={user} onEdit={handleEditCancel} />
      )}

    </div>
  );
};

export default SnsProfile;