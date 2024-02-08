import React from 'react'
import Divider from '@material-ui/core/Divider'
// Import Style
import { makeStyles, Theme } from "@material-ui/core/styles"

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#030303',
    color: '#ffffff',
    textAlign: 'center',
    padding: '30 0',
  },
  list: {
    listStyle: 'none'
  },
  link: {
    color: '#ffffff', // リンクのデフォルト色
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline', // マウスオーバー時の下線
    },
    '&:visited': {
      color: '#ffffff', // visited状態のリンクの色
    },
  },
}))


const Footer: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.footer}>
        <Divider/>
          <ul className={classes.list}>
            <li>
              <a href="/terms" className={classes.link}>
                利用規約
              </a>
            </li>
            <li>
              <a href="/privacy" className={classes.link}>
                プライバシーポリシー
              </a>
            </li>
            <li>
              <a href="https://forms.gle/H65NorqmpAKfR8y17" className={classes.link}>
                お問い合わせ
              </a>
            </li>
            <li>© Capitable</li>
          </ul>
      </div>
    </>
  )
}

export default Footer