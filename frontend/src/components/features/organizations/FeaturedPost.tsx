import { useState, useEffect } from "react"
import { useParams } from 'react-router';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

// API
import { showOrganization } from 'api/organization'
import { getOrganizationsList } from 'interfaces/organization'

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
  const [organizationList, setOrganizationList] = useState<getOrganizationsList[]>([]);

  // id が undefined の場合は NaN を返す
  const jobId = id ? parseInt(id) : NaN;

  useEffect(() => {
    // isNaN() 関数を使用して orgId が NaN でないことを確認し、適切に処理する
    if (!isNaN(jobId)) {
        handleShowOrganization(jobId);
    } else {
      console.error('組織IDが無効です');
    }
  }, [jobId]);

  const handleShowOrganization = async (id: number) => {
    try {
      const res = await showOrganization(id);
      console.log(res.data);
      setOrganizationList([res.data]); // 配列に追加する
    } catch(e) {
      console.log(e);
    }
  }  

  return (
    <>
      {organizationList.map((organization: getOrganizationsList, index) => (
        <Grid key={index} item>
          <Card sx={{ display: 'flex' }} className={classes.subImage}>
            <CardMedia
              component="img"
              sx={{ width: 320, display: { xs: 'none', sm: 'block' } }}
              src={`http://localhost:3001/${organization.cultureImage.url}`}
              alt=""
            />
          </Card>
        </Grid>
      ))}
    </>
  );
}