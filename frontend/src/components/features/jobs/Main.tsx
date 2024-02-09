import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';
import { 
  Divider,
  Typography,
  Box
}
from "@material-ui/core"
// API
import { showJob } from 'api/job'
// Styles
import { makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  organizationCard: {
    marginBottom: "0.5rem"
  },
  jobContent: {
    margin: theme.spacing(2)
  }
}))

const Main:React.FC = () => {

  const classes = useStyles()

  const { id } = useParams<{ id: string | undefined }>(); 

  // id が undefined の場合は NaN を返す
  const jobId = id ? parseInt(id) : NaN;

  useEffect(() => {
    // isNaN() 関数を使用して orgId が NaN でないことを確認し、適切に処理する
    if (!isNaN(jobId)) {
      handleShowJob(jobId);
    } else {
      console.error('組織IDが無効です');
    }
  }, [jobId]);


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
    content: '',
    requiredApply: '',
    welcomeApply: '',
    seekPerson: '',
    developmentEnv: '',
    notSolved: '',
    createdAt: Date
  });

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      
      <Divider />

      <Box className={classes.jobContent}>
        <Typography variant="h6" gutterBottom>
          業務内容
        </Typography>
        {data.content}
        <Divider />
      </Box>

      <Box className={classes.jobContent}>
        <Typography variant="h6" gutterBottom>
          必須条件
        </Typography>
        <Box>{data.requiredApply}</Box>
        <Divider />
      </Box>

      <Box className={classes.jobContent}>
        <Typography variant="h6" gutterBottom>
          歓迎条件
        </Typography>
        <Box>{data.welcomeApply}</Box>
        <Divider />
      </Box>

      <Box className={classes.jobContent}>
        <Typography variant="h6" gutterBottom>
          こんな方と働きたい
        </Typography>
        <Box>{data.seekPerson}</Box>
        <Divider />
      </Box>

      <Box className={classes.jobContent}>
        <Typography variant="h6" gutterBottom>
          開発環境
        </Typography>
        <Box>{data.developmentEnv}</Box>
        <Divider />
      </Box>

      <Box className={classes.jobContent}>
        <Typography variant="h6" gutterBottom>
          私たちがまだ取り組めていないこと
        </Typography>
        <Box>{data.notSolved}</Box>
      </Box>

      <Divider />

    </Grid>
  );
}

export default Main;