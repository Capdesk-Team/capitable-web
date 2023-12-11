// React
import React, { useState, useContext, useEffect } from "react"
import { Link } from 'react-router-dom';
import { AuthContext } from "App"
// API
import { getProject } from 'api/project'
// Interfaces
import { getProjectList } from 'interfaces/project'
// Material UI
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import {Grid}  from "@material-ui/core"
import Divider from '@material-ui/core/Divider'
// Styles
import { makeStyles, Theme } from "@material-ui/core/styles"
// Components
import { dashboardListItems } from './DashboardListItems';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    textDecoration: "none",
    color: "blue",
    "&:hover, &:active, &:focus": {
      color: "blue",
      textDecoration: "none", 
    }
  },
}))

const Dashboard: React.FC = () => {

  const { isSignedIn, currentUser } = useContext(AuthContext)
  const [projectList, setProjectList ] = useState<getProjectList[]>([]);

  const classes = useStyles()

  useEffect(() => {
    handleGetProject();
  }, []); 

  const handleGetProject = async () => {
    try {
      const res = await getProject()
      console.log(res.data)
      setProjectList(res.data)
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
          <Toolbar />
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
              
              
        {/* 自分が作成したプロジェクト */}
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
                作成した募集一覧
              </Typography>

              <Grid container spacing={4} >
                {projectList.map((project: getProjectList, index) => (
                  <React.Fragment key={index}>
                      {currentUser.id === project.userId ? (
                      <Grid key={index} item xs={12} md={4}>
                        <Card>
                          <CardContent>
                            <Typography
                              variant="h6"
                            >
                              募集内容
                            </Typography>
                            <Typography>
                              {project.title}
                            </Typography>
                            <Button
                              component={Link}
                              to={`/project/${project.id}/apply`}
                              color="primary"
                              variant="outlined"
                            >
                              応募者を確認する
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                      ) : null}
                  </React.Fragment>
                ))}
              </Grid>
            </>
            ) : (
              <>
                <h2>ログインが必要です</h2>
                <Button>
                  <Link to="/signin" className={classes.link}>
                    ログインはこちらから
                  </Link>
                </Button>
              </>
            )
          }
        </Box>
      </Box>
    </>
  );
}

export default Dashboard