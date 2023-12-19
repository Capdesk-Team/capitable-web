import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "App"
// API
import { getProject } from 'api/project'
// Interfaces
import { getProjectList } from 'interfaces/project'
// Material UI
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Grid } from "@material-ui/core"


// Styles
import { makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  image: {
    border: 'solid 1px #dfdfdf',
    borderRadius: 4
  },
  projectItem: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  companyName: {
    fontWeight: 600,
    fontSize: 16
  },
  projectCard: {
    minWidth: 360
  }
}))

const Home: React.FC = () => {
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

  const { isSignedIn, currentUser } = useContext(AuthContext)

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <Typography
              variant="h6"
            >
              スタートアップを見つける
            </Typography>
            <Grid container spacing={4} className={classes.container}>
              {projectList.map((project: getProjectList, index) => (
              <Grid container key={index} item xs={12} md={4}>
                <Card elevation={1} className={classes.projectCard}>
                  <CardContent>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <img
                          src={`${project.image.url}`}
                          alt="企業イメージ"
                          className={classes.image}
                          width="72"
                          height="72"
                        />
                      </Grid>
                      <Grid item>
                        <span className={classes.companyName}>
                          {project.companyName}
                        </span>
                      </Grid>
                    </Grid>
                    {/* <Typography className={classes.projectItem}>
                      <Chip label={project.techStack} variant="outlined" />
                    </Typography> */}
                    <Typography>
                      {project.title}
                    </Typography>
                    <Button
                      className={classes.projectItem}
                      component={Link}
                      to={`/project/${project.id}`}
                      color="primary"
                      variant="outlined"
                    >
                      求人詳細へ
                    </Button>
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
    </>
  )
}

export default Home
