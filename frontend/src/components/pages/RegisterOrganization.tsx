// Hooks API
import React, { useState, useContext, useCallback} from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "App"
import Cookies from "js-cookie"
// Components
import AlertMessage from "components/utils/AlertMessage"
// API
import { createOrganization } from 'api/organization'
// interfaces
import { CreateOrganizationData } from 'interfaces/organization'
// Material UI
import {
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  MenuItem,
  FormControl,
  Grid,
  Box
} from "@mui/material";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

// Date
import "date-fns"
import DateFnsUtils from "@date-io/date-fns"

// Import Style
import { makeStyles, Theme } from "@material-ui/core/styles"
// Components
import Header from "components/layouts/Header"
import Footer from "components/layouts/Footer"

// 産業カテゴリーデータ
import { industries } from "data/industries"
// 事業フェーズデータ
import { rounds } from "data/rounds"
// 都道府県データ
import { prefectures} from "data/prefectures"

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    minHeight: '100vh',
    position: 'relative',
    paddingBottom: 120,
    boxSizing: "border-box",
  },
  container: {
    marginTop: "1.5rem",
    marginBottom: "6rem"
  },
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

const RegisterOrganization:React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext)
  const [name, setName] = useState<string>("")
  const [presidentName, setPresidentName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [cultureImage, setCultureImage] = useState<string>("")
  const [productImage, setProductImage] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [zipCode, setZipCode] = useState<string>("")
  const [addressCity, setAddressCity] = useState<string>("")
  const [addressStreet, setAddressStreet] = useState<string>("")
  const [addressBuilding, setAddressBuilding] = useState<string>("")
  const [projects, setProjects] = useState<string>("")
  const [solveProblems, setSolveProblems] = useState<string>("")
  const [serviceLink, setServiceLink] = useState<string>("")
  const [prefecture, setPrefecture] = useState<number>()
  const [establishmentYear, setEstablishmentYear] = useState<Date | null>(
    new Date(),
  )
  const [round, setRound] = useState<number>()
  const [industry, setIndustry] = useState<number>()
  const [members, setMembers] = useState<number>()
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  // アップロードした会社ロゴの情報を取得
  const uploadImage = useCallback((e: any) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  // アップロードしたカルチャーイメージの情報を取得
  const uploadCultureImage = useCallback((e: any) => {
    const file = e.target.files[0]
    setCultureImage(file)
  }, [])

  // アップロードしたプロダクトイメージの情報を取得
  const uploadProductImage = useCallback((e: any) => {
    const file = e.target.files[0]
    setProductImage(file)
  }, [])

  // データを定義
  const createFormData = (): CreateOrganizationData => { 
    const formData = new FormData()

    formData.append("userId", currentUser?.id.toString() || "")
    formData.append("name", name)
    formData.append("presidentName", presidentName)
    formData.append("email", email)
    formData.append("phoneNumber", phoneNumber)
    formData.append("zipCode", zipCode)
    formData.append("addressCity", addressCity)
    formData.append("addressStreet", addressStreet)
    formData.append("addressBuilding", addressBuilding)
    formData.append("projects", projects)
    formData.append("solveProblems", solveProblems)
    formData.append("serviceLink", serviceLink)
    formData.append("prefecture", String(prefecture))
    formData.append("round", String(round))
    formData.append("industry", String(industry))
    formData.append("image", image)
    formData.append("cultureImage", cultureImage)
    formData.append("productImage", productImage)
    formData.append("establishmentYear", String(establishmentYear))
    formData.append("members", String(members || 0))

    return formData
  }

  // プロジェクトを作成
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = createFormData()

    try {
      const res = await createOrganization(data)
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        setName("")
        setPresidentName("")
        setEmail("")
        setPhoneNumber("")
        setZipCode("")
        setAddressCity("")
        setAddressStreet("")
        setAddressBuilding("")
        setProjects("")
        setSolveProblems("")
        setServiceLink("")
        setImage("")
        setCultureImage("")
        setProductImage("")
        setPrefecture(undefined)
        setRound(undefined)
        setIndustry(undefined)

        setMembers(0)
        navigate("/dashboards")
        
        setAlertMessageOpen(true)
        
        console.log("プロジェクトが作成できました")
        console.log("res")

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
    <div className={classes.wrapper}>
      <header>
        <Header/>
      </header>
        <Container className={classes.container}>
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
              <Typography component="h3" variant="h5" align="center" gutterBottom>
                法人を登録する
              </Typography>
              <form>
                <Typography>
                  1. 会社名を入力してください
                </Typography>
                <Box mb={3}>
                  <TextField 
                    id="outlined-basic" 
                    placeholder="例) 株式会社Capitable"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  />
                </Box>

                <Typography>
                  2. 代表者名を入力してください
                </Typography>
                <Box mb={3}>
                  <TextField 
                    id="outlined-basic" 
                    placeholder="例) 代表太郎"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={presidentName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPresidentName(e.target.value)}
                  />
                </Box>

                <Typography>
                  3. 会社用メールアドレスを入力してください
                </Typography>
                <Box mb={3}>
                  <TextField 
                    id="outlined-basic"
                    type="email"
                    placeholder="例) example@capitable.jp" 
                    fullWidth
                    variant="outlined" 
                    margin="normal"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  />
                </Box>
              
                <Typography>
                  4. 会社用電話番号を入力してください
                </Typography>
                <Box mb={3}>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    placeholder="例) 090-xxxx-xxxx"
                    fullWidth
                    margin="normal"
                    value={phoneNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                  />
                </Box>
                
                <Typography>
                  5. 設立年度を入力してください
                </Typography>
                <Box mb={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid>
                      <KeyboardDatePicker
                        fullWidth
                        inputVariant="outlined"
                        margin="dense"
                        id="date-picker-dialog"
                        label="設立年度"
                        format="MM/dd/yyyy"
                        value={establishmentYear}
                        onChange={(date: Date | null) => {
                          setEstablishmentYear(date)
                        }}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Box>

                <Typography>
                  6. 郵便番号を入力してください
                </Typography>
                <Box mb={3}>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    placeholder="例) 350-xxxx"
                    fullWidth
                    margin="normal"
                    value={zipCode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZipCode(e.target.value)}
                  />
                </Box>

                <Typography>
                  7. 都道府県を選択してください
                </Typography>
                <Box mb={3}>
                  <FormControl
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-outlined-label">都道府県</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={prefecture}
                      onChange={(e) => {
                        setPrefecture(e.target.value as number);
                      }}
                      label="都道府県"
                    >
                      {
                        prefectures.map((prefecture, index) => 
                          <MenuItem key={index +1} value={index + 1}>{prefecture}</MenuItem>
                        )
                      }
                    </Select>
                  </FormControl>
                </Box>
                
                <Typography>
                  8. 市区町村
                </Typography>
                <Box mb={3}>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    placeholder="例) 〇〇市〇〇区"
                    fullWidth
                    margin="normal"
                    value={addressCity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddressCity(e.target.value)}
                  />
                </Box>

                <Typography>
                  9. 番地を入力してください
                </Typography>
                <Box mb={3}>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    placeholder="例) 〇〇-〇〇番地"
                    fullWidth
                    margin="normal"
                    value={addressStreet}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddressStreet(e.target.value)}
                  />
                </Box>

                <Typography>
                  10. ビル・建物名を入力してください
                </Typography>
                <Box mb={3}>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    placeholder="例) ビル・建物名"
                    fullWidth
                    margin="normal"
                    value={addressBuilding}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddressBuilding(e.target.value)}
                  />
                </Box>

                <Typography>
                  10. 事業内容を入力してください
                </Typography>
                <Box mb={3}>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    placeholder="事業内容を入力してください"
                    fullWidth
                    multiline
                    rows={6}
                    margin="normal"
                    value={projects}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjects(e.target.value)}
                  />
                </Box>

                <Typography>
                  11. 事業として解決したい課題を入力してください
                </Typography>
                <Box mb={3}>
                  <Typography>
                    <TextField 
                      id="outlined-basic" 
                      variant="outlined"
                      placeholder="解決したい課題を入力してください"
                      fullWidth
                      multiline
                      rows={6}
                      margin="normal"
                      value={solveProblems}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSolveProblems(e.target.value)}
                    />
                  </Typography>
                </Box>
            
                <Typography>
                  12. サービスリンク
                </Typography>
                <Box mb={3}>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    placeholder="例) https://"
                    fullWidth
                    margin="normal"
                    value={serviceLink}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setServiceLink(e.target.value)}
                  />
                </Box>

                <Typography>
                  13. 企業ロゴをアップロード
                </Typography>
                <Box mb={4}>
                  <div>
                    <input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        uploadImage(e)
                      }}
                    />
                  </div>
                </Box>

                <Typography>
                  14. カルチャーイメージをアップロードできます
                </Typography>
                <Box mb={4}>
                  <div>
                    <input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        uploadCultureImage(e)
                      }}
                    />
                  </div>
                </Box>
              

                <Typography>
                  15. プロダクトイメージをアップロードできます
                </Typography>
                <Box mb={4}>
                  <div>
                    <input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        uploadProductImage(e)
                      }}
                    />
                  </div>
                </Box>

                <Typography>
                  16. 調達ラウンドを選択してください
                </Typography>
                <Box mb={3}>
                  <FormControl
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-outlined-label">調達ラウンド</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={round}
                      label="調達ラウンド"
                      onChange={(e) => {
                        setRound(e.target.value as number);
                      }}
                    >
                      {
                        rounds.map((round: string, index: number) => (
                          <MenuItem value={index}>{round}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Box>

                <Typography>
                  17. 事業カテゴリーを選択してください
                </Typography>

                <Box mb={3}>
                  <FormControl
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-outlined-label">事業カテゴリー</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={industry}
                      label="事業カテゴリー"
                      onChange={(e) => {
                        setIndustry(e.target.value as number);
                      }}
                    >
                      {
                        industries.map((industry: string, index: number) => (
                          <MenuItem value={index}>{industry}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Box>

                <Typography>
                  18. 社員数を入力してください
                </Typography>

                <Box mb={3}>
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    placeholder="社員数"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={members || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMembers(parseInt(e.target.value))}
                  />
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  color="primary"
                  variant="outlined"
                  onClick={handleSubmit}
                  className={classes.submitButton}
                >
                  法人を登録する
                </Button>
              </form>
            </Paper>
          </Container>
        </Container>
      <footer>
        <Footer/>
      </footer>
    </div>
    <AlertMessage
      open={alertMessageOpen}
      setOpen={setAlertMessageOpen}
      severity="success"
      message="プロジェクトの作成に成功しました"
    />
  </>    
  )
}

export default RegisterOrganization