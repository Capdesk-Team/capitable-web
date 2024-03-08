import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';
import { 
  Divider,
  Typography,
  Box
} from "@material-ui/core"
// API
import { showOrganization } from 'api/organization'
import { getOrganizationsList } from 'interfaces/organization'
// Styles
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  image: {
    border: 'solid 1px #dfdfdf',
    borderRadius: 4
  },
}))

const MainFeaturedPost: React.FC = () => {

  // styleを定義
  const classes = useStyles()

  const { id } = useParams<{ id: string | undefined }>(); 

  const [organizationList, setOrganizationList] = useState<getOrganizationsList[]>([]);

  // id が undefined の場合は NaN を返す
  const orgId = id ? parseInt(id) : NaN;

  useEffect(() => {
    // isNaN() 関数を使用して orgId が NaN でないことを確認し、適切に処理する
    if (!isNaN(orgId)) {
      handleGetOrganization(orgId);
    } else {
      console.error('組織IDが無効です');
    }
  }, [orgId]);

  const handleGetOrganization = async (id: number) => {
    try {
      const res = await showOrganization(id);
      console.log(res.data);
      setOrganizationList([res.data]); // データを配列に追加する
    } catch(e) {
      console.log(e);
    }
  }  

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
              {organizationList.map((organization: getOrganizationsList, index) => (
                <Grid key={index} item>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <img
                        src={`https://capitable-api-eb39432eaef1.herokuapp.com/${organization.image.url}`}
                        alt="企業イメージ"
                        className={classes.image}
                        width="92"
                        height="92"
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">
                        {organization.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Divider/>
    </>
  );
}

export default MainFeaturedPost;
