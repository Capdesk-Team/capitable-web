import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
// Material UI
// API
import { getOrganizationJobs } from 'api/organization'
// Interfaces
import { getOrganizationsList } from 'interfaces/organization'
import { Typography } from '@mui/material';

// ユーザーのリストを表示する
const OrganizationJobsLists: React.FC = () => {

  const { id } = useParams<{ id: string | undefined }>();
  // id が undefined の場合は NaN を返す
  const orgId = id ? parseInt(id) : NaN;

  const [organizationJobs, setOrganizationJobs] = useState<getOrganizationsList[]>([]);

  useEffect(() => {
    // isNaN() 関数を使用して orgId が NaN でないことを確認し、適切に処理する
    if (!isNaN(orgId)) {
      handleOrganizationJobs(orgId);
    } else {
      console.error('組織IDが無効です');
    }
  }, [orgId]);

  // 組織に所属しているユーザー一覧を取得
  const handleOrganizationJobs = async (id: number) => {
    try {
      const res = await getOrganizationJobs(id);
      console.log(res.data)
      setOrganizationJobs(res.data);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <>
      {organizationJobs.map((organizationJob: getOrganizationsList, index) => (
        <React.Fragment key={index}>
          <Typography>
            {organizationJob.title}
          </Typography>
        </React.Fragment>
      ))}
    </>
  );
}

export default OrganizationJobsLists;