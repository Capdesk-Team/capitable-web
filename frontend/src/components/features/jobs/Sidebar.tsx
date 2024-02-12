import { useState, useEffect } from "react"
import { useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import {
  Button,
  Grid,
  Divider
} from '@material-ui/core'

// API
import { showJob } from 'api/job'
import { JobOrganization } from 'interfaces/job'
// Styles
import { makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  applyBtn: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    width: '280px',
    fontWeight: 600,
    backgroundColor: '#186aff',
  },
}))

export default function Sidebar() {

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
    <Grid item xs={12} md={4}>
      
      <Button
        variant="contained"
        color="primary"
        disableElevation
        size="large"
        className={classes.applyBtn}
      >
        応募する
      </Button>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        会社情報
      </Typography>
      <Divider/>
      {/* 直接オブジェクトのプロパティにアクセス */}
      {getJobOrganization.map((job: JobOrganization, index) => (
        <Grid key={index} item>
          <Typography>
            URL：{job.organization?.serviceLink}
          </Typography>
          <Typography>
            メンバー数：{job.organization?.members}
          </Typography>
          <Typography>
            代表者名：{job.organization?.presidentName}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
