import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom"
import { 
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Typography,
}
from "@material-ui/core"
import Stack from '@mui/material/Stack';

// API
import { getJobs } from 'api/job'
// Interfaces
import { getJobsList } from 'interfaces/job'
// Styles
import { makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  organizationCard: {
    marginBottom: "0.5rem"
  }
}))

const ShowOrganization:React.FC = () => {

  const [jobLists, setJobLists ] = useState<getJobsList[]>([]);

  const classes = useStyles()

  const { id } = useParams<{ id: string | undefined }>(); 

  // id が undefined の場合は NaN を返す
  const orgId = id ? parseInt(id) : NaN;

  useEffect(() => {
    // isNaN() 関数を使用して orgId が NaN でないことを確認し、適切に処理する
    if (!isNaN(orgId)) {
      handleGetJobs(orgId);
    } else {
      console.error('組織IDが無効です');
    }
  }, [orgId]);


  const handleGetJobs = async (id: number) => {
    try {
      const res = await getJobs(id);
      console.log(res.data)
      setJobLists(res.data)
    } catch(e) {
      console.log(e);
    }
  }

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
      <Typography variant="h6" gutterBottom>
        私たちが解決したい課題
      </Typography>
      <Divider />

      <Typography variant="h6" gutterBottom>
        業務内容
      </Typography>
      <Divider />

      <Typography variant="h6" gutterBottom>
        募集背景
      </Typography>
      <Divider />

      <Typography variant="h6" gutterBottom>
        必須条件
      </Typography>
      <Divider />

      <Typography variant="h6" gutterBottom>
        歓迎条件
      </Typography>
      <Divider />

      <Typography variant="h6" gutterBottom>
        こんな方と働きたい
      </Typography>
      <Divider />

      <Typography variant="h6" gutterBottom>
        開発環境
      </Typography>
      <Divider />

      <Typography variant="h6" gutterBottom>
        私たちがまだ取り組めていないこと
      </Typography>
      <Divider />

      <Grid item xs={12} md={8}>
        {jobLists.map((job: getJobsList, index) => (
        <Card key={index} className={classes.organizationCard}>
          <CardActionArea　component={Link} to={`/job/${job.id}`}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {job.title}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label={`${job.position}`} variant="outlined" />
                <Chip label={`${job.employmentSystem}`} variant="outlined" />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>

      ))}
    </Grid>  

    </Grid>
  );
}

export default ShowOrganization;