import  React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { useParams } from 'react-router';
import { getDetail } from 'api/project'
import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    margin: theme.spacing(2),
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
  },
  button: {
    margin: theme.spacing(3),
    width: '200px',
    marginLeft: '40%'
  },
  image: {
    border: 'solid 1px #dfdfdf',
    borderRadius: 4
  }
}))

const ProjectDetail:React.FC = () => {

  const classes = useStyles()

  const [data, setData] = useState({
    companyName: '',
    image: {
      url: ''
    },
    title: '',
    content: '',
    filter: '',
    seekPerson: '',
    vision: '',
    work: '',
    location: '',
  });

  const { id } = useParams<{ id: string | undefined }>(); 

  useEffect(() => {
    handleGetDetail(id)
  }, [id]);

  const handleGetDetail = async (query: string | undefined) => {
    try {
      const res = await getDetail(Number(query));
      console.log(res.data);
      setData(res.data);
    } catch(e) {

    }
  }


  return (
    <>
      <div>
        <Typography>
          <img　src={data.image.url} className={classes.image} alt="企業イメージ" width="120" height="120"/>
        </Typography>
        <Divider />
        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            会社名：
          </span>
          {data.companyName}
        </Typography>
        <Divider />
        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >募集タイトル：
          </span>
          {data.title}
        </Typography>
        <Divider />
        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            募集内容：
          </span>
          {data.content}
        </Typography>
        <Divider />
        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            応募条件：
          </span>
          {data.filter}
        </Typography>
        <Divider />
        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            求める人物像：
          </span>
          {data.seekPerson}
        </Typography>
        <Divider />
        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            サービスのビジョン：
          </span>
          {data.vision}
        </Typography>
        <Divider />
        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            勤務地：
          </span>
          {data.location}
        </Typography>
        <Divider />
        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            働き方：
          </span>
          {data.work}
        </Typography>
        <Divider />
      <Button
        variant="contained"
        color="primary"
        disableElevation
        size="large"
        className={classes.button}
      >
        応募する
      </Button>
      </div>

    </>
  );
}

export default ProjectDetail