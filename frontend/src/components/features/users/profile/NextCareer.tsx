import React, { useState, useContext } from 'react';
import { AuthContext } from "App"

// Material UI
import Box from '@mui/material/Box';
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button"

// Import Components
import EditNextCareerForm from './EditNextCareerForm'
// Import Style
import { makeStyles, Theme } from "@material-ui/core/styles"

// Userの型を定義
type User = {
  id: number;
  uuid: string
  nextCareer: string
};
// propsを定義
type UserProps = {
  user: User;
};

// Styleを定義
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

const Portfolio: React.FC<UserProps> = ({ user }) => {
  const classes = useStyles()

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
            <h3>今後やっていきたいこと</h3>
            <Box flexGrow={1} />
            <Box>
              <Button 
              variant="outlined" 
              startIcon={<EditIcon />} 
              onClick={handleEditClick} 
              >
                編集する
              </Button>
            </Box>
          </Box>
          {/* currentUserが存在し、かつtechSkillがある場合に表示 */}
          {currentUser && (
            <Box className={classes.profileContent}>
              {currentUser.nextCareer}
            </Box>
          )}
        </div>
      ) : (
        <EditNextCareerForm user={user} onEdit={handleEditCancel} />
      )}

    </div>
  );
};

export default Portfolio;