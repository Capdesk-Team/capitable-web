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
  }
}))


const Footer: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.footer}>
        <Divider/>
          <ul className={classes.list}>
            <li>利用規約</li>
            <li>プライバシーポリシー</li>
            <li>お問い合わせ</li>
            <li>© Capitable</li>
          </ul>
      </div>
    </>
  )
}

export default Footer