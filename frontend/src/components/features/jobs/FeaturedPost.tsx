import { useState, useEffect } from "react"
import { useParams } from 'react-router';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

// API
import { showJob } from 'api/job'
import { JobOrganization } from 'interfaces/job'

// Styles
import { makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  subImage: {
    margin: theme.spacing(4)
  }
}))

export default function FeaturedPost() {

  const classes = useStyles()

  const { id } = useParams<{ id: string | undefined }>();
  const [getJobOrganization, setGetJobOrganization] = useState<JobOrganization[]>([]);

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
      console.log(res.data);
      setGetJobOrganization([res.data]); // 配列に追加する
    } catch(e) {
      console.log(e);
    }
  }  

  return (
    <>
      {getJobOrganization.map((job: JobOrganization, index) => (
        <Grid key={index} item>
          <Card sx={{ display: 'flex' }} className={classes.subImage}>
            <CardMedia
              component="img"
              sx={{ width: 320, display: { xs: 'none', sm: 'block' } }}
              src={`https://capitable-api-eb39432eaef1.herokuapp.com/${job.organization.cultureImage.url}`}
              alt=""
            />
          </Card>
        </Grid>
      ))}
    </>
  );
}