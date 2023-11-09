import  React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';

import { getDetail } from 'api/project'

const ProjectDetail:React.FC = () => {

  const [data, setData] = useState({
    companyName: '',
    title: '',
    content: '',
  });

  const query = useParams();
  console.log(query.id);

  useEffect(() => {
    handleGetDetail(query)
  }, [query]);

  const handleGetDetail = async (query: number) => {
    try {
      const res = await getDetail(query.id);
      console.log(res.data);
      setData(res.data);
    } catch(e) {

    }
  }


  return (
    <>
      <div>
      <div>会社名：{data.companyName}</div>
      <div>募集タイトル：{data.title}</div>
      <div>募集内容：{data.content}</div>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        size="large"
      >
        応募する
      </Button>
      </div>

    </>
  );
}

export default ProjectDetail