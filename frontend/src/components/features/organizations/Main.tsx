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
import { showOrganization } from 'api/organization'
// Styles
import { makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  organizationCard: {
    marginBottom: "0.5rem"
  },
  organizationContent: {
    margin: theme.spacing(2)
  }
}))

const Main:React.FC = () => {

  const classes = useStyles()

  const { id } = useParams<{ id: string | undefined }>(); 

  // id が undefined の場合は NaN を返す
  const orgId = id ? parseInt(id) : NaN;

  useEffect(() => {
    // isNaN() 関数を使用して orgId が NaN でないことを確認し、適切に処理する
    if (!isNaN(orgId)) {
      handleShowJob(orgId);
    } else {
      console.error('組織IDが無効です');
    }
  }, [orgId]);


  const handleShowJob = async (id: number) => {
    try {
      const res = await showOrganization(id);
      console.log(res.data)
      setData(res.data);
    } catch(e) {
      console.log(e);
    }
  }

  // プロジェクト詳細データ型
  const [data, setData] = useState({
    id: '',
    projects: '',
    solveProblems: '',
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

      <Box className={classes.organizationContent}>
        <Typography variant="h6" gutterBottom>
          事業内容
        </Typography>
        {data.projects}
        <Divider />
      </Box>

      <Box className={classes.organizationContent}>
        <Typography variant="h6" gutterBottom>
          解決したい課題
        </Typography>
        <Box>{data.solveProblems}</Box>
      </Box>

      <Divider />

    </Grid>
  );
}

export default Main;