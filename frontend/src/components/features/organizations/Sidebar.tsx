import { useState, useEffect } from "react"
import { useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import {
  Grid,
  Divider
} from '@material-ui/core'

// API
import { showOrganization } from 'api/organization'
import { getOrganizationsList } from 'interfaces/organization'
// 都道府県のマスターデータ
import { prefectures } from "data/prefectures"

const Sidebar = () => {

  const organizationPrefecture = (index: number): string => {
    // 都道府県の整数を取得し、文字列に変換して返す
    if (getOrganization[index]) {
      return prefectures[(getOrganization[index].prefecture) - 1].toString();
    } else {
      return '';
    }
  }

  const { id } = useParams<{ id: string | undefined }>();
  const [getOrganization, setGetOrganization] = useState<getOrganizationsList[]>([]);

  // id が undefined の場合は NaN を返す
  const orgId = id ? parseInt(id) : NaN;

  useEffect(() => {
    // isNaN() 関数を使用して orgId が NaN でないことを確認し、適切に処理する
    if (!isNaN(orgId)) {
        handleShowOrganization(orgId);
    } else {
      console.error('組織IDが無効です');
    }
  }, [orgId]);

  // 法人詳細情報を取得
  const handleShowOrganization = async (id: number) => {
    try {
      const res = await showOrganization(id);
      console.log(res.data);
      setGetOrganization([res.data]); 
    } catch(e) {
      console.log(e);
    }
  }  

  return (
    <>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          会社情報
        </Typography>
        <Divider/>
        {/* 直接オブジェクトのプロパティにアクセス */}
        {getOrganization.map((organization: getOrganizationsList, index) => (
          <Grid key={index} item>
            <Typography>
              URL：{organization.serviceLink}
            </Typography>
            <Typography>
              メンバー数：{organization.members}
            </Typography>
            <Typography>
              代表者名：{organization.presidentName}
            </Typography>
            <Typography>
              住所： {organizationPrefecture(index)} {organization.addressCity}  {organization.addressStreet} {organization.addressBuilding}
            </Typography>
            <Typography>
              設立年度： {organization.zipCode}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Sidebar;