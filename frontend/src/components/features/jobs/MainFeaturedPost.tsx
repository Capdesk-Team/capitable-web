import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';
import { 
  Divider,
  Typography,
  Box
}
from "@material-ui/core"
// Import Style
import { makeStyles, Theme } from "@material-ui/core/styles"
// API
import { showJob } from 'api/job'
import { JobOrganization } from 'interfaces/job'
// Styles
const useStyles = makeStyles((theme: Theme) => ({
  orgImg: {
    marginTop: theme.spacing(1),
    border: 'solid 1px #dfdfdf',
    borderRadius: 4
  },
}))


const MainFeaturedPost:React.FC = () => {
  const classes = useStyles()
  const { id } = useParams<{ id: string | undefined }>(); 

  const [getJobOrganization, setGetJobOrganization] = useState<JobOrganization[]>([]);

  // id が undefined の場合は NaN を返す
  const jobId = id ? parseInt(id) : NaN;

  useEffect(() => {
    // isNaN() 関数を使用して orgId が NaN でないことを確認し、適切に処理する
    if (!isNaN(jobId)) {
      handleJobOrganization(jobId);
    } else {
      console.error('組織IDが無効です');
    }
  }, [jobId]);

  const handleJobOrganization = async (id: number) => {
    try {
      const res = await showJob(id);
      console.log(res.data);
      setGetJobOrganization([res.data]); // 配列に追加する
    } catch(e) {
      console.log(e);
    }
  }  

  useEffect(() => {
    // isNaN() 関数を使用して orgId が NaN でないことを確認し、適切に処理する
    if (!isNaN(jobId)) {
      handleShowJob(jobId);
    } else {
      console.error('組織IDが無効です');
    }
  }, [jobId]);

  // 求人詳細を取得
  const handleShowJob = async (id: number) => {
    try {
      const res = await showJob(id);
      console.log(res.data)
      setData(res.data);
    } catch(e) {
      console.log(e);
    }
  }

  // プロジェクト詳細データ型
  const [data, setData] = useState({
    id: '',
    title: '',
  });

  return (
    <>
      <Grid container>
        <Grid item>
          <Box
            sx={{
              position: 'relative',
              pr: { md: 0 },
            }}
          >
            <Grid container alignItems="center" spacing={2}>

              {getJobOrganization.map((job: JobOrganization, index) => (
                <Grid key={index} item>
                  <Grid item>
                    <span>{job.organization.name}の求人</span>
                  </Grid>
                  <Grid item>
                    <img
                      src={`http://localhost:3001/${job.organization.image.url}`}
                      alt="企業イメージ"
                      width="92"
                      height="92"
                      className={classes.orgImg}
                    />
                  </Grid>
                </Grid>
              ))}
              <Grid item>
                <Typography component="h5" variant="h4" color="inherit" gutterBottom>
                  {data.title}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Divider/>
    </>
  );
}

export default MainFeaturedPost;