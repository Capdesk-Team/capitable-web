import { useState, useEffect } from "react"
import { useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import {
  Grid,
  Divider
} from '@material-ui/core'

// API
import { showJob } from 'api/job'
import { JobOrganization } from 'interfaces/job'
// Component
import ApplyButton from "./ApplyButton";

const Sidebar: React.FC = () => {

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
      
      {/* 応募機能 */}
      <ApplyButton/>

      {/* 会社情報 */}
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

export default Sidebar;