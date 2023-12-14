import  React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from "App"
// API
import { getDetail } from 'api/project'
import { createApply } from 'api/apply';
// Interfaces
import { Apply } from 'interfaces/apply'
import { makeStyles, Theme } from "@material-ui/core/styles"
// Components
import AlertMessage from "components/utils/AlertMessage"
// Material UI
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import LinkIcon from '@material-ui/icons/Link';
import Avatar from "@material-ui/core/Avatar"
import Link from "@material-ui/core/Link"
import { Grid } from "@material-ui/core"

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  content: {
    margin: theme.spacing(2),
  },
  header: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
  },
  button: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    width: '200px',
    marginLeft: '40%'
  },
  info: {
    marginBottom: theme.spacing(8),
    width: '240px',
    marginLeft: '36%'
  },
  like: {
    marginLeft: '40%'
  },
  image: {
    border: 'solid 1px #dfdfdf',
    borderRadius: 4
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[24],
    padding: theme.spacing(4),
  },
  founderCard: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    maxWidth: 200
  },
  founderName: {
    fontWeight: 600
  },
  serviceLink: {
    marginTop: theme.spacing(1)
  },
  createdAt: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'right',
    display: 'block'
  }
}))

const ProjectDetail:React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false)
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true);
  const handleModalOpen = () => setModalOpen(true);
  const handleClose = () => setOpen(false);
  const handleModalClose = () => setModalOpen(false);

  // プロジェクト詳細データ型
  const [data, setData] = useState({
    id: '',
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
    serviceUrl: '',
    developmentEnv: '',
    freeDescription: '',
    user: {
      name: '',
      image: {
        url: ''
      },
    },
    createdAt: Date
  });

  const { id } = useParams<{ id: string | undefined }>();

  const [apply, setApply] = useState<Apply[]>([]) 

  useEffect(() => {
    handleGetDetail(id)
  }, [id]);

  // プロジェクトの詳細データの取得
  const handleGetDetail = async (query: string | undefined) => {
    try {
      // queryが存在する場合、プロジェクトデータをセッティングする
      if (query) {
        const res = await getDetail(query);
        console.log(res.data);
        setData(res.data);
      } else {
        console.error('projectデータが取得出来ませんでした');
      }
    } catch(e) {
      console.log(e);
    }
  }

  // プロジェクト応募機能
  const handleClick = async (projectId: string) => {
    const data: Apply = {
      userId: currentUser?.id,
      projectId: projectId
    }
    try {
      const res = await createApply(data, projectId)
      if (res?.status === 200) {
        setApply([res.data.apply, ...apply])
        setAlertMessageOpen(true)
        console.log(res?.data)
      } else {
        console.log("プロジェクトへの応募に失敗しました")
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Railsから渡ってくるtimestamp（ISO8601）をdatetimeに変換
  const iso8601ToDateTime = (iso8601: string) => {
    const date = new Date(Date.parse(iso8601))
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return year + "年" + month + "月" + day + "日" 
  }
  
  return (
    <>
      <div>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <img　src={`${data.image.url}`} className={classes.image} alt="企業イメージ" width="72" height="72"/>
          </Grid>
          <Grid item>
            <span>
              {data.companyName}
            </span>
          </Grid>
        </Grid>
        <Typography variant="h5" className={classes.header}>
          {data.title}
        </Typography>

        <Typography component="p" className={classes.createdAt}>
          投稿日: &nbsp;{iso8601ToDateTime(data.createdAt?.toString() || "100000000")}
        </Typography>
        
        <Divider />
        
        <Card variant="outlined" className={classes.founderCard}>
          <CardContent>
            <Typography>
              Founder
            </Typography>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar variant="square" src={`${data.user.image.url}`}/>
              </Grid>
              <Grid item className={classes.founderName}>
                  {data.user.name}
              </Grid>
            </Grid>
            <Box className={classes.serviceLink}>
              <LinkIcon/>
              <Link href={data.serviceUrl} underline="hover" target="_blank" rel="noopener noreferrer">
                {data.serviceUrl}
              </Link>
            </Box>
          </CardContent>
        </Card>

        <Divider />
        
        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            業務内容
          </span>
          <Divider />
          {data.content}
        </Typography>

        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            応募条件
          </span>
          <Divider />
          {data.filter}
        </Typography>

        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            こんな方と働きたい
          </span>
          <Divider />
          {data.seekPerson}
        </Typography>

        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            サービスのビジョン
          </span>
          <Divider />
          {data.vision}
        </Typography>

        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            開発環境
          </span>
          <Divider />
          {data.developmentEnv}
        </Typography>

        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            勤務地
          </span>
          <Divider />
          {data.location}
        </Typography>

        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            働き方
          </span>
          <Divider />
          {data.work}
        </Typography>

        <Typography
          className={classes.content}
        >
          <span
            className={classes.title}
          >
            募集を見た方へのメッセージ
          </span>
          <Divider />
          {data.freeDescription}
        </Typography>

        <Divider/>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          size="large"
          className={classes.button}
          onClick={handleOpen}
        >
          応募する
        </Button>

        <Button onClick={handleModalOpen} className={classes.info}>
          <InfoOutlinedIcon/>
          応募にあたっての確認事項
        </Button>
        
        {/* 応募方法のモーダルを表示 */}
        <Dialog open={modalOpen} onClose={handleModalClose}>
          <DialogTitle>プロジェクト応募の流れ</DialogTitle>
          <DialogContent>
            <Typography>
              1. 気になる募集に対して「応募する」をクリックしましょう
            </Typography>
            <Typography>
              2. 応募が完了したら、採用担当者とのチャットルームが作成されます
            </Typography>
            <Typography>
              3. 話してみたい内容などをメッセージで送信しましょう
            </Typography>
            <Typography>
              4. メッセージの返信があれば、面談の日程を決めましょう
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary" 
              disableElevation
              variant="contained"
              onClick={handleModalClose}
            >
              閉じる
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* プロジェクト応募のダイアログを表示 */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>このプロジェクトに応募しますか？</DialogTitle>
          <DialogContent>
            「応募する」を完了後、{data.user.name}さんにメッセージの送信ができます。
          </DialogContent>
          <DialogContent>
            面談したい内容などをメッセージで送信してみましょう
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button 
              color="primary" 
              disableElevation 
              variant="contained" 
              onClick={() => handleClick(data.id)}
            >
              応募する
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <AlertMessage // 応募が完了したときに表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="success"
        message="応募が完了しました。メッセージを送信しましょう！"
      />
    </>
  );
}

export default ProjectDetail