import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "App"
// API
import { getOrganizations } from 'api/organization'
import { getJobs } from 'api/job'
// Interfaces
import { getOrganizationsList } from 'interfaces/organization'
import { getJobsList } from 'interfaces/job'

// Material UI
import Stack from '@mui/material/Stack';
import { 
  Container, 
  Grid, 
  Chip, 
  Card, 
  CardContent,
} from "@material-ui/core"
import Links from '@mui/material/Link';
import Typography from '@material-ui/core/Typography'
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CardActionArea } from '@mui/material';
// Styles
import { makeStyles, Theme } from "@material-ui/core/styles"
// Component
import AlertMessage from "components/utils/AlertMessage"
import Header from "components/layouts/Header"
import Footer from "components/layouts/Footer"

// マスターデータ
import { rounds } from "data/rounds"
import { industries } from "data/industries"
import { employmentSystems } from "data/employmentSystems"

// Styleを定義
const useStyles = makeStyles((theme: Theme) => ({
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
  },
  wrapper: {
    height: '100%',
    minHeight: '100vh',
    position: 'relative',
    paddingBottom: 120,
    boxSizing: "border-box",
  },
  container: {
    marginTop: "2rem",
    marginBottom: "6rem"
  },
  organizationCard: {
    marginBottom: "0.5rem"
  },
  categoryTag: {
    marginTop: theme.spacing(1)
  }
}))

const Home: React.FC = () => {
  const [jobLists, setJobLists ] = useState<getJobsList[]>([]);
  const [organizationsList, setOrganizationsList ] = useState<getOrganizationsList[]>([]);
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const organizationRound = (index: number): string => {
    // ラウンドの整数を取得し、文字列に変換して返す
    if (organizationsList[index]) {
      return rounds[(organizationsList[index].round)].toString();
    } else {
      return '';
    }
  }

  const organizationIndustry = (index: number): string => {
    // 事業カテゴリーのintegerを取得し、stringに変換して返す
    if (organizationsList[index]) {
      return industries[(organizationsList[index].industry)].toString();
    } else {
      return '';
    }
  }

  const jobEmploy = (index: number): string => {
    // ラウンドのintegerを取得し、stringに変換して返す
    if (jobLists[index]) {
      return employmentSystems[(jobLists[index].employmentSystem)].toString();
    } else {
      return '';
    }
  }
  
  // styleを定義
  const classes = useStyles()

  // 求人一覧を表示
  useEffect(() => {
    handleGetJobs();
  }, []);

  // 法人一覧を表示
  useEffect(() => {
    handleGetOrganizations();
  }, []); 

  // 法人一覧を取得
  const handleGetOrganizations = async () => {
    try {
      const res = await getOrganizations()
      console.log(res.data)
      setOrganizationsList(res.data)
    } catch(e) {
      console.log(e);
    }
  }

  // 求人一覧を取得
  const handleGetJobs = async () => {
    try {
      const res = await getJobs();
      console.log(res.data)
      setJobLists(res.data)
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
            <div className={classes.wrapper}>
            <header>
              <Header/>
            </header>
            <Container className={classes.container}>
              <Typography
                variant="h6"
              >
                募集を見つける
              </Typography>
            
              <Grid container spacing={4} className={classes.container}>
                {jobLists.map((job: getJobsList, index) => (
                <Grid container key={index} item xs={12} md={4}>
                  <Card elevation={1} className={classes.projectCard}>
                    <CardActionArea component={Link} to={`/job/${job.id}`}>
                      <CardContent>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item>
                            <img
                              src={`https://capitable-api-eb39432eaef1.herokuapp.com/${job.organization.image.url}`}
                              alt="企業イメージ"
                              className={classes.image}
                              width="72"
                              height="72"
                            />
                          </Grid>
                          <Grid item>
                            <span>{job.organization.name}</span>
                          </Grid>
                          <Grid item>
                            <Links className={classes.companyName} color="inherit" underline="hover">
                              {job.title}
                            </Links>
                          </Grid>
                        </Grid>
                        <Stack direction="row" spacing={1} className={classes.categoryTag}>
                          <Chip label={job.position} variant="outlined" />
                          <Chip label={jobEmploy(index)} variant="outlined" />
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
              </Grid>

              <Typography
                variant="h6"
              >
                スタートアップを見つける
              </Typography>

              <Grid container spacing={4} className={classes.container}>

                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                      条件で見つける(機能提供予定)
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      事業カテゴリー
                    </Typography>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label="AI" />
                      <FormControlLabel control={<Checkbox />} label="HRtech" />
                      <FormControlLabel control={<Checkbox />} label="Fintech" />
                      <FormControlLabel control={<Checkbox />} label="SaaS" />
                      <FormControlLabel control={<Checkbox />} label="マーケットプレイス" />
                      <FormControlLabel control={<Checkbox />} label="E-commerce" />
                    </FormGroup>
                    <Typography variant="h6" gutterBottom>
                      事業ステージ
                    </Typography>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label="シード" />
                      <FormControlLabel control={<Checkbox />} label="シリーズA" />
                      <FormControlLabel control={<Checkbox />} label="プレシリーズA" />
                      <FormControlLabel control={<Checkbox />} label="シリーズB" />
                      <FormControlLabel control={<Checkbox />} label="シリーズC" />
                      <FormControlLabel control={<Checkbox />} label="シリーズD" />
                      <FormControlLabel control={<Checkbox />} label="シリーズE" />
                    </FormGroup>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                  {organizationsList.map((organization: getOrganizationsList, index) => (
                  <Card key={index} className={classes.organizationCard}>
                    <CardActionArea　component={Link} to={`/organization/${organization.id}`}>
                      <CardContent>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item>
                            <img
                              src={`${organization.image.url}`}
                              alt="企業イメージ"
                              className={classes.image}
                              width="72"
                              height="72"
                            />
                          </Grid>
                          <Grid item>
                            <Typography gutterBottom variant="h5" component="div">
                              {organization.name}
                            </Typography>
                          </Grid>
                        </Grid>
                        
                        <Stack direction="row" spacing={1} className={classes.categoryTag}>
                          <Chip label={organizationIndustry(index)} variant="outlined" />
                          <Chip label={organizationRound(index)} variant="outlined" />
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>

                ))}
              </Grid>  
            </Grid>
            
          </Container>
            <footer>
              <Footer/>
            </footer>
          </div>
        </>
      ) : (
        <h2>ログインが必要です</h2>
      )}
      
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="success"
        message="ログインに成功しました"
      />
    </>
  )
}

export default Home
