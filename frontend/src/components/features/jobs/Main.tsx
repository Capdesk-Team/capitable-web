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

// Styleを定義
const useStyles = makeStyles((theme: Theme) => ({
  organizationCard: {
    marginBottom: "0.5rem"
  },
  jobContent: {
    margin: theme.spacing(2)
  },
  contentData: {
    whiteSpace: 'pre-line'
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
    content: '',
    requiredApply: '',
    welcomeApply: '',
    seekPerson: '',
    developmentEnv: '',
    workEnv: '',
    process: '',
    salarySystem: '',
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
      {/* 募集要項 */}
      <Divider />

      <Box className={classes.jobContent}>
        <Typography variant="h6" gutterBottom>
          業務内容
        </Typography>
        <Box className={classes.contentData}>
          {data.content}
        </Box>
      </Box>
      <Divider />

      <Box className={classes.jobContent}>
        <Typography variant="h6" gutterBottom>
          開発環境
        </Typography>
        <Box className={classes.contentData}>
          {data.developmentEnv}
        </Box>
      </Box>
      <Divider />

      <Box className={classes.jobContent}>
        <Typography variant="h6" gutterBottom>
          必須条件
        </Typography>
        <Box className={classes.contentData}>
          {data.requiredApply}
        </Box>
      </Box>
      <Divider />

      <Box className={classes.jobContent}>
        <Typography variant="h6" gutterBottom>
          歓迎条件
        </Typography>
        <Box className={classes.contentData}>
          {data.welcomeApply}
        </Box>
      </Box>
      <Divider />

      <Box className={classes.jobContent}>
        <Typography variant="h6" gutterBottom>
          こんな方と働きたい
        </Typography>
        <Box className={classes.contentData}>
          {data.seekPerson}
        </Box>
      </Box>
      <Divider />

      <Box className={classes.jobContent}>
        <Typography variant="h6" gutterBottom>
          働く環境
        </Typography>
        <Box className={classes.contentData}>
          {data.workEnv}
        </Box>
      </Box>
      <Divider />

      <Box className={classes.jobContent}>
        <Typography variant="h6" gutterBottom>
          選考プロセス
        </Typography>
        <Box className={classes.contentData}>
          {data.process}
        </Box>
      </Box>
      <Divider />
      
      <Box className={classes.jobContent}>
        <Typography variant="h6" gutterBottom>
          給与形態
        </Typography>
        <Box className={classes.contentData}>
          {data.salarySystem}
        </Box>
      </Box>
      
      <Divider />

    </Grid>
  );
}

export default Main;