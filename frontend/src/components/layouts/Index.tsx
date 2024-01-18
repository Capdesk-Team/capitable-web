import React from 'react'
import { Link } from "react-router-dom"
// Material UI
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import { Container, Grid } from "@material-ui/core"
import { 
  Typography,
} from "@material-ui/core"
// Import Style
import { makeStyles, Theme } from "@material-ui/core/styles"

import Header from "components/layouts/Header"
import Footer from "components/layouts/Footer"
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
  heading: {
    fontSize: 50,
    margin: theme.spacing(8, 2, 5, 1),
  },
  subHeading: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#186aff',
    marginTop: theme.spacing(14),
  },
  submitBtn: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400
  },
  box: {
    marginTop: "2rem"
  },
  snsIcon: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  switchText: {
    textAlign: "center",
    marginTop: theme.spacing(2),
    fontSize: 10,
    color: '#AFAFAF'
  },
  link: {
    textDecoration: "none",
    color: "blue",
    "&:hover, &:active, &:focus": {
      color: "blue",
      textDecoration: "none", 
    }
  },
  flexContainer: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  leftItem: {
    boxSizing: 'border-box',
    padding: 20,
    [theme.breakpoints.up('sm')]: {
      width: '60%'
    }
  },
  rightItem: {
    boxSizing: 'border-box',
    padding: 20,
    [theme.breakpoints.up('sm')]: {
      width: '40%'
    }
  },
  linkSignUp: {
    textTransform: "none",
    marginTop: theme.spacing(4),
    fontWeight: 600,
    backgroundColor: '#186aff'
  },
  linkContact: {
    textTransform: "none",
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1),
    fontWeight: 600,
  },
  secondHeading: {
    textAlign: 'center',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  thirdHeading: {
    fontSize: '1.5rem'
  },
  featureGroup: {
    margin: theme.spacing(4)
  }
}))

const Index: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.wrapper}>

      <header>
        <Header/>
      </header>
      <Container className={classes.container}>
        <div>
        {/* Topページ */}
        <div className={classes.flexContainer}>
          <div className={classes.leftItem}>
            <Grid item>
              <h1 className={classes.heading}>
                スタートアップに<br/>挑戦したい<br/>エンジニアのための<br/>マッチングプラットフォーム
              </h1>
            </Grid>
          </div>

          <div className={classes.rightItem}>
            <p className={classes.subHeading}>エンジニアに最適化されたキャリアサービス</p>
            <span>
              Capitableでは、エンジニアコミュニティ・スタートアップへの転職・インターンの応募機能・
              実務を通して得られるスキル機能をAll in Oneで提供することで、新しいキャリアを築くのを支援します
            </span>

          
            <Box>
              <Button
                size="large"
                disableElevation
                color="primary"
                variant="contained"  
                className={classes.linkSignUp}
                component={Link}
                to="/signup"
              >
                無料で新規登録
              </Button>

              <Button
                variant="outlined"
                size="large"
                disableElevation
                className={classes.linkContact}
                component={Link}
                to="https://forms.gle/H65NorqmpAKfR8y17"
                target="_blank"  
              > 
                法人の方はこちらから
              </Button>
            </Box>
          
            <Box textAlign="center" className={classes.box}>
              <Typography variant="body2">
                アカウントをお持ちですか? &nbsp;
                <Link to="/signin" className={classes.link}>
                  ログインはこちらから
                </Link>
              </Typography>
            </Box>
          </div>
        </div>

        {/* 利用方法 */}
        <h2 className={classes.secondHeading}>利用方法</h2>
        <Grid container alignItems="center" justify="center" spacing={4}>
          <Grid item >
            <img src="/step_first.svg" width="280" height="240" alt="ホームアイコン" className={classes.snsIcon} />
            <h4>1. 気になる募集・スタートアップに応募しましょう</h4>
          </Grid>
          <Grid item>
            <img src="/step_second.svg" width="280" height="240" alt="ホームアイコン" className={classes.snsIcon} />
            <h4>2. 企業からメッセージが届いたら、面談に進みましょう</h4>
          </Grid>
          <Grid item>
            <img src="/step_third.svg" width="240" height="240" alt="ホームアイコン" className={classes.snsIcon} />
            <h4>3. 選考にすすんで、内定が出ます</h4>
          </Grid>
        </Grid>

        {/* サービスの特徴 */}
        <h2 className={classes.secondHeading}>サービスの特徴</h2>

        <Grid container alignItems="center" justify="center" spacing={4}>
          <Grid item>
            <img src="/capitable_feature_first.png" width="360" height="300" alt="ホームアイコン" className={classes.snsIcon} />
          </Grid>
          <Grid item className={classes.featureGroup}>
            <h3 className={classes.thirdHeading}>スキル機能</h3>
            <p>実際のプロジェクトに参加することで、スキルアップを図りましょう</p>
            <p>実務で活躍した経験がスキルとして証明されます</p>

            <Button
              size="large"
              disableElevation
              color="primary"
              variant="contained"  
              className={classes.linkSignUp}
              component={Link}
              to="/signup"
            >
              無料で新規登録
            </Button>
          </Grid>
        </Grid>

        <Grid container alignItems="center" justify="center" spacing={4}>
          <Grid item>
            <h3 className={classes.thirdHeading}>エンジニアリングコミュニティ</h3>
            <p>関心のあるトピックや、興味のあるスタートアップのコミュニティに参加してみましょう</p>
            <p>直接の応募よりも、コミュニティでの活動を通することでお互いのマッチ度がわかります</p>
            <p>もちろん、自社の採用活動に活用することも可能です</p>
            <Button
              size="large"
              disableElevation
              color="primary"
              variant="contained"  
              className={classes.linkSignUp}
              component={Link}
              to="/communities"
            >
              コミュニティを見てみる
            </Button>
          </Grid>
          <Grid item>
            <img src="/capitable_feature.png" width="360" height="340" alt="ホームアイコン" className={classes.snsIcon} />
          </Grid>
        </Grid>
      </div>
      
      </Container>
      <footer>
        <Footer/>
      </footer>
      </div>
    </>
  )
}

export default Index