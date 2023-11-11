import React, { useState, useEffect, useContext } from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom"
import { AuthContext } from "App"
import { getProject } from 'api/project'
import { getProjectList } from 'interfaces/project'
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Container, Grid } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  image: {
    border: 'solid 1px #dfdfdf',
    borderRadius: 4
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
        スタートアップ一覧
      </Typography>

      <Grid container spacing={4} className={classes.container}>
      {projectList.map((project: getProjectList, index) => (
        <Grid key={index} item xs={12} md={4}>
        <Card>
        <CardContent>
          <img　src={project.image.url} alt="企業イメージ" className={classes.image}/>
          <Typography
           variant="h6"
          >
            {project.companyName}
          </Typography>
          <Typography>
            {project.title}
          </Typography>
          <Button
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
