import  React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from "App"
// API
import { showJob } from 'api/job'
import { createApply } from 'api/apply';
// Interfaces
import { Apply } from 'interfaces/apply'
//　Import Style
import { makeStyles, Theme } from "@material-ui/core/styles"
// Components
import AlertMessage from "components/utils/AlertMessage"
// Material UI
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

// Stylesを定義
const useStyles = makeStyles((theme: Theme) => ({
  applyBtn: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    width: '280px',
    fontWeight: 600,
    backgroundColor: '#186aff',
  },
  info: {
    marginBottom: theme.spacing(2),
    width: '280px',
    fontWeight: 600,
  },
  modalCloseBtn: {
    backgroundColor: '#186aff',
    fontWeight: 600,
  },
  applyConfirmBtn: {
    backgroundColor: '#186aff',
    fontWeight: 600,
  }
}))

const ApplyButton:React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false)
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const [apply, setApply] = useState<Apply[]>([]) 
  const handleOpen = () => setOpen(true);
  const handleModalOpen = () => setModalOpen(true);
  const handleClose = () => setOpen(false);
  const handleModalClose = () => setModalOpen(false);

  // 求人詳細データ型
  const [data, setData] = useState({
    id: 0,
  });

  // idを定義
  const { id } = useParams<{ id: string | undefined }>();

  useEffect(() => {
    handleShowJob(id)
  }, [id]);

  // 求人詳細情報を取得
  const handleShowJob = async (query: string | undefined) => {
    try {
      // queryが存在する場合、求人データをセッティングする
      if (query) {
        const res = await showJob(parseInt(query));
        console.log(res.data);
        setData(res.data);
      } else {
        console.error('求人データが取得できませんでした。');
      }
    } catch(e) {
      console.log(e);
    }
  }

  // プロジェクト応募機能
  const handleClick = async (jobId: number) => {
    // ログインユーザー・求人idを引数として定義
    const data: Apply = {
      userId: currentUser?.id,
      jobId: jobId
    }
    try {
      const res = await createApply(data, jobId)
      if (res?.status === 200) {
        setApply([res.data.apply, ...apply])
        handleClose()
        setAlertMessageOpen(true)
        console.log(res?.data)
      } else {
        console.log("プロジェクトへの応募に失敗しました")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        size="large"
        className={classes.applyBtn}
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
        <DialogTitle>応募の流れ</DialogTitle>
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
            className={classes.modalCloseBtn}
            onClick={handleModalClose}
          >
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
        
      {/* プロジェクト応募のダイアログを表示 */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>この求人に応募しますか？</DialogTitle>
        <DialogContent>
          面談したい内容などをメッセージで送信してみましょう
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button 
            color="primary"
            className={classes.applyConfirmBtn}
            disableElevation 
            variant="contained" 
            onClick={() => handleClick(data.id)}
          >
            応募する
          </Button>
        </DialogActions>
      </Dialog>
      <AlertMessage // 応募が完了したときに表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="success"
        message="応募が完了しました。メッセージを送信しましょう！"
      />
    </>
  );
}

export default ApplyButton;