import React, { useState, useContext, useEffect } from "react"
import { useParams } from 'react-router';
import { AuthContext } from "App"
// API
import { getApply } from 'api/apply'
// Interfaces
import { ApplyUsers } from 'interfaces/apply'
// Material UI
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import {Grid}  from "@material-ui/core"
// Components
import { dashboardListItems } from './DashboardListItems';

const drawerWidth = 240;

const GetApplyUsers: React.FC = () => {

  const { id } = useParams<{ id: string | undefined }>(); 

  useEffect(() => {
    if (id) {
      handleGetApplyUsers(id)
    }
  }, [id]);

  const { isSignedIn, currentUser } = useContext(AuthContext)
  const [applyUsers, setApplyUsers ] = useState<ApplyUsers[]>([])

  const handleGetApplyUsers = async (id: string) => {
    try {
      const res = await getApply(id);
      console.log(res.data)
      setApplyUsers(res.data)
    } catch(e) {
      console.log(e);
    }
  }
  
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* ナビゲーションバー */}
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
              {dashboardListItems}
            </List>
          </Drawer>
        </Box>

        {/* 応募者の確認 */}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          {
            isSignedIn && currentUser ? (
            <>
              <Typography
                variant="h6"
              >
                応募者一覧
              </Typography>
              <Grid container direction="column" spacing={2}>
                {applyUsers.map((apply: ApplyUsers, index) => (
                  <Grid key={index} item>
                    <Card>
                      <CardContent>
                        <Typography>
                          {apply.user.name}
                        </Typography>
                        <Typography>
                          {apply.user.techSkill}
                        </Typography>
                        <Typography>
                          {apply.user.portfolioUrl}
                        </Typography>
                        <Typography>
                          {apply.user.career}
                        </Typography>
                        <Typography>
                          {apply.user.nextCareer}
                        </Typography>
                        <Typography>
                          {apply.user.githubUrl}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
            ) : (
              <h2>ログインが必要です</h2>
            )
          }
        </Box>
    </Box>
    </>
  );
}

export default GetApplyUsers