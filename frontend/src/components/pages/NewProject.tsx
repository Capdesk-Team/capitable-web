import React, { useState, useContext, useCallback} from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "App"
import Cookies from "js-cookie"
// Components
import AlertMessage from "components/utils/AlertMessage"
// API
import { createProject } from 'api/project'
// interfaces
import { CrateProjectData } from 'interfaces/project'
//Material UI
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
// Material Icons
import IconButton from "@material-ui/core/IconButton"
// Import Style
import { makeStyles, Theme } from "@material-ui/core/styles"

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  form: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
    width: 420
  },
  formItem: {
    marginTop: theme.spacing(2)
  },
  submitButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const NewProject:React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext)
  const [companyName, setCompanyName] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [filter, setFilter] = useState<string>("")
  const [seekPerson, setSeekPerson] = useState<string>("")
  const [vision, setVision] = useState<string>("")
  const [work, setWork] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [process, setProcess] = useState<string>("")
  const [serviceUrl, setServiceUrl] = useState<string>("")
  const [techStack, setTechStack] = useState<number>()
  const [developmentEnv, setDevelopmentEnv] = useState<string>("")
  const [freeDescription, setfreeDescription] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  // アップロードした画像の情報を取得
  const uploadImage = useCallback((e: any) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  // データを定義
  const createFormData = (): CrateProjectData => {
    const formData = new FormData()

    formData.append("userId", currentUser?.id || "")
    formData.append("companyName", companyName)
    formData.append("title", title)
    formData.append("image", image)
    formData.append("content", content)
    formData.append("filter", filter)
    formData.append("seekPerson", seekPerson)
    formData.append("vision", vision)
    formData.append("work", work)
    formData.append("location", location)
    formData.append("process", process)
    formData.append("serviceUrl", serviceUrl)
    formData.append("techStack", String(techStack))
    formData.append("developmentEnv", developmentEnv)
    formData.append("freeDescription", freeDescription)

    return formData
  }

  // プロジェクトを作成
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = createFormData()

    try {
      const res = await createProject(data)
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        setCompanyName("")
        setTitle("")
        setImage("")
        setContent("")
        setFilter("")
        setSeekPerson("")
        setVision("")
        setWork("")
        setLocation("")
        setProcess("")
        setServiceUrl("")
        setTechStack(undefined)
        setDevelopmentEnv("")
        setfreeDescription("")
        
        navigate("/dashboards")
        setAlertMessageOpen(true)
        
        console.log("プロジェクトが作成できました")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
    <form>
      <Card className={classes.form}>
        <CardHeader title="新規募集を作成する" subheader="以下のフォームから新規募集を作成することができます"/>
          <CardContent className={classes.formItem}>
            <Typography>
              1. 会社名を入力してください
            </Typography>
            <Typography>
              <TextField 
                id="outlined-basic" 
                placeholder="株式会社"
                variant="outlined"
                margin="normal"
                fullWidth
                value={companyName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
              />
            </Typography>
            <Typography>
              2. サービスリンクを入力してください
            </Typography>
            <Typography>
              <TextField 
                id="outlined-basic" 
                placeholder="会社HP or サービスリンク"
                variant="outlined"
                margin="normal"
                fullWidth
                value={serviceUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setServiceUrl(e.target.value)}
              />
            </Typography>
            
            <Typography>
              3. 募集タイトルを入力してください
            </Typography>
            <Typography>
              <TextField 
                id="outlined-basic" 
                placeholder="募集タイトル" 
                fullWidth
                multiline
                rows={6}
                variant="outlined" 
                margin="normal"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              />
            </Typography>
            <Typography>
              4. 業務内容を入力してください
            </Typography>
            <Typography>
              <TextField 
                id="outlined-basic" 
                variant="outlined"
                placeholder="業務内容"
                fullWidth
                multiline
                rows={6}
                margin="normal"
                value={content}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
              />
            </Typography>
            <Typography>
              4. 応募条件
            </Typography>
            <Typography>
              <TextField 
                id="outlined-basic" 
                variant="outlined"
                placeholder="(例)"
                fullWidth
                multiline
                rows={6}
                margin="normal"
                value={filter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
              />
            </Typography>
            <Typography>
              5. こんな方と働きたい
            </Typography>
            <Typography>
              <TextField 
                id="outlined-basic" 
                variant="outlined"
                placeholder="こんな方と働きたい"
                fullWidth
                multiline
                rows={6}
                margin="normal"
                value={seekPerson}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeekPerson(e.target.value)}
              />
            </Typography>
            <Typography>
              6. 開発環境
            </Typography>
            <Typography>
              <TextField 
                id="outlined-basic" 
                variant="outlined"
                placeholder="開発環境"
                fullWidth
                multiline
                rows={6}
                margin="normal"
                value={developmentEnv}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDevelopmentEnv(e.target.value)}
              />
            </Typography>
            <Typography>
              7. 選考プロセス
            </Typography>
            <Typography>
              <TextField 
                id="outlined-basic" 
                variant="outlined"
                placeholder="選考プロセス"
                fullWidth
                multiline
                rows={6}
                margin="normal"
                value={process}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProcess(e.target.value)}
              />
            </Typography>
            <Typography>
              9. 勤務地
            </Typography>
            <Typography>
              <TextField 
                id="outlined-basic" 
                variant="outlined"
                placeholder="勤務地"
                fullWidth
                multiline
                rows={6}
                margin="normal"
                value={location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
              />
            </Typography>
            <Typography>
              10. 働き方
            </Typography>
            <Typography>
              <TextField 
                id="outlined-basic" 
                variant="outlined"
                placeholder="働き方"
                fullWidth
                multiline
                rows={6}
                margin="normal"
                value={work}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWork(e.target.value)}
              />
            </Typography>
            <Typography>
              11. 募集を見た方へのメッセージ
            </Typography>
            <Typography>
              <TextField 
                id="outlined-basic" 
                variant="outlined"
                placeholder="募集を見た方へのメッセージ"
                fullWidth
                multiline
                rows={6}
                margin="normal"
                value={freeDescription}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setfreeDescription(e.target.value)}
              />
            </Typography>
            <Typography>
              12. 企業ロゴをアップロード
            </Typography>
            <div>
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  uploadImage(e)
                }}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                </IconButton>
              </label>
            </div>

            <Button
              type="submit"
              fullWidth
              color="primary"
              variant="outlined"
              onClick={handleSubmit}
              className={classes.submitButton}
            >
              作成する
            </Button>
          </CardContent>
      </Card>
    </form>
    <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="success"
        message="プロジェクトの作成に成功しました"
      />
    </>    
  )
}

export default NewProject